import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductRequestDto, ProdutcResponseDto } from 'src/domain/types/products/products.dto';

@Injectable()
export class ProductsService {
   constructor(private readonly prisma: PrismaService) {}

   async get(): Promise<ProdutcResponseDto[]> {
      return await this.prisma.products.findMany({
         orderBy: {
            id: 'asc'
         }
      });
   }

   async getUnique(id: number): Promise<ProdutcResponseDto> {
      return await this.prisma.products.findUnique({ 
         where: {
            id: id
         } 
      });
   }

   async search(name: string): Promise<ProdutcResponseDto[]> {
      return await this
         .prisma
         .$queryRaw
         `SELECT * FROM products WHERE LOWER(name) LIKE LOWER(CONCAT('%', CONCAT(${name}, '%')));`;
   }

   async register(data: ProductRequestDto): Promise<ProdutcResponseDto> {
      return await this.prisma.products.create({ data });
   }

   async update(
      id: number, data: Partial<ProductRequestDto>
   ): Promise<ProdutcResponseDto> {
      return await this.prisma.products.update({ 
         where: { 
            id: id 
         }, 
         data: data 
      });
   }

   async delete(id: number): Promise<ProdutcResponseDto> {
      return await this.prisma.products.delete({ 
         where: { 
            id: id 
         } 
      });
   }
}
