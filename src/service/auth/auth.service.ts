import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcryprt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import IUser from 'src/Interfaces/users/IUser';
import LoginDTO from 'src/DTOs/auth/LoginDTO';
import LoginResponseDTO from 'src/DTOs/auth/LoginResponseDTO';

@Injectable()
export class AuthService {
   constructor(private readonly prisma: PrismaService) {}

   public async generateToken(cpf: string): Promise<string> {
      try {
         const token: string = jwt.sign(
            { cpf: cpf },
            'sct',
            { expiresIn: '1d' }
         );
         return token;
      } catch(e: any) {
         console.log(e);
      }
   }

   public async validateToken(token: string) {
      try {
         return jwt.verify(token, 'sct');
      } catch(e: any) {
         return '';
      }
   }

   public async validatePassword(raw: string, encoded: string): Promise<boolean> {
      return await bcryprt.compare(raw, encoded);
   }

   private async getUser(data: LoginDTO): Promise<IUser> {
      const user: IUser = await this.prisma.users.findFirst({ where: { cpf: data.cpf } });
      if (!user) return null;
      if (!this.validatePassword(data.password, user.password)) return null;
      return user;
   }

   async login(data: LoginDTO): Promise<LoginResponseDTO> {
      const user: IUser | null = await this.getUser(data);
      if (!user) return null;
      const token: string = await this.generateToken(user.cpf);
      if (!token) return null;
      return { 
         id: user.id, 
         cpf: user.cpf, 
         token: token 
      };
   }
}

