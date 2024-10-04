import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/app/services/auth/auth.guard';

import { ProductsService } from 'src/app/services/products/products.service';
import { ProductRequestDto, ProductSearchRequestDto, ProdutcResponseDto } from 'src/domain/types/products/products.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
   constructor(
      private readonly service: ProductsService 
   ) {}

   @Get()
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Get products', description: 'You can get all products' })
   @ApiResponse({ status: 200, description: 'Getting all the products', type: [ProdutcResponseDto] })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
   async get(
      @Res() res: Response
   ): Promise<Response<Promise<ProdutcResponseDto[]>>> {
      const products: Array<ProdutcResponseDto> = await this.service.get();
      if (!products.length) return res
         .status(HttpStatus.NO_CONTENT)
         .end();
      return res
         .status(200)
         .json(products);
   }

   @Get('/:id')
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Get one products', description: 'You can get one product' })
   @ApiResponse({ status: 200, description: 'Getting one product', type: ProdutcResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
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
         .json(product);
   }

   @Post('search')
   @HttpCode(HttpStatus.OK)
   @ApiBody({ type: ProductSearchRequestDto })
   @ApiOperation({ summary: 'Search products', description: 'You can search a product' })
   @ApiResponse({ status: 200, description: 'Searching the product', type: ProdutcResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
   async search(
      @Body() data: Partial<ProductSearchRequestDto>, 
      @Res() res: Response
   ): Promise<Response<Promise<ProdutcResponseDto[]>>> {
      const products: ProdutcResponseDto[] = await this.service.search(data.name);
      if (!products.length) return res
         .status(HttpStatus.NO_CONTENT)
         .end();
      return res
         .status(200)
         .json(products);
   }

   @Post('register')
   @HttpCode(HttpStatus.CREATED)
   @ApiBody({ type: ProductRequestDto })
   @ApiOperation({ summary: 'Create a product', description: 'You can create a product' })
   @ApiResponse({ status: 200, description: 'Creating the products', type: ProdutcResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
   async register(
      @Body() data: ProductRequestDto, 
      @Res() res: Response
   ): Promise<Response<Promise<ProdutcResponseDto>>> {
      const product: ProdutcResponseDto = await this.service.register(data);
      return res
         .status(201)
         .json(product);
   }

   @Put('update/:id')
   @HttpCode(HttpStatus.OK)
   @ApiBody({ type: ProductRequestDto })
   @ApiOperation({ summary: 'Update a products', description: 'You can update a product' })
   @ApiResponse({ status: 200, description: 'Updating the product', type: ProdutcResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
   async update(
      @Param('id') id: string, 
      @Body() data: Partial<ProductRequestDto>, 
      @Res() res: Response
   ): Promise<Response<Promise<ProdutcResponseDto>>> {
      const product: ProdutcResponseDto = await this.service.update(Number(id), data);
      return res
         .status(201)
         .json(product);
   }

   @Delete('delete/:id')
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Delete a product', description: 'You can delete a product' })
   @ApiResponse({ status: 200, description: 'Updating the product', type: ProdutcResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
   async delete(
      @Param('id') id: string, 
      @Res() res: Response
   ): Promise<Response<Promise<ProdutcResponseDto>>> {
      const product: ProdutcResponseDto = await this.service.delete(Number(id));
      return res
         .status(202)
         .json(product);
   }
}
