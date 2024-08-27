import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './service/prisma/prisma.service';
import { UsersService } from './service/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { PurchasesController } from './controllers/sales/purchases.controller';
import { PurchasesService } from './service/sales/purchases.service';
import { AuthService } from './service/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { HomeController } from './controllers/home/home.controller';
import { HomeModule } from './modules/home/home.module';
import { LoginController } from './controllers/login/login.controller';
import { LoginModule } from './modules/login/login.module';
import { ExpensesController } from './controllers/expenses/expenses.controller';
import { ExpensesService } from './service/expenses/expenses.service';
import { ExpensesModule } from './modules/expenses/expenses.module';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, PurchasesModule, HomeModule, LoginModule, ExpensesModule],
  controllers: [UsersController, PurchasesController, AuthController, HomeController, LoginController, ExpensesController],
  providers: [PrismaService, UsersService, PurchasesService, AuthService, ExpensesService],
})
export class AppModule {}
