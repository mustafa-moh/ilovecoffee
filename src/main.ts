import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // like validated in laravel
      //forbidNonWhitelisted: true, // crash when submit extra attributes not in the DTO class
      transform: true, // to cast the passed data as well not validating it only
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
