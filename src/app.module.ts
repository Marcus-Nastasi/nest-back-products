import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './service/prisma/prisma.service';
import { UsersService } from './service/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { AuthService } from './service/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';
import { HomeController } from './controllers/home/home.controller';
import { HomeModule } from './modules/home/home.module';
import { LoginController } from './controllers/login/login.controller';
import { LoginModule } from './modules/login/login.module';
import { ExpensesController } from './controllers/expenses/expenses.controller';
import { ExpensesService } from './service/expenses/expenses.service';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { SalesController } from './controllers/sales/sales.controller';
import { SalesService } from './service/sales/sales.service';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, SalesModule, HomeModule, LoginModule, ExpensesModule],
  controllers: [UsersController, SalesController, AuthController, HomeController, LoginController, ExpensesController],
  providers: [PrismaService, UsersService, SalesService, AuthService, ExpensesService],
})
export class AppModule {}
