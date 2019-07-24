import { DatabaseModule } from './../../config/database.module';
import { Module } from '@nestjs/common';
import { CondominioController } from './condominio.controller';
import { CondominioService } from './condominio.service';
import { condominioProviders } from './condominio.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ CondominioController ],
  providers: [ ...condominioProviders, CondominioService ],
  exports: [ CondominioService ]
})
export class CondominioModule {}