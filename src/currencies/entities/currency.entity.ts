import { Currency } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CurrencyEntity implements Currency {
  @Exclude()
  id: string;

  code: string;
  name: string;

  constructor(partial: Partial<CurrencyEntity>) {
    Object.assign(this, partial);
  }
}
