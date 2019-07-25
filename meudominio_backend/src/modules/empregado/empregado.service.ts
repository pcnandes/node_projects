import { Inject, Injectable, Logger, NotFoundException, Scope, Request } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Page, Pagination } from '../../common/types'
import { Empregado } from './empregado.entity'
import { EmpregadoRepository } from './empregado.repository'
import { AuthService } from '../auth/auth.service';

@Injectable({scope: Scope.REQUEST})
export class EmpregadoService {
  constructor(
    @Inject('EmpregadoRepository')
    private readonly repository: EmpregadoRepository
  ) {}
  
  /**
   * Busca um empregado pelo CPF
   * @param {number} cpf CPF do empregado
   * @param {string} fields Campos a serem retornados. Padrão = 'cpf|matricula|nome|lotacao|funcao|cargo|ramal|foto|email'
   */
  public async buscarPorCPF(cpf: number, fields: string = 'cpf|matricula|nome|lotacao|funcao|cargo|ramal|foto|email'): Promise<Empregado> {
    // busca o empregado na base de dados
    const { result: [empregado] } = await this.buscaPersonalizada(
      fields,
      `cpf$eq${cpf}`
    )
    if (!empregado) {
      throw new NotFoundException('CPF não encontrado')
    }
    return empregado
  }

  /**
   * Realiza uma busca personalizada aos empregados
   * @param {string} fields Campos a serem retornados
   * @param {string} [condition] Condição de consulta
   * @param {Pagination} [pagination] Paginação
   */
  public async buscaPersonalizada(fields, condition = null, pagination: Pagination = new Pagination()): Promise<Page<Empregado>> {
    return this.repository.buscaPersonalizada(fields, condition, pagination)
  }
}