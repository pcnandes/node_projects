import { Logger } from '@nestjs/common';
import { AbstractRepository, EntityRepository } from 'typeorm'
import { queryPersonalizada } from '../../common/query';
import { Page, Pagination } from '../../common/types'
import { Empregado } from './empregado.entity'

/**
 * Repositório de empregados
 */
@EntityRepository(Empregado)
export class EmpregadoRepository extends AbstractRepository<Empregado> {
  /**
   * Busca o empregado pelo CPF
   * @param {number} cpf CPF do empregado
   */
  public async buscarPorCPF (cpf: number): Promise<Empregado> {
    return this.repository.findOneOrFail(cpf)
  }

  /**
   * Realiza uma busca personalizada aos empregados
   * @param {string} fields Campos a serem obtidos
   * @param {string} condition Condição WHERE a ser aplicada
   * @param {Pagination} pagination Paginação
   */
  public async buscaPersonalizada (fields, condition, pagination: Pagination): Promise<Page<Empregado>> {
    return queryPersonalizada(this.repository, fields, condition, pagination)
  }
}