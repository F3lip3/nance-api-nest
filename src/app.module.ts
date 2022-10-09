import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { HoldingsModule } from './holdings/holdings.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { SymbolsModule } from './symbols/symbols.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    PortfoliosModule,
    CurrenciesModule,
    SymbolsModule,
    HoldingsModule,
    TransactionsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
