import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthController } from 'src/app/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/app/services/prisma/prisma.service';

@Module({
   imports: [
   UsersModule,
   JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      // signOptions: { expiresIn: '1d' },
   }),
   ],
   providers: [AuthService, PrismaService],
   controllers: [AuthController],
   exports: [AuthService],
})
export class AuthModule {}
