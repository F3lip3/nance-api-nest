import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { crypto } from '../common/helpers/crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

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

    const password = await crypto.encrypt('power@!');

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password
      }
    });

    return new UserEntity(newUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: {
        NOT: {
          status: 'REMOVED'
        }
      }
    });

    return users.map(usr => new UserEntity(usr));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return new UserEntity(user);
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) return undefined;

    return new UserEntity(user);
  }

  async update(id: string, data: UpdateUserDto) {
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

    return new UserEntity(updatedUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const removedUser = await this.prisma.user.delete({
      where: { id }
    });

    return new UserEntity(removedUser);
  }
}
