import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '@common/interceptor/response.interceptor';
import { AllExceptionFilter } from '@common/exception/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useLogger(['log', 'error', 'warn', 'debug', 'verbose'])
  app.useGlobalFilters(new AllExceptionFilter())
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
