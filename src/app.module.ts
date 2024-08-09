import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './service/prisma/prisma.service';
import { UsersService } from './service/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { PurchasesController } from './controllers/purchases/purchases.controller';
import { PurchasesService } from './service/purchases/purchases.service';
import { AuthService } from './service/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { HomeController } from './controllers/home/home.controller';
import { HomeModule } from './modules/home/home.module';
import { LoginController } from './controllers/login/login.controller';
import { LoginModule } from './modules/login/login.module';
import { UserRegisterController } from './controllers/user_register/user_register.controller';
import { UserRegisterModule } from './modules/user_register/user_register.module';
import { ProdRegisterController } from './controllers/prod_register/prod_register.controller';
import { ProdRegisterModule } from './modules/prod_register/prod_register.module';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, PurchasesModule, HomeModule, LoginModule, UserRegisterModule, ProdRegisterModule],
  controllers: [AppController, UsersController, PurchasesController, AuthController, HomeController, LoginController, UserRegisterController, ProdRegisterController],
  providers: [AppService, PrismaService, UsersService, PurchasesService, AuthService],
})
export class AppModule {}
