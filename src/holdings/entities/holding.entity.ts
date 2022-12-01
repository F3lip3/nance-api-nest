import { Holding } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Type } from 'class-transformer';

export class HoldingEntity implements Holding {
  id: string;
  portfolio_id: string;
  symbol_id: string;
  transactions: number;

  @Type(() => Number)
  shares: Decimal;

  @Type(() => Number)
  average_cost: Decimal;

  constructor(partial: Partial<HoldingEntity>) {
    Object.assign(this, partial);
  }
}
