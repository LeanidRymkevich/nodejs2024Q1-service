import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { getSwaggerConfig } from './swagger/swagger.config';

import { APP_PORT } from './constants';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, await getSwaggerConfig());
  SwaggerModule.setup('api', app, document);

  await app.listen(APP_PORT);
}

bootstrap();
