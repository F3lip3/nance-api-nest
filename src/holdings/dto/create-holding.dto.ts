import { PickType } from '@nestjs/mapped-types';
import { HoldingEntity } from '../entities/holding.entity';

export class CreateHoldingDto extends PickType(HoldingEntity, [
  'portfolio_id',
  'symbol_id',
  'trades',
  'shares',
  'average_cost'
]) {}
