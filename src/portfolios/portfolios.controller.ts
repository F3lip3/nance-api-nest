import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
@UseGuards(JwtAuthGuard)
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  // @Post()
  // create(@Body() createPortfolioDto: CreatePortfolioDto) {
  //   return this.portfoliosService.create(createPortfolioDto);
  // }

  @Get()
  findAll(@User() user: UserEntity) {
    return this.portfoliosService.findAll(user.id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.portfoliosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePortfolioDto: UpdatePortfolioDto) {
  //   return this.portfoliosService.update(+id, updatePortfolioDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.portfoliosService.remove(+id);
  // }
}
