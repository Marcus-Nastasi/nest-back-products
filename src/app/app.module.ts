import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './services/prisma/prisma.service';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';
import { SalesController } from './controllers/sales/sales.controller';
import { SalesService } from './services/sales/sales.service';
import { AuthModule } from './modules/auth/auth.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { ExpensesService } from './services/expenses/expenses.service';
import { ExpensesController } from './controllers/expenses/expenses.controller';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, SalesModule, AuthModule, ExpensesModule],
  controllers: [UsersController, SalesController, AuthController, ExpensesController],
  providers: [PrismaService, UsersService, SalesService, AuthService, ExpensesService],
})
export class AppModule {}
