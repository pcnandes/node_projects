import { Condominio } from './condominio.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CondominioService {
  private readonly condominios: Condominio[] = [];

  create(condominio: Condominio) {
    this.condominios.push(condominio);
  }

  findAll(): Condominio[] {
    return this.condominios;
  }
}