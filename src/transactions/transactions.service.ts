import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    user_id: number,
    portfolio_id: number,
    data: CreateTransactionDto
  ) {
    const newTransaction = await this.prisma.transaction.create({
      data: {
        date: data.date,
        shares: data.shares,
        cost_per_share: data.cost_per_share,
        type: data.type,
        user: {
          connect: {
            id: user_id
          }
        },
        portfolio: {
          connect: {
            id: portfolio_id
          }
        },
        symbol: {
          connect: {
            id: data.symbol_id
          }
        }
      }
    });

    return new TransactionEntity(newTransaction);
  }

  async findAll(user_id: number, portfolio_id: number, symbol_id: number) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        user_id,
        portfolio_id,
        symbol_id
      }
    });

    return transactions?.map(trans => new TransactionEntity(trans));
  }

  async update(id: number, user_id: number, data: UpdateTransactionDto) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id }
    });

    if (transaction?.user_id !== user_id) {
      throw new NotFoundException('Transaction not found.');
    }

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: {
        date: data.date ?? transaction.date,
        shares: data.shares ?? transaction.shares,
        cost_per_share: data.cost_per_share ?? transaction.cost_per_share
      }
    });

    return new TransactionEntity(updatedTransaction);
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
