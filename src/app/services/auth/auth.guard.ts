import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IUser } from 'src/domain/types/users/user.dto';
 
@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private jwtService: JwtService) {}
 
   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const token: string | undefined = this.extractTokenFromHeader(request);
      if (!token) throw new UnauthorizedException();
      try {
         const payload: IUser = await this.jwtService.verifyAsync(
            token,
            { secret: process.env.TOKEN_SECRET }
         );
         request['user'] = payload;
      } catch {
         throw new UnauthorizedException();
      }
      return true;
   }
 
   private extractTokenFromHeader(request: Request): string | undefined {
     const [ type, token ] = request.headers.authorization?.split(' ') ?? [];
     return type === 'Bearer' ? token : undefined;
   }
}
