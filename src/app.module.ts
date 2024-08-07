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

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, PurchasesModule],
  controllers: [AppController, UsersController, PurchasesController, AuthController],
  providers: [AppService, PrismaService, UsersService, PurchasesService, AuthService],
})
export class AppModule {}
