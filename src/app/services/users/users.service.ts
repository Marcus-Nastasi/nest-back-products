import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { IUser, UserRequestDto, UserResponseDto, UserUpdateDto } from 'src/domain/types/users/user.dto';

@Injectable()
export class UsersService {
   constructor(
      private readonly prisma: PrismaService
   ) {}

   async get(): Promise<UserResponseDto[]> {
      return await this.prisma.users.findMany();
   }

   async register(data: UserRequestDto): Promise<UserResponseDto> {
      if (!data.password) return null;
      data.password = await bcrypt.hash(data.password, 10);
      const user: UserResponseDto = await this.prisma.users.create({ data });
      if (!user) return null;
      return user;
   }

   async update(id: number, data: UserUpdateDto): Promise<UserResponseDto | null> {
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
      if (!updated) return null;
      return updated; 
   }

   async delete(id: number): Promise<UserResponseDto> {
      const deleted: IUser = await this.prisma.users.delete({ 
         where: {
            id: id 
         } 
      });
      if (!deleted) return null;
      return deleted;
   }
}
