import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import LoginDTO from 'src/DTOs/auth/LoginDTO';
import LoginResponseDTO from 'src/DTOs/auth/LoginResponseDTO';
import { AuthService } from 'src/service/auth/auth.service';

@Controller()
export class AuthController {
   constructor(private readonly service: AuthService) {}

   @Post('login')
   async login(
      @Body() body: LoginDTO, 
      @Res() res: Response
   ): Promise<Response<Promise<LoginResponseDTO>>> {
      const data: LoginResponseDTO | null = await this.service.login(body);
      if (!data) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      return res
         .status(200)
         .json({ data });
   }
}

