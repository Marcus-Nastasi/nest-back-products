import { Module } from '@nestjs/common';
import { PurchasesController } from 'src/controllers/purchases/purchases.controller';
import { AuthService } from 'src/service/auth/auth.service';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { PurchasesService } from 'src/service/purchases/purchases.service';

@Module({
   providers: [PrismaService, AuthService, PurchasesService],
   controllers: [PurchasesController]
})
export class PurchasesModule {}
