-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'REMOVED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'COMMON');

-- CreateTable
CREATE TABLE "currencies" (
    "id" TEXT NOT NULL,
    "code" VARCHAR NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holdings" (
    "id" TEXT NOT NULL,
    "portfolio_id" TEXT NOT NULL,
    "symbol_id" TEXT NOT NULL,
    "transactions" INTEGER NOT NULL,
    "shares" DECIMAL(65,30) NOT NULL,
    "average_cost" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "holdings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "currency_id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'ACTIVE',
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "symbols" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "exchange" VARCHAR(10) NOT NULL,
    "shortname" VARCHAR(500) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "sector" VARCHAR(500) NOT NULL,
    "industry" VARCHAR(1000) NOT NULL,
    "longname" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "symbols_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "symbol_historical_prices" (
    "id" TEXT NOT NULL,
    "symbol_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "open" DECIMAL(65,30) NOT NULL,
    "high" DECIMAL(65,30) NOT NULL,
    "close" DECIMAL(65,30) NOT NULL,
    "adjusted_close" DECIMAL(65,30) NOT NULL,
    "volume" BIGINT NOT NULL,

    CONSTRAINT "symbol_historical_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "user_id" TEXT NOT NULL,
    "portfolio_id" TEXT NOT NULL,
    "symbol_id" TEXT NOT NULL,
    "shares" DECIMAL(65,30) NOT NULL,
    "cost_per_share" DECIMAL(65,30) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'ACTIVE',
    "role" "UserRole" NOT NULL DEFAULT E'COMMON',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "currencies_code_key" ON "currencies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "holdings_portfolio_id_symbol_id_key" ON "holdings"("portfolio_id", "symbol_id");

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_name_user_id_key" ON "portfolios"("name", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "symbols_code_key" ON "symbols"("code");

-- CreateIndex
CREATE UNIQUE INDEX "symbol_historical_prices_symbol_id_date_key" ON "symbol_historical_prices"("symbol_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holdings" ADD CONSTRAINT "holdings_symbol_id_fkey" FOREIGN KEY ("symbol_id") REFERENCES "symbols"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "symbol_historical_prices" ADD CONSTRAINT "symbol_historical_prices_symbol_id_fkey" FOREIGN KEY ("symbol_id") REFERENCES "symbols"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_symbol_id_fkey" FOREIGN KEY ("symbol_id") REFERENCES "symbols"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
