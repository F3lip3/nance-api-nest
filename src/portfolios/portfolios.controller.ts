import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/decorators/user.decorator';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  create(@User('id') user_id: number, @Body() data: CreatePortfolioDto) {
    return this.portfoliosService.create(user_id, data);
  }

  @Get()
  findAll(@User('id') user_id: number) {
    return this.portfoliosService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @User('id') user_id: number) {
    return this.portfoliosService.findOne(id, user_id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @User('id') user_id: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto
  ) {
    return this.portfoliosService.update(id, user_id, updatePortfolioDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User('id') user_id: number
  ) {
    await this.portfoliosService.remove(id, user_id);
  }
}
