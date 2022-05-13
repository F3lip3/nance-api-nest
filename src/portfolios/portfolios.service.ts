import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PortfoliosService {
  constructor(private readonly prisma: PrismaService) {}

  // create(createPortfolioDto: CreatePortfolioDto) {
  //   return 'This action adds a new portfolio';
  // }

  findAll(user_id: number) {
    return this.prisma.portfolio.findMany({
      where: {
        user_id,
        NOT: {
          status: 'REMOVED'
        }
      }
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} portfolio`;
  // }

  // update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
  //   return `This action updates a #${id} portfolio`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} portfolio`;
  // }
}
