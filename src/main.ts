import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './interceptors/tranform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  await app.listen(3002);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
