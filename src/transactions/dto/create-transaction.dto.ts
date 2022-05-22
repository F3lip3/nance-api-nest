import { PickType } from '@nestjs/mapped-types';
import { CreateSymbolDto } from '../../symbols/dto/create-symbol.dto';
import { TransactionEntity } from '../entities/transaction.entity';

export class CreateTransactionDto extends PickType(TransactionEntity, [
  'date',
  'symbol_id',
  'shares',
  'cost_per_share',
  'type'
]) {
  symbol?: CreateSymbolDto;
}
