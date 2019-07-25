import { CondominioSituacao } from './condominio.enum';
import { CondominioService } from './condominio.service';
import { Condominio } from './condominio.entity';
import { Controller, Get, Param, Post, Body, Query, Delete, Put } from '@nestjs/common';
import { Request } from 'express';

@Controller('condominio')
export class CondominioController {
  constructor(private readonly condominioService: CondominioService) {}

  @Get()
  async listar(): Promise<Condominio[]> {
    return this.condominioService.findAll();
  }

  @Post()
  novo(@Body() condominio: Condominio) {
    condominio.situacao = CondominioSituacao.RASCUNHO
    console.log('aquiii', condominio)
    return this.condominioService.create(condominio)
  }
  
  @Get(':id')
  carregar(@Param('id') id: string) {
    return `This action returns a #${id} condominio`;
  }

  @Put(':id')
  salvar(@Param('id') id: string, @Body() condominio: Condominio) {
    return `This action updates a #${id} condominio`;
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return `This action removes a #${id} condominio`;
  }

}