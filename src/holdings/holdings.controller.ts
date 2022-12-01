import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/decorators/user.decorator';
import { HoldingsService } from './holdings.service';

@Controller('portfolios/:portfolio_id/holdings')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class HoldingsController {
  constructor(private readonly holdingsService: HoldingsService) {}

  @Get()
  findAll(
    @Param('portfolio_id') portfolio_id: string,
    @User('id') user_id: string
  ) {
    return this.holdingsService.findAll(portfolio_id, user_id);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Param('portfolio_id') portfolio_id: string,
    @User('id') user_id: string
  ) {
    return this.holdingsService.findOne(id, portfolio_id, user_id);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Param('portfolio_id') portfolio_id: string,
    @User('id') user_id: string
  ) {
    await this.holdingsService.remove(id, portfolio_id, user_id);
  }
}
