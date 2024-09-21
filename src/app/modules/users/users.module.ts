import { Module } from '@nestjs/common';
import { UsersController } from 'src/app/controllers/users/users.controller';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PrismaService } from 'src/app/services/prisma/prisma.service';
import { UsersService } from 'src/app/services/users/users.service';

@Module({
   providers: [PrismaService, UsersService, AuthService],
   controllers: [UsersController]
})
export class UsersModule {}
