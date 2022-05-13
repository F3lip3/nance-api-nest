import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { crypto } from '../common/helpers/crypto';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginResponseDto } from './dto/login.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login(user: UserEntity): Promise<LoginResponseDto> {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id
      }),
      user
    };
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<UserEntity | undefined> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return undefined;

    const valid = await crypto.compare(password, user.password);
    if (valid) {
      return user;
    }
  }
}
