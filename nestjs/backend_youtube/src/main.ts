import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept'] });
  await app.listen(3000);
}
bootstrap();
