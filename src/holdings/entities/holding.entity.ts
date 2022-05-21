import { Holding } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class HoldingEntity implements Holding {
  id: number;
  portfolio_id: number;
  symbol_id: number;
  trades: number;
  shares: number;
  average_cost: Decimal;

  constructor(partial: Partial<HoldingEntity>) {
    Object.assign(this, partial);
  }
}
