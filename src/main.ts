import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '../../Frontend/dist'));
  app.useStaticAssets(join(__dirname, '../../Frontend/dist'))
  app.engine('html', require('ejs').renderFile);
  app.setViewEngine('html');
   app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
   });
  await app.listen(3001);
}
bootstrap();
