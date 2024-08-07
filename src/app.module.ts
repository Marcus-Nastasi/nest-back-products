import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './service/prisma/prisma.service';
import { UsersService } from './service/users/users.service';
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, UsersService],
})
export class AppModule {}
