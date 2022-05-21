import { Module } from '@nestjs/common';
import { HoldingsService } from './holdings.service';
import { HoldingsController } from './holdings.controller';

@Module({
  controllers: [HoldingsController],
  providers: [HoldingsService]
})
export class HoldingsModule {}
