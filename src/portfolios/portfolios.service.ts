import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { PortfolioEntity } from './entities/portfolio.entity';

@Injectable()
export class PortfoliosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePortfolioDto) {
    const exists = await this.prisma.portfolio.findFirst({
      where: {
        name: data.name,
        user_id: data.user_id
      }
    });

    if (exists) {
      throw new BadRequestException(
        'An portfolio with the provided name already exists.'
      );
    }

    const newPortfolio = await this.prisma.portfolio.create({
      data
    });

    return new PortfolioEntity(newPortfolio);
  }

  findAll(user_id: number) {
    return this.prisma.portfolio.findMany({
      where: { user_id }
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
