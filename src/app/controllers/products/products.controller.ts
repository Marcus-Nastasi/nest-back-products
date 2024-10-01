import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';

import { IProdutc, ProductRegisterDTO } from 'src/domain/types/products/IProduct';
import { ProductsService } from 'src/app/services/products/products.service';

@Controller('products')
export class ProductsController {
   constructor(
      private readonly service: ProductsService 
   ) {}

   @Get()
   async get(
      @Res() res: Response
   ): Promise<Response<Promise<IProdutc[]>>> {
      const products: Array<IProdutc> = await this.service.get();
      if (!products.length) return res
         .status(HttpStatus.NO_CONTENT)
         .end();
      return res
         .status(200)
         .json({ products });
   }

   @Get('/:id')
   async getUnique(
      @Param('id') id: string, 
      @Res() res: Response
   ): Promise<Response<Promise<IProdutc>>> {
      const product: IProdutc = await this.service.getUnique(Number(id));
      if (!product) return res
         .status(HttpStatus.NO_CONTENT)
         .end();
      return res
         .status(200)
         .json({ product });
   }

   @Post('search')
   async search(
      @Body() data: { name: string }, 
      @Res() res: Response
   ): Promise<Response<Promise<IProdutc[]>>> {
      const products: IProdutc[] = await this.service.search(data.name);
      if (!products.length) return res
         .status(HttpStatus.NO_CONTENT)
         .end();
      return res
         .status(200)
         .json({ products });
   }

   @Post('register')
   async register(
      @Body() data: ProductRegisterDTO, 
      @Res() res: Response
   ): Promise<Response<Promise<IProdutc>>> {
      const product: IProdutc = await this.service.register(data);
      return res
         .status(201)
         .json({ product });
   }

   @Put('update/:id')
   async update(
      @Param('id') id: string, 
      @Body() data: ProductRegisterDTO, 
      @Res() res: Response
   ): Promise<Response<Promise<IProdutc>>> {
      const product: IProdutc = await this.service.update(Number(id), data);
      return res
         .status(201)
         .json({ product });
   }

   @Delete('delete/:id')
   async delete(
      @Param('id') id: string, 
      @Res() res: Response
   ): Promise<Response<Promise<IProdutc>>> {
      const product: IProdutc = await this.service.delete(Number(id));
      return res
         .status(202)
         .json({ product });
   }
}
