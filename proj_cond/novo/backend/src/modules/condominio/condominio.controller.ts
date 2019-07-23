import { CondominioService } from './condominio.service';
import { Condominio } from './condominio.entity';
import { Controller, Get, Param, Post, Body, Query, Delete, Put } from '@nestjs/common';
import { Request } from 'express';

@Controller('condominio')
export class CondominioController {
  constructor(private readonly condominioService: CondominioService) {}

  @Post()
  create(@Body() condominio: Condominio) {
    return this.condominioService.create(condominio)
  }

  @Get()
  async findAll(): Promise<Condominio[]> {
    return this.condominioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} condominio`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() condominio: Condominio) {
    return `This action updates a #${id} condominio`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} condominio`;
  }

}