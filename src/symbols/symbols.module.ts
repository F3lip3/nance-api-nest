import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SymbolsService } from './symbols.service';

@Module({
  providers: [PrismaService, SymbolsService]
})
export class SymbolsModule {}
