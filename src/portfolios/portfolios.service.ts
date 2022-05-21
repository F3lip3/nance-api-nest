import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CurrencyEntity } from '../currencies/entities/currency.entity';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfolioEntity } from './entities/portfolio.entity';

@Injectable()
export class PortfoliosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user_id: number, data: CreatePortfolioDto) {
    const currency = await this.prisma.currency.findUnique({
      where: {
        code: data.currency
      }
    });

    if (!currency) {
      throw new BadRequestException('Provided currency does not exists.');
    }

    const exists = await this.prisma.portfolio.findFirst({
      where: {
        name: data.name,
        user_id
      }
    });

    if (exists) {
      throw new BadRequestException(
        'An portfolio with the provided name already exists.'
      );
    }

    const newPortfolio = await this.prisma.portfolio.create({
      data: {
        name: data.name,
        currency: {
          connect: {
            code: data.currency
          }
        },
        user: {
          connect: {
            id: user_id
          }
        }
      }
    });

    return new PortfolioEntity({
      ...newPortfolio,
      currency: new CurrencyEntity(currency)
    });
  }

  async findAll(user_id: number) {
    const portfolios = await this.prisma.portfolio.findMany({
      where: { user_id },
      include: { currency: true }
    });

    return portfolios.map(
      portfolio =>
        new PortfolioEntity({
          ...portfolio,
          currency: new CurrencyEntity(portfolio.currency)
        })
    );
  }

  async findOne(id: number, user_id: number) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: { currency: true }
    });

    if (portfolio?.user_id !== user_id) throw new NotFoundException();

    return new PortfolioEntity({
      ...portfolio,
      currency: new CurrencyEntity(portfolio.currency)
    });
  }

  async update(id: number, user_id: number, data: UpdatePortfolioDto) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: { currency: true }
    });

    if (portfolio?.user_id !== user_id) {
      throw new NotFoundException('Portfolio not found.');
    }

    if (data.currency) {
      const currency = await this.prisma.currency.findUnique({
        where: {
          code: data.currency
        }
      });

      if (!currency) {
        throw new BadRequestException('Provided currency does not exists.');
      }
    }

    if (data.name) {
      const nameExists = await this.prisma.portfolio.findFirst({
        where: {
          NOT: { id },
          name: data.name,
          user_id
        }
      });

      if (nameExists) {
        throw new BadRequestException(
          'An portfolio with the provided name already exists.'
        );
      }
    }

    const updatedPortfolio = await this.prisma.portfolio.update({
      where: { id },
      data: {
        name: data.name ?? portfolio.name,
        currency: {
          connect: {
            code: data.currency ?? portfolio.currency.code
          }
        }
      },
      include: { currency: true }
    });

    return new PortfolioEntity({
      ...updatedPortfolio,
      currency: new CurrencyEntity(updatedPortfolio.currency)
    });
  }

  async remove(id: number, user_id: number) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: { currency: true }
    });

    if (portfolio?.user_id !== user_id) {
      throw new NotFoundException('Portfolio not found.');
    }

    const removedPortfolio = await this.prisma.portfolio.delete({
      where: { id }
    });

    return new PortfolioEntity(removedPortfolio);
  }
}
