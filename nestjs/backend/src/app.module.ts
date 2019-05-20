import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { logger } from './middleware/logger.function.middleware';
import { HttpExceptionFilter } from './http-exception.filter'
import { ValidationPipe } from './pipes/validation.pipe'

@Module({
  // lista de modulos importados
  imports: [CatsModule],
  // conjunto de controladores
  controllers: [AppController],
  // providers q serao injetados pelo modulo
  providers: [
    AppService,
    // incluindo fultro de execeção. qqr modulo que receber isso, tornará o filtro global
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ],
  // modulos que poderao ser compartilhados (importados) por outros modulos
  exports: []
})

// disponibiliza para usar na aplicacao
// para incluir os middleewares é preciso usar o configure 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, logger)
      // podem ser excluidas algumas rotass
      .exclude(
        // { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST }
      )
      .forRoutes('cats');
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
    consumer
      .apply(logger)
      // podem ser excluidas algumas rotass
      .forRoutes('teste');
  }
}

