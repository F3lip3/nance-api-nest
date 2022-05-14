import { Portfolio, Status } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PortfolioEntity implements Portfolio {
  id: number;
  name: string;
  currency_id: number;
  status: Status;
  user_id: number;
  created_at: Date;
  updated_at: Date;

  @Exclude()
  removed_at: Date;

  constructor(partial: Partial<PortfolioEntity>) {
    Object.assign(this, partial);
  }
}
