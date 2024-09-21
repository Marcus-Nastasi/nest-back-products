import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IProdutc, ProductRegisterDTO } from 'src/models/Interfaces/products/IProduct';

@Injectable()
export class ProductsService {
   constructor(private readonly prisma: PrismaService) {}

   async get(): Promise<IProdutc[]> {
      return await this.prisma.products.findMany({
         orderBy: {
            id: 'asc'
         }
      });
   }

   async getUnique(id: number): Promise<IProdutc> {
      return await this.prisma.products.findUnique({ 
         where: {
            id: id
         } 
      });
   }

   async search(name: string): Promise<IProdutc[]> {
      return await this
         .prisma
         .$queryRaw
         `SELECT * FROM products WHERE LOWER(name) LIKE CONCAT('%', CONCAT(${name}, '%'));`;
   }

   async register(data: ProductRegisterDTO): Promise<IProdutc> {
      return await this.prisma.products.create({ data });
   }

   async update(id: number, data: ProductRegisterDTO): Promise<IProdutc> {
      return await this.prisma.products.update({ 
         where: { 
            id: id 
         }, 
         data: data 
      });
   }

   async delete(id: number): Promise<IProdutc> {
      return await this.prisma.products.delete({ 
         where: { 
            id: id 
         } 
      });
   }
}
