import { Transaction, TransactionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class TransactionEntity implements Transaction {
  id: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  user_id: number;
  portfolio_id: number;
  symbol_id: number;

  @Type(() => Number)
  shares: Decimal;

  @Type(() => Number)
  cost_per_share: Decimal;

  type: TransactionType;
  created_at: Date;

  constructor(partial: Partial<TransactionEntity>) {
    Object.assign(this, partial);
  }
}
