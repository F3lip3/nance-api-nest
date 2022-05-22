import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HoldingsService } from '../holdings/holdings.service';
import { SymbolsService } from '../symbols/symbols.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    HoldingsService,
    PrismaService,
    SymbolsService,
    TransactionsService
  ]
})
export class TransactionsModule {}
