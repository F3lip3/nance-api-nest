import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';

@Module({
  controllers: [PortfoliosController],
  providers: [PortfoliosService, PrismaService]
})
export class PortfoliosModule {}
