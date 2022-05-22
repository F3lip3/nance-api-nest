import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HoldingsController } from './holdings.controller';
import { HoldingsService } from './holdings.service';

@Module({
  controllers: [HoldingsController],
  providers: [HoldingsService, PrismaService]
})
export class HoldingsModule {}
