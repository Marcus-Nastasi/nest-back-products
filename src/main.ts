import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '../../Frontend/dist'));
  app.useStaticAssets(join(__dirname, '../../Frontend/dist'))
  app.engine('html', require('ejs').renderFile);
  app.setViewEngine('html');
   app.enableCors({
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
   });
   // swagger configuration
   const config = new DocumentBuilder()
    .setTitle('Product Manager')
    .setDescription('The product manager api project in NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api', app, document);
  await app.listen(3001);
}
bootstrap();
