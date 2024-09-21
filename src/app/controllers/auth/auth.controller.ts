import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginDTO, LoginResponseDTO } from 'src/models/Interfaces/auth/Auth';

@ApiTags('Auth')
@Controller()
export class AuthController {
   constructor(private readonly service: AuthService) {}

   @Post('login')
   @HttpCode(HttpStatus.CREATED)
   @ApiBody({ type: LoginDTO })
   @ApiOperation({ summary: 'Authorizating a user', description: 'You can authorize a user' })
   @ApiResponse({ status: 200, description: 'User authorizated', type: LoginResponseDTO })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
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
