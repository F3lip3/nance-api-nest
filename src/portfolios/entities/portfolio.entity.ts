import { Portfolio, Status } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CurrencyEntity } from '../../currencies/entities/currency.entity';

export class PortfolioEntity implements Portfolio {
  id: number;
  name: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
  currency: CurrencyEntity;

  @Exclude()
  currency_id: number;

  @Exclude()
  user_id: number;

  @Exclude()
  removed_at: Date;

  constructor(partial: Partial<PortfolioEntity>) {
    Object.assign(this, partial);
  }
}
