import { Module } from '@nestjs/common';
import { LoginController } from 'src/controllers/login/login.controller';

@Module({
   controllers: [LoginController]
})
export class LoginModule {}
