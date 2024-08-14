import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Render, Res } from '@nestjs/common';
import { Response } from 'express';

import UpdateDTO from 'src/DTOs/users/UpdateDTO';
import UserRegisterDTO from 'src/DTOs/users/UserRegisterDTO';
import IUser from 'src/Interfaces/users/IUser';
import { AuthService } from 'src/service/auth/auth.service';
import { UsersService } from 'src/service/users/users.service';

@Controller('users')
export class UsersController {
   constructor(
      private readonly service: UsersService, 
      private readonly auth: AuthService
   ) {}

   @Get('register')
   @Render('pages/user_register')
   public render() {
      return
   }

   @Get('')
   async get(@Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<Array<IUser>>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const users: Array<IUser> = await this.service.get();
      return res
         .status(200)
         .json({ users });
   }

   @Post('register')
   async register(@Body() data: UserRegisterDTO, @Res() res: Response): Promise<Response<Promise<IUser>>> {
      const new_user: IUser = await this.service.register(data);
      if (!new_user) return res
         .status(HttpStatus.UNAUTHORIZED)
         .end();
      return res
         .status(201)
         .json({ new_user });
   }

   @Put('update/:id')
   async update(@Param('id') id: string, @Body() data: UpdateDTO, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<IUser>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const updated: IUser = await this.service.update(Number(id), data); 
      return res
         .status(201)
         .json({ updated });
   }

   @Delete('delete/:id')
   async delete(@Param('id') id: string, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Promise<IUser>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const deleted: IUser = await this.service.delete(Number(id)); 
      return res
         .status(202)
         .json({ deleted });
   }
}

