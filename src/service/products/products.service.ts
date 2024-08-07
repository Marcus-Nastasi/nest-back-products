import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import ProductRegisterDTO from 'src/DTOs/products/ProductRegisterDTO';
import IProdutc from 'src/Interfaces/products/IProduct';

@Injectable()
export class ProductsService {
   constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

   async get(): Promise<Array<IProdutc>> {
      return await this.prisma.products.findMany();
   }

   async register(data: ProductRegisterDTO): Promise<IProdutc> {
      return await this.prisma.products.create({ data });
   }

   async update(id: number, data: ProductRegisterDTO): Promise<IProdutc> {
      return await this.prisma.products.update({ where: { id: id }, data: data });
   }

   async delete(id: number): Promise<IProdutc> {
      return await this.prisma.products.delete({ where: { id: id } });
   }
}

