import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(
    email: string,
    password: string
  ): Promise<UserEntity | undefined> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    return user;
  }
}
