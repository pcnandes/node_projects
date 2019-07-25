import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractRepository, EntityRepository } from 'typeorm'
import { queryPersonalizada } from '../../common/query';
import { Page, Pagination } from '../../common/types';
import { Sistema } from './sistema.entity';

@EntityRepository(Sistema)
export class SistemaRepository extends AbstractRepository<Sistema> {
  public async listar (): Promise<Sistema[]> {
    return this.repository.find()
  }

  /**
   * Busca o sistema pelo ID
   * @param {string} id 
   * @param {string} fields
   */
  public async buscarPorId (id: string, fields: string = 'id|identificador|nome|descricao|linhaNegocio|producao|codigoServicoPrincipal|codigoServicoOutros|gruposGovi'): Promise<Sistema> {
    const { result: [ sistema ] } = await this.buscaPersonalizada(fields, `id$eq${id}`)
    return sistema
  }

  /**
   * Busca o dominínio pelo código
   * @param {string} codigo 
   * @param {string} fields
   */
  public async buscarPorIdentificador (codigo: string, fields: string = 'id|identificador|nome|descricao|linhaNegocio|producao|codigoServicoPrincipal|codigoServicoOutros|gruposGovi'): Promise<Sistema> {
    const { result: [ sistema ] } = await this.buscaPersonalizada(fields, `identificador$eq${codigo}`)
    return sistema
  }

  /**
   * Realiza uma busca personalizada aos empregados
   * @param {string} fields Campos a serem obtidos
   * @param {string} condition Condição WHERE a ser aplicada
   * @param {Pagination} pagination Paginação
   */
  public async buscaPersonalizada (fields, condition, pagination: Pagination = new Pagination()): Promise<Page<Sistema>> {
    return queryPersonalizada(this.repository, fields, condition, pagination)
  }

  // @Transactional()
  public async inserir (sistema: Sistema): Promise<string> {
    const result = await this.repository.insert(sistema)
    return result.identifiers[0].id
  }

  // @Transactional()
  public async alterar (id: string, sistema: Sistema): Promise<void> {
    const result = await this.repository.update(id, sistema)
    Logger.log(result)
  }

  // @Transactional()
  public async excluir (id: string): Promise<void> {
    const result = await this.repository.delete(id)
    Logger.log(result)
  }
}