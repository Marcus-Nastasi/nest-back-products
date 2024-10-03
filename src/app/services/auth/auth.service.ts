import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcryprt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IUser } from 'src/domain/types/users/user.dto';
import { LoginRequestDto, LoginResponseDto } from 'src/domain/types/auth/auth.dto';

@Injectable()
export class AuthService {
   constructor(
      private readonly prisma: PrismaService
   ) {}

   public async generateToken(user: IUser): Promise<string> {
      try {
         const token: string = jwt.sign(
            { user },
            process.env.TOKEN_SECRET,
            { expiresIn: '1d' }
         );
         return token;
      } catch(e: any) {
         console.log(e);
      }
   }

   private async getUser(data: LoginRequestDto): Promise<IUser> {
      const user: IUser = await this.prisma.users.findFirst({ 
         where: { cpf: data.cpf } 
      });
      if (!user) return null;
      if (!(await bcryprt.compare(data.password, user.password))) return null;
      return user;
   }

   public async login(data: LoginRequestDto): Promise<LoginResponseDto> {
      const user: IUser | null = await this.getUser(data);
      if (!user) return null;
      if (!(await bcryprt.compare(data.password, user.password))) return null;
      const token: string = await this.generateToken(user);
      if (!token) return null;
      return { 
         id: user.id, 
         cpf: user.cpf, 
         token: token
      };
   }
}
