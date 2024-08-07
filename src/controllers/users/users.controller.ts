import { Body, Controller, Get, Post } from '@nestjs/common';
import UserRegisterDTO from 'src/DTOs/users/UserRegisterDTO';
import { UsersService } from 'src/service/users/users.service';

@Controller('users')
export class UsersController {
   constructor(private readonly service: UsersService) {}

   @Get('')
   async get(): Promise<object> {
      return await this.service.get();
   }

   @Post('register')
   async register(@Body() data: UserRegisterDTO) {
      return await this.service.register(data);
   }
}

