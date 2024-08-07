import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import PurchaseRegisterDTO from 'src/DTOs/purchases/PurchaseRegisterDTO';
import IPurchase from 'src/Interfaces/purchases/IPurchase';
import { AuthService } from 'src/service/auth/auth.service';
import { PurchasesService } from 'src/service/purchases/purchases.service';

@Controller('purchases')
export class PurchasesController {
   constructor(private readonly service: PurchasesService, private readonly auth: AuthService) {}

   @Get()
   async get(@Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<Array<IPurchase>>>> {
      if (!token) return res.status(HttpStatus.FORBIDDEN).end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res.status(HttpStatus.FORBIDDEN).end();
      const purchases: Array<IPurchase> = await this.service.get();
      return res.status(200).json({ purchases });
   }

   @Post('register')
   async register(@Body() body: PurchaseRegisterDTO, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<IPurchase>>> {
      if (!token) return res.status(HttpStatus.FORBIDDEN).end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res.status(HttpStatus.FORBIDDEN).end();
      const purchase: IPurchase = await this.service.register(body);
      return res.status(201).json({ purchase });
   }

   @Put('update/:id')
   async update(@Param('id') id: string, @Body() body: PurchaseRegisterDTO, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<IPurchase>>> {
      if (!token) return res.status(HttpStatus.FORBIDDEN).end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res.status(HttpStatus.FORBIDDEN).end();
      const purchase: IPurchase = await this.service.update(Number(id), body);
      return res.status(201).json({ purchase });
   }

   @Delete('delete/:id')
   async delete(@Param('id') id: string, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<IPurchase>>> {
      if (!token) return res.status(HttpStatus.FORBIDDEN).end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res.status(HttpStatus.FORBIDDEN).end();
      const purchase: IPurchase = await this.service.delete(Number(id));
      return res.status(202).json({ purchase });
   }
}

