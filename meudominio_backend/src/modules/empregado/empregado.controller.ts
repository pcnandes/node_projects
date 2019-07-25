import { Controller, Get, Param, Query } from "@nestjs/common"
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { Page } from '../../common/types'
import { Empregado } from "./empregado.entity"
import { EmpregadoService } from "./empregado.service"

@Controller("empregado")
export class EmpregadoController {
  constructor(private readonly service: EmpregadoService) {}
  
  @Get(":cpf")
  @ApiExcludeEndpoint()
  public async buscarPorCPF(
    @Param("cpf") cpf: number,
    @Query("fields") fields: string = 'matricula|nome|lotacao|funcao|cargo|ramal|foto|email',
  ): Promise<Empregado> {
    return this.service.buscarPorCPF(cpf, fields)
  }

  @Get()
  @ApiExcludeEndpoint()
  public async buscaPersonalizada(
    @Query("fields") fields: string = 'cpf|nome',
    @Query("condition") condition: string = null,
    @Query("page") page: number = 1,
    @Query("size") size: number = 10,
    @Query("sort") sort: string = 'nome'
  ): Promise<Page<Empregado>> {
    const pagination = {
      page: parseInt('' + page, 10),
      size: parseInt('' + size, 10),
      sort
    }
    return this.service.buscaPersonalizada(fields, condition, pagination)
  }
}
