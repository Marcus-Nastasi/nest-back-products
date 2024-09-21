import { Module } from '@nestjs/common';
import { SalesController } from 'src/app/controllers/sales/sales.controller';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PrismaService } from 'src/app/services/prisma/prisma.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Module({
   providers: [PrismaService, AuthService, SalesService],
   controllers: [SalesController]
})
export class SalesModule {}
