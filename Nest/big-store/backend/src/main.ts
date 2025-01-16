// Core
import { NestFactory } from '@nestjs/core';
// Modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4200);
}
bootstrap();
