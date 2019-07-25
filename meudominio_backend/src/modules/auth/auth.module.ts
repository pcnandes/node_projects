import { Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpregadoRepository } from '../empregado/empregado.repository';
import { DominioRepository } from '../dominio/dominio.repository';

@Module({
  controllers: [ AuthController ],
  exports: [ AuthService ],
  imports: [ TypeOrmModule.forFeature([ UsuarioRepository, EmpregadoRepository, DominioRepository ]) ],
  providers: [ AuthService ]
})
export class AuthModule {}
