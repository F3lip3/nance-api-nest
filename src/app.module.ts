import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { SymbolsModule } from './symbols/symbols.module';

@Module({
  imports: [UsersModule, AuthModule, PortfoliosModule, CurrenciesModule, SymbolsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
