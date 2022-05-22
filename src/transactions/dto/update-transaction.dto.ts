import { Decimal } from '@prisma/client/runtime';

export class UpdateTransactionDto {
  date: Date;
  shares: Decimal;
  cost_per_share: Decimal;
}
