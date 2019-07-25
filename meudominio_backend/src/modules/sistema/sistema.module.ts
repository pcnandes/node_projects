import { Module } from '@nestjs/common';
import { SistemaController } from './sistema.controller';
import { SistemaService } from './sistema.service';
import { SistemaRepository } from './sistema.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DominioModule } from '../dominio/dominio.module';

@Module({
  controllers: [ SistemaController ],
  exports: [ SistemaService ],
  imports: [TypeOrmModule.forFeature([SistemaRepository]), AuthModule, DominioModule],
  providers: [ SistemaService ],
})
export class SistemaModule {}