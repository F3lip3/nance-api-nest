import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHoldingDto } from './dto/create-holding.dto';
import { HoldingEntity } from './entities/holding.entity';

@Injectable()
export class HoldingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHoldingDto) {
    const holding = await this.prisma.holding.upsert({
      create: {
        portfolio: {
          connect: {
            id: data.portfolio_id
          }
        },
        symbol: {
          connect: {
            id: data.symbol_id
          }
        },
        trades: data.trades,
        shares: data.shares,
        average_cost: data.average_cost
      },
      update: {
        trades: data.trades,
        shares: data.shares,
        average_cost: data.average_cost
      },
      where: {
        portfolio_id_symbol_id: {
          portfolio_id: data.portfolio_id,
          symbol_id: data.symbol_id
        }
      }
    });

    return new HoldingEntity(holding);
  }

  async findAll(portfolio_id: number, user_id: number) {
    const holdings = await this.prisma.holding.findMany({
      where: {
        portfolio: {
          id: portfolio_id,
          user_id
        }
      }
    });

    return holdings?.map(holding => new HoldingEntity(holding));
  }

  async findOne(id: number, portfolio_id: number, user_id: number) {
    const holding = await this.prisma.holding.findUnique({
      where: { id },
      include: { portfolio: true }
    });

    if (
      holding?.portfolio_id !== portfolio_id ||
      holding?.portfolio?.user_id !== user_id
    ) {
      throw new NotFoundException();
    }

    return holding;
  }

  async remove(id: number, portfolio_id: number, user_id: number) {
    const holding = await this.prisma.holding.findUnique({
      where: { id },
      include: { portfolio: true }
    });

    if (
      holding?.portfolio_id !== portfolio_id ||
      holding?.portfolio?.user_id !== user_id
    ) {
      throw new NotFoundException();
    }

    const removedHolding = await this.prisma.holding.delete({
      where: { id }
    });

    return new HoldingEntity(removedHolding);
  }
}
