import { Module } from '@nestjs/common';
import { HomeController } from 'src/controllers/home/home.controller';

@Module({
   controllers: [HomeController]
})
export class HomeModule {}
