import { Inject, Injectable, Logger, NotFoundException, Scope, Request } from '@nestjs/common'
import { Page, Pagination } from '../../common/types'
import { Servico } from './servico.entity'
import { ServicoRepository } from './servico.repository'

@Injectable({scope: Scope.REQUEST})
export class ServicoService {
  constructor(
    @Inject('ServicoRepository')
    private readonly repository: ServicoRepository
  ) {}
  
  /**
   * Busca um serviço pelo código
   * @param {number} codigo Código do servico
   * @param {string} fields Campos a serem retornados. Padrão = 'codigo|multicliente|ug|cliente|mnemonico|titulo|dataDesativacao'
   */
  public async buscarPorCodigo(codigo: number, fields: string = 'codigo|multicliente|ug|cliente|mnemonico|titulo|dataDesativacao'): Promise<Servico> {
    // busca o empregado na base de dados
    const { result: [servico] } = await this.buscaPersonalizada(
      fields,
      `codigo$eq${codigo}`
    )
    if (!servico) {
      throw new NotFoundException('Codigo não encontrado')
    }
    return servico
  }

  /**
   * Realiza uma busca personalizada aos servicos
   * @param {string} fields Campos a serem retornados
   * @param {string} [condition] Condição de consulta
   * @param {Pagination} [pagination] Paginação
   */
  public async buscaPersonalizada(fields, condition = null, pagination: Pagination = new Pagination()): Promise<Page<Servico>> {
    return this.repository.buscaPersonalizada(fields, condition, pagination)
  }

  // TODO criar uma busca sem paginação
}