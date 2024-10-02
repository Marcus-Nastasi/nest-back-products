import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SalesRequestDto, SalesResponseDto } from 'src/domain/types/sales/sales.dto';

@Injectable()
export class SalesService {
   constructor(private readonly prisma: PrismaService) {}

   async get(): Promise<SalesResponseDto[]> {
      return await this.prisma.sales.findMany();
   }

   async register(data: SalesRequestDto): Promise<SalesResponseDto> {
      return await this.prisma.sales.create({ data });
   }

   async update(
      id: number, data: Partial<SalesRequestDto>
   ): Promise<SalesResponseDto> {
      return await this.prisma.sales.update({ 
         where: {
            id: id 
         }, 
         data: data 
      });
   }

   async delete(id: number): Promise<SalesResponseDto> {
      return await this.prisma.sales.delete({ 
         where: { 
            id: id 
         } 
      });
   }
}
