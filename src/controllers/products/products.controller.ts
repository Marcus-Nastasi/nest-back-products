import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import ProductRegisterDTO from 'src/DTOs/products/ProductRegisterDTO';
import IProdutc from 'src/Interfaces/products/IProduct';
import { AuthService } from 'src/service/auth/auth.service';
import { ProductsService } from 'src/service/products/products.service';

@Controller('products')
export class ProductsController {
   constructor(
      private readonly service: ProductsService, 
      private readonly auth: AuthService
   ) {}

   @Get()
   async get(@Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<Array<IProdutc>>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const products: Array<IProdutc> = await this.service.get();
      if (!products.length) return res
         .status(HttpStatus.NO_CONTENT)
         .end();
      return res
         .status(200)
         .json({ products });
   }

   @Get('/:id')
   async getUnique(@Param('id') id: string, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<IProdutc>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const product: IProdutc = await this.service.getUnique(Number(id));
      if (!product) return res
         .status(HttpStatus.NO_CONTENT)
         .end();
      return res
         .status(200)
         .json({ product });
   }

   @Post('search')
   async search(@Body() data: { name: string }, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<Array<IProdutc>>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user: string | JwtPayload = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const products: Array<IProdutc> = await this.service.search(data.name);
      if (!products.length) return res
         .status(HttpStatus.NO_CONTENT)
         .end();
      return res
         .status(200)
         .json({ products });
   }

   @Post('register')
   async register(@Body() data: ProductRegisterDTO, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<IProdutc>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user: string | JwtPayload = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const product: IProdutc = await this.service.register(data);
      return res
         .status(201)
         .json({ product });
   }

   @Put('update/:id')
   async update(@Param('id') id: string, @Body() data: ProductRegisterDTO, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<IProdutc>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const product: IProdutc = await this.service.update(Number(id), data);
      return res
         .status(201)
         .json({ product });
   }

   @Delete('delete/:id')
   async delete(@Param('id') id: string, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<IProdutc>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const product: IProdutc = await this.service.delete(Number(id));
      return res
         .status(202)
         .json({ product });
   }
}

