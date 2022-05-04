import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { crypto } from '../common/helpers/crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    if (exists) {
      throw new BadRequestException(
        'An user with the provided email already exists.'
      );
    }

    const password = await crypto.encrypt(randomUUID());

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password
      }
    });

    return new User(newUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: {
        NOT: {
          status: 'REMOVED'
        }
      }
    });

    return users.map(usr => new User(usr));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return new User(user);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id
      },
      data
    });

    return new User(updatedUser);
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const removedUser = await this.prisma.user.delete({
      where: { id }
    });

    return new User(removedUser);
  }
}
