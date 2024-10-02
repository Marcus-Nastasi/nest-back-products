import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/app/services/auth/auth.guard';

import { SalesService } from 'src/app/services/sales/sales.service';
import { SalesRequestDto, SalesResponseDto } from 'src/domain/types/sales/sales.dto';

@ApiTags('Sales')
@ApiBasicAuth()
@Controller('sales')
export class SalesController {
   constructor(
      private readonly service: SalesService 
   ) {}

   @Get()
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Get all sales', description: 'You can get all sales' })
   @ApiResponse({ status: 200, description: 'Getting the sales', type: [SalesResponseDto] })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
   async get(
      @Res() res: Response
   ): Promise<Response<Promise<SalesResponseDto[]>>> {
      const purchases: SalesResponseDto[] = await this.service.get();
      return res
         .status(200)
         .json({ purchases });
   }

   @Post('register')
   @HttpCode(HttpStatus.OK)
   @ApiBody({ type: SalesRequestDto })
   @ApiOperation({ summary: 'Create a sale', description: 'You can create a sale' })
   @ApiResponse({ status: 200, description: 'Getting the sales', type: SalesResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
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
   @HttpCode(HttpStatus.OK)
   @ApiBody({ type: SalesRequestDto })
   @ApiOperation({ summary: 'Update a sale', description: 'You can update a sale' })
   @ApiResponse({ status: 200, description: 'Getting the sales', type: SalesResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
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
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Delete a sale', description: 'You can delete a sale' })
   @ApiResponse({ status: 200, description: 'Deleting the sale', type: SalesResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
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
