import { Module } from '@nestjs/common';
import { ProductsController } from 'src/controllers/products/products.controller';
import { AuthService } from 'src/service/auth/auth.service';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { ProductsService } from 'src/service/products/products.service';

@Module({
   providers: [PrismaService, AuthService, ProductsService],
   controllers: [ProductsController]
})
export class ProductsModule {}
