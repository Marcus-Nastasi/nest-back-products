import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginRequestDto, LoginResponseDto } from 'src/domain/types/auth/auth.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
   constructor(private readonly service: AuthService) {}

   @Post('login')
   @HttpCode(HttpStatus.CREATED)
   @ApiBody({ type: LoginRequestDto })
   @ApiOperation({ summary: 'Authorizating a user', description: 'You can authorize a user' })
   @ApiResponse({ status: 200, description: 'User authorizated', type: LoginResponseDto })
   @ApiResponse({ status: 403, description: 'Forbidden.'})
   async login(
      @Body() body: LoginRequestDto, 
      @Res() res: Response
   ): Promise<Response<Promise<LoginResponseDto>>> {
      const data: LoginResponseDto | null = await this.service.login(body);
      if (!data) return res
         .status(HttpStatus.FORBIDDEN)
         .end();
      return res
         .status(200)
         .json(data);
   }
}
