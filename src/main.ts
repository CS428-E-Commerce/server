import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import compression from '@fastify/compress';

import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.register(compression,{ encodings: ['gzip', 'deflate'] });

  await app.listen(6000, '0.0.0.0');
}
bootstrap();
