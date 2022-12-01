import { Transaction, TransactionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class TransactionEntity implements Transaction {
  id: string;

  @Type(() => Date)
  @IsDate()
  date: Date;

  user_id: string;
  portfolio_id: string;
  symbol_id: string;

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
