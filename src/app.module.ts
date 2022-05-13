import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PortfoliosModule } from './portfolios/portfolios.module';

@Module({
  imports: [UsersModule, AuthModule, PortfoliosModule],
  controllers: [],
  providers: []
})
export class AppModule {}
