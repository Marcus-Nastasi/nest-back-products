import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { SalesService } from 'src/app/services/sales/sales.service';
import { ISales, SalesRegisterDTO } from 'src/domain/types/sales/ISales';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
   constructor(
      private readonly service: SalesService 
   ) {}

   @Get()
   async get( 
      @Res() res: Response
   ): Promise<Response<Promise<ISales[]>>> {
      const purchases: ISales[] = await this.service.get();
      return res
         .status(200)
         .json({ purchases });
   }

   @Post('register')
   async register(
      @Body() body: SalesRegisterDTO,  
      @Res() res: Response
   ): Promise<Response<Promise<ISales>>> {
      const purchase: ISales = await this.service.register(body);
      return res
         .status(201)
         .json({ purchase });
   }

   @Put('update/:id')
   async update(
      @Param('id') id: string, 
      @Body() body: SalesRegisterDTO,  
      @Res() res: Response
   ): Promise<Response<Promise<ISales>>> {
      const purchase: ISales = await this.service.update(Number(id), body);
      return res
         .status(201)
         .json({ purchase });
   }

   @Delete('delete/:id')
   async delete(
      @Param('id') id: string,  
      @Res() res: Response
   ): Promise<Response<Promise<ISales>>> {
      const purchase: ISales = await this.service.delete(Number(id));
      return res
         .status(202)
         .json({ purchase });
   }
}

