import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SalesRequestDto, SalesResponseDto } from 'src/domain/types/sales/sales.dto';

@Injectable()
export class SalesService {
   constructor(private readonly prisma: PrismaService) {}

   async get(): Promise<SalesResponseDto[]> {
      return await this.prisma.sales.findMany({
         include: {
            product: true,
            user: true
         }
      });
   }

   async register(data: SalesRequestDto): Promise<Partial<SalesResponseDto>> {
      return await this.prisma.sales.create({ data });
   }

   async update(
      id: number, data: Partial<SalesRequestDto>
   ): Promise<Partial<SalesResponseDto>> {
      return await this.prisma.sales.update({ 
         where: {
            id: id 
         }, 
         data: data 
      });
   }

   async delete(id: number): Promise<Partial<SalesResponseDto>> {
      return await this.prisma.sales.delete({ 
         where: { 
            id: id 
         } 
      });
   }
}
