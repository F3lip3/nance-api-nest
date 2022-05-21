import { PickType } from '@nestjs/mapped-types';
import { SymbolEntity } from '../entities/symbol.entity';

export class CreateSymbolDto extends PickType(SymbolEntity, [
  'code',
  'exchange',
  'shortname',
  'type',
  'sector',
  'industry',
  'longname'
]) {}
