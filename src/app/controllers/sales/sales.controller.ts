import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { SalesService } from 'src/app/services/sales/sales.service';
import { SalesRequestDto, SalesResponseDto } from 'src/domain/types/sales/sales.dto';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
   constructor(
      private readonly service: SalesService 
   ) {}

   @Get()
   async get( 
      @Res() res: Response
   ): Promise<Response<Promise<SalesResponseDto[]>>> {
      const purchases: SalesResponseDto[] = await this.service.get();
      return res
         .status(200)
         .json({ purchases });
   }

   @Post('register')
   async register(
      @Body() body: SalesRequestDto,  
      @Res() res: Response
   ): Promise<Response<Promise<SalesResponseDto>>> {
      const purchase: SalesResponseDto = await this.service.register(body);
      return res
         .status(201)
         .json({ purchase });
   }

   @Put('update/:id')
   async update(
      @Param('id') id: string, 
      @Body() body: Partial<SalesRequestDto>,  
      @Res() res: Response
   ): Promise<Response<Promise<SalesResponseDto>>> {
      const purchase: SalesResponseDto = await this.service.update(Number(id), body);
      return res
         .status(201)
         .json({ purchase });
   }

   @Delete('delete/:id')
   async delete(
      @Param('id') id: string,  
      @Res() res: Response
   ): Promise<Response<Promise<SalesResponseDto>>> {
      const purchase: SalesResponseDto = await this.service.delete(Number(id));
      return res
         .status(202)
         .json({ purchase });
   }
}
