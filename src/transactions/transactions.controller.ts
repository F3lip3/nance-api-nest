import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HoldingsService } from '../holdings/holdings.service';
import { SymbolsService } from '../symbols/symbols.service';
import { User } from '../users/decorators/user.decorator';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('portfolios/:portfolio_id/transactions')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TransactionsController {
  constructor(
    private readonly holdingsService: HoldingsService,
    private readonly symbolsService: SymbolsService,
    private readonly transactionsService: TransactionsService
  ) {}

  @Post()
  async create(
    @User('id') user_id: number,
    @Param('portfolio_id', ParseIntPipe) portfolio_id: number,
    @Body() data: CreateTransactionDto
  ) {
    let symbol_id = data.symbol_id;
    if (symbol_id === 0 && data.symbol) {
      ({ id: symbol_id } = await this.symbolsService.create(data.symbol));
    }

    const transaction = await this.transactionsService.create(
      user_id,
      portfolio_id,
      {
        ...data,
        symbol_id
      }
    );

    const transactions = await this.transactionsService.findAll(
      user_id,
      portfolio_id,
      symbol_id
    );

    const total = transactions
      .filter(t => t.type === 'BUY')
      .reduce(
        (total, trans) => ({
          purchases: total.purchases.add(
            trans.cost_per_share.times(trans.shares)
          ),
          shares: total.shares.add(trans.shares)
        }),
        {
          purchases: new Prisma.Decimal(0),
          shares: new Prisma.Decimal(0)
        }
      );

    const sold_shares = transactions
      .filter(t => t.type === 'SELL')
      .reduce(
        (shares, trans) => shares.add(trans.shares),
        new Prisma.Decimal(0)
      );

    const average_cost = total.purchases.dividedBy(total.shares);
    const shares = total.shares.minus(sold_shares);
    const holding = await this.holdingsService.create({
      transactions: transactions.length,
      portfolio_id,
      symbol_id,
      shares,
      average_cost
    });

    return { holding, transaction };
  }

  @Get()
  async findAll(
    @User('id', ParseIntPipe) user_id: number,
    @Param('portfolio_id', ParseIntPipe) portfolio_id: number,
    @Query('symbol_id', ParseIntPipe) symbol_id: number
  ) {
    return this.transactionsService.findAll(user_id, portfolio_id, symbol_id);
  }
}
