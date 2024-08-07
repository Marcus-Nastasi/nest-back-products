import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/users/users.controller';
import { AuthService } from 'src/service/auth/auth.service';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { UsersService } from 'src/service/users/users.service';

@Module({
   providers: [PrismaService, UsersService, AuthService],
   controllers: [UsersController]
})
export class UsersModule {}
