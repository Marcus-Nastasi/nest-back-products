import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthController } from 'src/app/controllers/auth/auth.controller';

@Module({
   imports: [
   UsersModule,
   JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
   }),
   ],
   providers: [AuthService],
   controllers: [AuthController],
   exports: [AuthService],
})
export class AuthModule {}
