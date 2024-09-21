import { Module } from '@nestjs/common';
import { LoginController } from 'src/app/controllers/login/login.controller';

@Module({
   controllers: [LoginController]
})
export class LoginModule {}
