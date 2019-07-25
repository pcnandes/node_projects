import { Condominio } from './condominio.entity';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CondominioService {
  constructor(
  @Inject('CONDOMINIO_REPOSITORY')
    private readonly condominioRepository: Repository<Condominio>,
  ) {}

  create(condominio: Condominio) {
    console.log('aquiii persist', condominio)
    this.condominioRepository.create(condominio)
  }

  async findAll(): Promise<Condominio[]> {
    return await this.condominioRepository.find();
  }
  
}