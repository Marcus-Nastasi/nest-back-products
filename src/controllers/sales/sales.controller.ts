import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import SalesRegisterDTO from 'src/DTOs/sales/SalesRegisterDTO';
import ISales from 'src/Interfaces/sales/ISales';
import { AuthService } from 'src/service/auth/auth.service';
import { SalesService } from 'src/service/sales/sales.service';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
   constructor(
      private readonly service: SalesService, 
      private readonly auth: AuthService
   ) {}

   @Get()
   async get(
      @Headers('authorization') token: string, 
      @Res() res: Response
   ): Promise<Response<Promise<Array<ISales>>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const purchases: Array<ISales> = await this.service.get();
      return res
         .status(200)
         .json({ purchases });
   }

   @Post('register')
   async register(
      @Body() body: SalesRegisterDTO, 
      @Headers('authorization') token: string, 
      @Res() res: Response
   ): Promise<Response<Promise<ISales>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const purchase: ISales = await this.service.register(body);
      return res
         .status(201)
         .json({ purchase });
   }

   @Put('update/:id')
   async update(
      @Param('id') id: string, 
      @Body() body: SalesRegisterDTO, 
      @Headers('authorization') token: string, 
      @Res() res: Response
   ): Promise<Response<Promise<ISales>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const purchase: ISales = await this.service.update(Number(id), body);
      return res
         .status(201)
         .json({ purchase });
   }

   @Delete('delete/:id')
   async delete(
      @Param('id') id: string, 
      @Headers('authorization') token: string, 
      @Res() res: Response
   ): Promise<Response<Promise<ISales>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const purchase: ISales = await this.service.delete(Number(id));
      return res
         .status(202)
         .json({ purchase });
   }
}

