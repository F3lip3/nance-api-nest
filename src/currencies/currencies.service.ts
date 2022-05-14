import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CurrenciesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.currency.findMany();
  }

  findOne(code: string) {
    return this.prisma.currency.findUnique({ where: { code } });
  }
}
