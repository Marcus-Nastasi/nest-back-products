import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import UserRegisterDTO from 'src/DTOs/users/UserRegisterDTO';
import UpdateDTO from 'src/DTOs/users/UpdateDTO';
import IUser from 'src/Interfaces/users/IUser';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
   constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

   async get(): Promise<Array<IUser>> {
      return await this.prisma.users.findMany();
   }

   async register(data: UserRegisterDTO): Promise<IUser> {
      if (!data.password) return null;
      data.password = await bcrypt.hash(data.password, 10);
      return await this.prisma.users.create({ data });
   }

   async update(id: number, data: UpdateDTO): Promise<IUser | null> {
      const user: IUser = await this.prisma.users.findFirst({ 
         where: {
            id: id 
         } 
      });
      if (!user) return null;
      const validPass: boolean = await bcrypt.compare(data.current_password, user.password);
      if (!validPass) return null;
      user.name = data.name;
      user.cpf = data.cpf;
      user.password = await bcrypt.hash(data.new_password, 10);
      const updated: IUser = await this.prisma.users.update({ 
         where: {
            id: id 
         }, data: user 
      });
      return updated; 
   }

   async delete(id: number): Promise<IUser> {
      return await this.prisma.users.delete({ 
         where: {
            id: id 
         } 
      });
   }
}

