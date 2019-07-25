import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmpregadoController } from "./empregado.controller";
import { EmpregadoRepository } from "./empregado.repository";
import { EmpregadoResolver } from "./empregado.resolver";
import { EmpregadoService } from "./empregado.service";


@Module({
  controllers: [EmpregadoController],
  exports: [EmpregadoService],
  imports: [TypeOrmModule.forFeature([EmpregadoRepository])],
  providers: [EmpregadoResolver, EmpregadoService]
})
export class EmpregadoModule {}
