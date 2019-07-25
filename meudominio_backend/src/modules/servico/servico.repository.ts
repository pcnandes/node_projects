import { AbstractRepository, EntityRepository } from 'typeorm'
import { queryPersonalizada } from '../../common/query';
import { Page, Pagination } from '../../common/types';
import { Servico } from './servico.entity';

@EntityRepository(Servico)
export class ServicoRepository extends AbstractRepository<Servico> {

  /**
   * Realiza uma busca personalizada aos servicos
   * @param {string} fields Campos a serem obtidos
   * @param {string} condition Condição WHERE a ser aplicada
   * @param {Pagination} pagination Paginação
   */
  public async buscaPersonalizada (fields, condition, pagination: Pagination = new Pagination()): Promise<Page<Servico>> {
    return queryPersonalizada(this.repository, fields, condition, pagination)
  }

}