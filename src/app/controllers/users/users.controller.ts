import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/app/services/auth/auth.guard';

import { UsersService } from 'src/app/services/users/users.service';
import { IUser, UserRequestDto, UserResponseDto, UserUpdateDto } from 'src/domain/types/users/user.dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
   constructor(
      private readonly service: UsersService
   ) {}

   @Get('')
   @HttpCode(HttpStatus.OK)
   @ApiOperation({ summary: 'Get users', description: 'You can get all users' })
   @ApiResponse({ status: 200, description: 'Getting all the users', type: [IUser] })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
   async get(
      @Res() res: Response
   ): Promise<Response<Promise<IUser[]>>> {
      const users: IUser[] = await this.service.get();
      return res
         .status(200)
         .json(users);
   }

   @Post('register')
   @HttpCode(HttpStatus.CREATED)
   @ApiBody({ type: UserRequestDto })
   @ApiOperation({ summary: 'Create a user', description: 'You can register a user' })
   @ApiResponse({ status: 201, description: 'User created', type: IUser })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   async register(
      @Body() data: UserRequestDto, 
      @Res() res: Response
   ): Promise<Response<Promise<UserResponseDto>>> {
      const new_user: IUser = await this.service.register(data);
      if (!new_user) return res
         .status(HttpStatus.UNAUTHORIZED)
         .end();
      return res
         .status(201)
         .json(new_user);
   }

   @Patch('update/:id')
   @HttpCode(HttpStatus.OK)
   @ApiBody({ type: UserUpdateDto })
   @ApiParam({ name: 'id', type: 'string', required: true })
   @ApiOperation({ summary: 'Update a user', description: 'You can update a user' })
   @ApiResponse({ status: 200, description: 'User updated', type: UserResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
   async update(
      @Param('id') id: string, 
      @Body() data: UserUpdateDto, 
      @Res() res: Response
   ): Promise<Response<Promise<UserResponseDto>>> {
      const updated: IUser = await this.service.update(Number(id), data); 
      return res
         .status(200)
         .json(updated);
   }

   @Delete('delete/:id')
   @HttpCode(HttpStatus.OK)
   @ApiParam({ name: 'id', type: 'string', required: true })
   @ApiOperation({ summary: 'Delete a user', description: 'You can delete a user' })
   @ApiResponse({ status: 200, description: 'User deleted', type: UserResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   @UseGuards(AuthGuard)
   async delete(
      @Param('id') id: string, 
      @Res() res: Response
   ): Promise<Response<Promise<UserResponseDto>>> {
      const deleted: IUser = await this.service.delete(Number(id)); 
      return res
         .status(200)
         .json(deleted);
   }
}
