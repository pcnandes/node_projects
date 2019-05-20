import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.function.middleware';
import { HttpExceptionFilter } from './http-exception.filter'
import { ValidationPipe } from './pipes/validation.pipe'

async function bootstrap() {
  // NestFactory criar uma instância do aplicativo Nest
  const app = await NestFactory.create(AppModule);

  // validacoes globais podem ser incluidas aqui, mas aqui nao tem controle de dependencia, 
  // para isso, incluir nos modules
  // app.useGlobalPipes(new ValidationPipe());
  
    // pode ser usado aqui, mas recomenda-se no module
  // app.useGlobalFilters(new HttpExceptionFilter());

  // coloca um midlleware global
  // app.use(logger);

  // uso específico para o express
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
}
bootstrap();
