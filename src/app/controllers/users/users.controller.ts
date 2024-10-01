import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Param, Patch, Post, Put, Render, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { IUser, UpdateDTO, UserRegisterDTO } from 'src/domain/types/users/IUser';

@ApiTags('Users')
@Controller('users')
export class UsersController {
   constructor(
      private readonly service: UsersService, 
      private readonly auth: AuthService
   ) {}

   @Get('')
   @HttpCode(HttpStatus.OK)
   @ApiParam({ name: 'authorization', type: 'string', required: false })
   @ApiOperation({ summary: 'Get users', description: 'You can get all users' })
   @ApiResponse({ status: 200, description: 'Getting all the users', type: [IUser] })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   async get(
      @Headers('authorization') token: string, 
      @Res() res: Response
   ): Promise<Response<Promise<IUser[]>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const users: IUser[] = await this.service.get();
      return res
         .status(200)
         .json({ users });
   }

   @Post('register')
   @HttpCode(HttpStatus.CREATED)
   @ApiBody({ type: UserRegisterDTO })
   @ApiOperation({ summary: 'Create a user', description: 'You can register a user' })
   @ApiResponse({ status: 201, description: 'User created', type: IUser })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   async register(
      @Body() data: UserRegisterDTO, 
      @Res() res: Response
   ): Promise<Response<Promise<IUser>>> {
      const new_user: IUser = await this.service.register(data);
      if (!new_user) return res
         .status(HttpStatus.UNAUTHORIZED)
         .end();
      return res
         .status(201)
         .json({ new_user });
   }

   @Patch('update/:id')
   @HttpCode(HttpStatus.OK)
   @ApiBody({ type: UpdateDTO })
   @ApiParam({ name: 'id', type: 'string', required: true })
   @ApiOperation({ summary: 'Update a user', description: 'You can update a user' })
   @ApiResponse({ status: 200, description: 'User updated', type: IUser })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   async update(
      @Param('id') id: string, 
      @Body() data: UpdateDTO, 
      @Headers('authorization') token: string, 
      @Res() res: Response
   ): Promise<Response<Promise<IUser>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const updated: IUser = await this.service.update(Number(id), data); 
      return res
         .status(200)
         .json({ updated });
   }

   @Delete('delete/:id')
   @HttpCode(HttpStatus.OK)
   @ApiParam({ name: 'id', type: 'string', required: true })
   @ApiOperation({ summary: 'Delete a user', description: 'You can delete a user' })
   @ApiResponse({ status: 200, description: 'User deleted', type: IUser })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   async delete(
      @Param('id') id: string, 
      @Headers('authorization') token: string, 
      @Res() res: Response
   ): Promise<Response<Promise<IUser>>> {
      if (!token) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const user = await this.auth.validateToken(token.replace('Bearer ', ''));
      if (!user) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      const deleted: IUser = await this.service.delete(Number(id)); 
      return res
         .status(200)
         .json({ deleted });
   }
}
