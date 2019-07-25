import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiExcludeEndpoint, ApiImplicitParam, ApiImplicitQuery, ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth, ApiImplicitHeader } from "@nestjs/swagger"
import { Page } from '../../common/types';
import { Sistema } from './sistema.entity'
import { SistemaService } from './sistema.service';

@ApiUseTags('Sistema')
@ApiBearerAuth()
@Controller('sistema')
export class SistemaController {
  constructor(private service: SistemaService) {}

  @Get(':id')
  @ApiOperation({ title: "Buscar sistema pelo ID" })
  @ApiImplicitHeader({name: 'Authorization', description: 'Preencher com Bearer <token>', required: true})
  @ApiResponse({ status: 200, type: Sistema })
  @ApiImplicitParam({ name: "id", required: true, description: 'ID do sistema' })
  @ApiImplicitQuery({ name: 'fields', description: 'Atributos (Padrão = id|identificador|nome|descricao|linhaNegocio|producao|codigoServicoPrincipal|codigoServicoOutros|gruposGovi)', required: false })
  public async buscarPorId (
    @Param('id') id: string,
    @Query("fields") fields: string = 'id|identificador|nome|descricao|situacao|linhaNegocio|producao|codigoServicoPrincipal|codigoServicoOutros|gruposGovi'
  ): Promise<Sistema> {
    return this.service.buscarPorId(id, fields)
  }

  @Get()
  @ApiOperation({ title: "Listar sistemas" })
  @ApiImplicitHeader({name: 'Authorization', description: 'Preencher com Bearer <token>', required: true})
  @ApiResponse({ status: 200, type: Sistema, isArray: true })
  @ApiImplicitQuery({ name: 'fields', description: 'Atributos (Padrão = id|nome)', required: false })
  @ApiImplicitQuery({ name: 'condition', description: 'Critério. Ex: urlencode("codigoServicoPrincipal$eq92116")', required: false })
  @ApiImplicitQuery({ name: 'page', description: 'Página (Padrão = 1)', required: false })
  @ApiImplicitQuery({ name: 'size', description: 'Tamanho da página (Padrão = 10)', required: false })
  @ApiImplicitQuery({ name: 'sort', description: 'Campo a ser ordenado (Padrão = nome)', required: false })
  public async buscaPersonalizada (
    @Query("fields") fields: string = 'id|nome',
    @Query("condition") condition: string = null,
    @Query("page") page: number = 1,
    @Query("size") size: number = 10,
    @Query("sort") sort: string = 'nome'
  ): Promise<Page<Sistema>> {
    const pagination = {
      page: parseInt('' + page, 10),
      size: parseInt('' + size, 10),
      sort
    }
    return this.service.buscaPersonalizada(fields, condition, pagination)
  }

  @Post()
  @ApiExcludeEndpoint()
  public async inserir (@Body() sistema: Sistema): Promise<string> {
    return this.service.inserir(sistema)
  }

  @Put(':id')
  @ApiExcludeEndpoint()
  public async alterar (@Param('id') id: string, @Body() sistema: Sistema): Promise<void> {
    return this.service.alterar(id, sistema)
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  public async excluir (@Param('id') id: string): Promise<void> {
    return this.service.excluir(id)
  }

  @Put('inativar/:id')
  @ApiExcludeEndpoint()
  public async inativar (@Param('id') id: string): Promise<void> {
    this.service.inativar(id)
  }

  @Put('reativar/:id')
  @ApiExcludeEndpoint()
  public async reativar (@Param('id') id: string): Promise<void> {
    this.service.reativar(id)
  }
}