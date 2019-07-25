import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DominioController } from './dominio.controller'
import { DominioRepository } from './dominio.repository'
import { DominioService } from './dominio.service'
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [DominioController],
  exports: [DominioService],
  imports: [TypeOrmModule.forFeature([DominioRepository]), AuthModule],
  providers: [DominioService],
})
export class DominioModule {}