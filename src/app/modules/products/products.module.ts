import { Module } from '@nestjs/common';
import { ProductsController } from 'src/app/controllers/products/products.controller';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PrismaService } from 'src/app/services/prisma/prisma.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Module({
   providers: [PrismaService, AuthService, ProductsService],
   controllers: [ProductsController]
})
export class ProductsModule {}
