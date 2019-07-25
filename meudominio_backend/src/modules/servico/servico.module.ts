import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicoController } from './servico.controller';
import { ServicoService } from './servico.service';
import { ServicoRepository } from './servico.repository';

@Module({
  controllers: [ ServicoController ],
  exports: [ ServicoService ],
  imports: [ TypeOrmModule.forFeature([ ServicoRepository ])],
  providers: [ ServicoService ],
})
export class ServicoModule {}