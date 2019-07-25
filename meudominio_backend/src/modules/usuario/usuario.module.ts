import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DominioModule } from '../dominio/dominio.module';
import { DominioRepository } from '../dominio/dominio.repository';
import { EmpregadoModule } from '../empregado/empregado.module';
import { EmpregadoRepository } from '../empregado/empregado.repository';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioService } from './usuario.service';


@Module({
  controllers: [ UsuarioController ],
  exports: [ UsuarioService ],
  imports: [ TypeOrmModule.forFeature([ UsuarioRepository, EmpregadoRepository, DominioRepository ]), EmpregadoModule, DominioModule, AuthModule ],
  providers: [ UsuarioService ]
})
export class UsuarioModule {}
