import { Module } from '@nestjs/common';
import { SymbolsService } from './symbols.service';

@Module({
  providers: [SymbolsService]
})
export class SymbolsModule {}
