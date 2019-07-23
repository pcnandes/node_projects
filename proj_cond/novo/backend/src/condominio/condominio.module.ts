import { Module } from '@nestjs/common';
import { CondominioController } from './condominio.controller';
import { CondominioService } from './condominio.service';

@Module({
  controllers: [ CondominioController ],
  providers: [ CondominioService ],
  exports: [ CondominioService ]
})
export class CondominioModule {}