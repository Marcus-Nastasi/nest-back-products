import { Module } from '@nestjs/common';
import { UserRegisterController } from 'src/controllers/user_register/user_register.controller';

@Module({
   controllers: [UserRegisterController]
})
export class UserRegisterModule {}
