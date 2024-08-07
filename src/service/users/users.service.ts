import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import UserRegisterDTO from 'src/DTOs/users/UserRegisterDTO';

@Injectable()
export class UsersService {
   constructor(private readonly prisma: PrismaService) {}

   async get() {
      return await this.prisma.users.findMany();
   }

   async register(data: UserRegisterDTO) {
      data.password = await bcrypt.hash(data.password, 10);
      return await this.prisma.users.create({ data });
   }
}

