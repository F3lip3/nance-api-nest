import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  findAll() {
    return this.currenciesService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.currenciesService.findOne(code);
  }
}
