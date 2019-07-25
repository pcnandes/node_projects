import { Logger } from '@nestjs/common';
import { AbstractRepository, EntityRepository } from 'typeorm'
import { queryPersonalizada } from '../../common/query';
import { Page, Pagination } from '../../common/types';
import { Dominio } from './dominio.entity';

@EntityRepository(Dominio)
export class DominioRepository extends AbstractRepository<Dominio> {
  /**
   * Busca o dominínio pelo ID
   * @param {string} id 
   * @param {string} fields
   */
  public async buscarPorId (id: string, fields: string = 'id|codigo|nome|descricao|ugDominio|ugNegocio|nivel|gestorDominio/(cpf|matricula|nome|lotacao|ramal|email|foto)'): Promise<Dominio> {
    const { result: [ dominio ] } = await this.buscaPersonalizada(fields, `id$eq${id}`)
    return dominio
  }

  /**
   * Busca o dominínio pelo código
   * @param {string} codigo 
   * @param {string} fields
   */
  public async buscarPorCodigo (codigo: string, fields: string = 'id|codigo|nome|descricao|ugDominio|ugNegocio|nivel|gestorDominio/(cpf|matricula|nome|lotacao|ramal|email|foto)'): Promise<Dominio> {
    const { result: [ dominio ] } = await this.buscaPersonalizada(fields, `codigo$eq${codigo}`)
    return dominio
  }

  /**
   * Realiza uma busca personalizada aos empregados
   * @param {string} fields Campos a serem obtidos
   * @param {string} condition Condição WHERE a ser aplicada
   * @param {Pagination} pagination Paginação
   */
  public async buscaPersonalizada (fields, condition, pagination: Pagination = new Pagination()): Promise<Page<Dominio>> {
    return queryPersonalizada(this.repository, fields, condition, pagination)
  }

  /**
   * Insere um domínio
   * @param {Dominio} dominio 
   */
  public async inserir (dominio: Dominio): Promise<string> {
    const result = await this.repository.insert(dominio)
    Logger.log(result)
    return result.identifiers[0].id
  }

  /**
   * Insere um domínio
   * @param {string} id
   * @param {Dominio} dominio 
   */
  public async alterar (id: string, dominio: Dominio): Promise<void> {
    const result = await this.repository.update(id, dominio)
    Logger.log(result)
  }

  /**
   * Exclui um domínio
   * @param {string} id
   */
  public async excluir (id: string): Promise<void> {
    const result = await this.repository.delete(id)
    Logger.log(result)
  }
}