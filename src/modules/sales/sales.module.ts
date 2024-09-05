import { Module } from '@nestjs/common';
import { SalesController } from 'src/controllers/sales/sales.controller';
import { AuthService } from 'src/service/auth/auth.service';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { SalesService } from 'src/service/sales/sales.service';

@Module({
   providers: [PrismaService, AuthService, SalesService],
   controllers: [SalesController]
})
export class SalesModule {}
