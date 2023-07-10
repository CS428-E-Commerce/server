import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import compression from '@fastify/compress';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));

    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.register(compression, { encodings: ['gzip', 'deflate'] });

    const config = new DocumentBuilder()
        .setTitle('Vlingist API')
        .setDescription('Vlingist API description')
        .setVersion('1.0')
        .addTag('Vlingist')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(6000, '0.0.0.0');
}
bootstrap();
