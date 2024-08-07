import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import LoginDTO from 'src/DTOs/auth/LoginDTO';
import { AuthService } from 'src/service/auth/auth.service';

@Controller()
export class AuthController {
   constructor(private readonly service: AuthService) {}

   @Post('login')
   async login(@Body() data: LoginDTO, @Res() res: Response) {
      const user: object | null = await this.service.login(data);
      if (!user) return res.status(HttpStatus.FORBIDDEN);
      return res.status(200).json({ user });
   }
}

