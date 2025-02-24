import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { initializeMiddlewares } from './config/middleware.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  initializeMiddlewares(app);
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
