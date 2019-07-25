import { Controller, Get, Param, Query } from "@nestjs/common"
import { ApiExcludeEndpoint } from "@nestjs/swagger";
import { Page } from '../../common/types'
import { Servico } from "./servico.entity"
import { ServicoService } from "./servico.service"

@Controller("servico")
export class ServicoController {
  constructor(private readonly service: ServicoService) {}
  
  @Get(":codigo")
  @ApiExcludeEndpoint()
  public async buscarPorCodigo(
    @Param("codigo") codigo: number,
    @Query("fields") fields: string = 'codigo|multicliente|ug|cliente|mnemonico|titulo|dataDesativacao',
  ): Promise<Servico> {
    return this.service.buscarPorCodigo(codigo, fields)
  }

  @Get()
  @ApiExcludeEndpoint()
  public async buscaPersonalizada(
    @Query("fields") fields: string = 'codigo|mnemonico',
    @Query("condition") condition: string = null,
    @Query("page") page: number = 1,
    @Query("size") size: number = 10,
    @Query("sort") sort: string = 'mnemonico'
  ): Promise<Page<Servico>> {
    const pagination = {
      page: parseInt('' + page, 10),
      size: parseInt('' + size, 10),
      sort
    }
    return this.service.buscaPersonalizada(fields, condition, pagination)
  }
}
