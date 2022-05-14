import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, PrismaService]
})
export class CurrenciesModule {}
