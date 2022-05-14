import { PickType } from '@nestjs/mapped-types';
import { PortfolioEntity } from '../entities/portfolio.entity';

export class CreatePortfolioDto extends PickType(PortfolioEntity, [
  'name',
  'currency_id',
  'user_id'
]) {}
