import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/app/services/auth/auth.guard';

import { ProductsService } from 'src/app/services/products/products.service';
import { ProductRequestDto, ProdutcResponseDto } from 'src/domain/types/products/products.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
   constructor(
      private readonly service: ProductsService 
   ) {}

   @Get('')
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Get products', description: 'You can get all products' })
   @ApiResponse({ status: 200, description: 'Getting all the users', type: [ProdutcResponseDto] })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
   @Get()
   async get(
      @Res() res: Response
   ): Promise<Response<Promise<ProdutcResponseDto[]>>> {
      const products: Array<ProdutcResponseDto> = await this.service.get();
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
   ): Promise<Response<Promise<ProdutcResponseDto>>> {
      const product: ProdutcResponseDto = await this.service.getUnique(Number(id));
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
   ): Promise<Response<Promise<ProdutcResponseDto[]>>> {
      const products: ProdutcResponseDto[] = await this.service.search(data.name);
      if (!products.length) return res
         .status(HttpStatus.NO_CONTENT)
         .end();
      return res
         .status(200)
         .json({ products });
   }

   @Post('register')
   async register(
      @Body() data: ProductRequestDto, 
      @Res() res: Response
   ): Promise<Response<Promise<ProdutcResponseDto>>> {
      const product: ProdutcResponseDto = await this.service.register(data);
      return res
         .status(201)
         .json({ product });
   }

   @Put('update/:id')
   async update(
      @Param('id') id: string, 
      @Body() data: Partial<ProductRequestDto>, 
      @Res() res: Response
   ): Promise<Response<Promise<ProdutcResponseDto>>> {
      const product: ProdutcResponseDto = await this.service.update(Number(id), data);
      return res
         .status(201)
         .json({ product });
   }

   @Delete('delete/:id')
   async delete(
      @Param('id') id: string, 
      @Res() res: Response
   ): Promise<Response<Promise<ProdutcResponseDto>>> {
      const product: ProdutcResponseDto = await this.service.delete(Number(id));
      return res
         .status(202)
         .json({ product });
   }
}
