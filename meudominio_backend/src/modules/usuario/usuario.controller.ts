import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common"
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { Page } from '../../common/types';
import { Usuario } from "./usuario.entity"
import { UsuarioService } from './usuario.service';

@Controller("usuario")
export class UsuarioController {
  constructor(private readonly service: UsuarioService) {}

  @Get()
  @ApiExcludeEndpoint()
  public async listarUsuarios (
    @Query("page") page: number = 1,
    @Query("size") size: number = 10,
  ): Promise<Page<Usuario>> {
    const pagination = {
      page: parseInt('' + page, 10),
      size: parseInt('' + size, 10)
    }
    return this.service.listarUsuariosComPerfis('cpf|perfis|empregado/(cpf|nome)', null, pagination)
  }

  @Get(":cpf")
  @ApiExcludeEndpoint()
  public async buscarPorCPF(
    @Param("cpf") cpf: number
  ): Promise<Usuario> {
    return this.service.buscarPorCPF(cpf)
  }

  @Put(':cpf')
  @ApiExcludeEndpoint()
  public async alterar (@Param('cpf') cpf: number, @Body() usuario: Usuario): Promise<void> {
    // usuario.cpf esta vindo string, preciso ver onde ajustar isso
    usuario.cpf = cpf
    return this.service.alterar(cpf, usuario)
  }
}
