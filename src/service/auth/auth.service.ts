import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypr from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import IUser from 'src/Interfaces/users/IUser';
import LoginDTO from 'src/DTOs/auth/LoginDTO';

@Injectable()
export class AuthService {
   constructor(private readonly prisma: PrismaService) {}

   private async generateToken(cpf: string): Promise<string> {
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

   private async validateToken(token: string) {
      try {
         return jwt.verify(token, 'sct');
      } catch(e: any) {
         console.log(e)
      }
   }

   private async validatePassword(raw: string, encoded: string): Promise<boolean> {
      return await bcrypr.compare(raw, encoded);
   }

   private async getUser(data: LoginDTO): Promise<IUser> {
      const user: IUser = await this.prisma.users.findFirst({ where: { cpf: data.cpf } });
      if (!user) return null;
      if (!this.validatePassword(data.password, user.password)) return null;
      return user;
   }

   async login(data: LoginDTO): Promise<object> {
      const user: IUser | null = await this.getUser(data);
      if (!user) return null;
      const token: string = await this.generateToken(user.cpf);
      if (!token) return null;
      return { id: user.id, cpf: user.cpf, token: token };
   }
}

