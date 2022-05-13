import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: {
        expiresIn: '60s'
      },
      secret: process.env.JWT_SECRET
    })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy]
})
export class AuthModule {}
