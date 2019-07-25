import { Body, Controller, Get, Param, Post, Put, Query, Delete } from '@nestjs/common'
import { ApiImplicitParam, ApiImplicitQuery, ApiOperation, ApiResponse, ApiUseTags, ApiExcludeEndpoint, ApiBearerAuth, ApiImplicitHeader } from "@nestjs/swagger"
import { Page } from '../../common/types';
import { Dominio } from './dominio.entity'
import { DominioService } from './dominio.service';

@ApiUseTags('Domínio')
@ApiBearerAuth()
@Controller('dominio')
export class DominioController {
  constructor(private service: DominioService) {}

  @Get(':id')
  @ApiOperation({ title: "Buscar domínio pelo ID" })
  @ApiImplicitHeader({name: 'Authorization', description: 'Preencher com Bearer <token>', required: true})
  @ApiResponse({ status: 200, type: Dominio })
  @ApiImplicitParam({ name: "id", required: true, description: 'ID do domínio' })
  @ApiImplicitQuery({ name: 'fields', description: 'Atributos (Padrão = id|codigo|nivel|nome|descricao|ugDominio|ugNegocio|situacao|pai/(id|nome)|gestorDominio/(cpf|nome|lotacao|ramal|email|foto)|sistemas/(id|identificador|nome))', required: false })
  public async buscarPorId (
    @Param('id') id: string,
    @Query("fields") fields: string = 'id|codigo|nivel|nome|descricao|ugDominio|ugNegocio|situacao|pai/(id|nome)|gestorDominio/(cpf|nome|lotacao|ramal|email|foto)|sistemas/(id|identificador|nome)'
  ): Promise<Dominio> {
    return this.service.buscarPorId(id, fields)
  }

  @Get()
  @ApiOperation({ title: "Listar domínios" })
  @ApiImplicitHeader({name: 'Authorization', description: 'Preencher com Bearer <token>', required: true})
  @ApiResponse({ status: 200, type: Dominio, isArray: true })
  @ApiImplicitQuery({ name: 'fields', description: 'Atributos (Padrão = id|nome|nivel|pai/id)', required: false })
  @ApiImplicitQuery({ name: 'condition', description: 'Critério. Ex: urlencode("nome$lkgoverno")', required: false})
  @ApiImplicitQuery({ name: 'page', description: 'Página (Padrão = 1)', required: false })
  @ApiImplicitQuery({ name: 'size', description: 'Tamanho da página (Padrão = 10)', required: false })
  @ApiImplicitQuery({ name: 'sort', description: 'Campo a ser ordenado (Padrao = nome)', required: false })
  public async buscaPersonalizada (
    @Query("fields") fields: string = 'id|nome|nivel|pai/id',
    @Query("condition") condition: string = null,
    @Query("page") page: number = 1,
    @Query("size") size: number = 10,
    @Query("sort") sort: string = 'nome'
  ): Promise<Page<Dominio>> {
    const pagination = {
      page: parseInt('' + page, 10),
      size: parseInt('' + size, 10),
      sort
    }
    return this.service.buscaPersonalizada(fields, condition, pagination)
  }

  @Post()
  @ApiExcludeEndpoint()
  public async inserir (@Body() dominio: Dominio): Promise<string> {
    return this.service.inserir(dominio)
  }

  @Put(':id')
  @ApiExcludeEndpoint()
  public async alterar (@Param('id') id: string, @Body() dominio: Dominio): Promise<void> {
    return this.service.alterar(id, dominio)
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  public async excluir (@Param('id') id: string): Promise<void> {
    return this.service.excluir(id)
  }
}