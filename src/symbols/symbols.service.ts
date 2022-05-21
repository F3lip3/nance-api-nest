import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSymbolDto } from './dto/create-symbol.dto';
import { SymbolEntity } from './entities/symbol.entity';

@Injectable()
export class SymbolsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSymbolDto) {
    const exists = await this.prisma.symbol.findUnique({
      where: { code: data.code }
    });

    if (exists) {
      return new SymbolEntity(exists);
    }

    const newSymbol = await this.prisma.symbol.create({
      data
    });

    return new SymbolEntity(newSymbol);
  }

  async findOne(code: string) {
    const symbol = await this.prisma.symbol.findUnique({
      where: { code }
    });

    if (!symbol) throw new NotFoundException();

    return new SymbolEntity(symbol);
  }
}
