import { Status, Symbol } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SymbolEntity implements Symbol {
  id: string;
  code: string;
  exchange: string;
  shortname: string;
  type: string;
  sector: string;
  industry: string;
  longname: string;

  @Exclude()
  status: Status;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<SymbolEntity>) {
    Object.assign(this, partial);
  }
}
