import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import IPurchase from 'src/Interfaces/purchases/IPurchase';
import PurchaseRegisterDTO from 'src/DTOs/purchases/PurchaseRegisterDTO';

@Injectable()
export class PurchasesService {
   constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

   async get(): Promise<Array<IPurchase>> {
      return await this.prisma.purchases.findMany();
   }

   async register(data: PurchaseRegisterDTO): Promise<IPurchase> {
      return await this.prisma.purchases.create({ data });
   }

   async update(id: number, data: PurchaseRegisterDTO): Promise<IPurchase> {
      return await this.prisma.purchases.update({ where: { id: id }, data: data });
   }

   async delete(id: number): Promise<IPurchase> {
      return await this.prisma.purchases.delete({ where: { id: id } });
   }
}

