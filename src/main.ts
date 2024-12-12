import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          message: 'Request payload validation error',
          errors: errors.map((err) => ({
            field: err.property,
            failed_constraints: err.constraints,
          })),
        });
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
