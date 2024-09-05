import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import ISales from 'src/Interfaces/sales/ISales';
import SalesRegisterDTO from 'src/DTOs/sales/SalesRegisterDTO';

@Injectable()
export class SalesService {
   constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

   async get(): Promise<Array<ISales>> {
      return await this.prisma.sales.findMany();
   }

   async register(data: SalesRegisterDTO): Promise<ISales> {
      return await this.prisma.sales.create({ data });
   }

   async update(id: number, data: SalesRegisterDTO): Promise<ISales> {
      return await this.prisma.sales.update({ 
         where: {
            id: id 
         }, 
         data: data 
      });
   }

   async delete(id: number): Promise<ISales> {
      return await this.prisma.sales.delete({ 
         where: { 
            id: id 
         } 
      });
   }
}

