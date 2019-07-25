import { Logger } from '@nestjs/common';
import { AbstractRepository, EntityRepository } from 'typeorm'
import { queryPersonalizada } from '../../common/query';
import { Page, Pagination } from '../../common/types';
import { Usuario } from './usuario.entity';

@EntityRepository(Usuario)
export class UsuarioRepository extends AbstractRepository<Usuario> {

  /**
   * Realiza uma busca personalizada aos servicos
   * @param {string} fields Campos a serem obtidos
   * @param {string} condition Condição WHERE a ser aplicada
   * @param {Pagination} pagination Paginação
   */
  public async buscaPersonalizada (fields, condition, pagination: Pagination = new Pagination()): Promise<Page<Usuario>> {
    return queryPersonalizada(this.repository, fields, condition, pagination)
  }

  public async alterar (cpf: number, usuario: Usuario): Promise<void> {
    const result = await this.repository.update(cpf, usuario)
    Logger.log(result)
  }

  public async excluir (cpf: number): Promise<void> {
    const result = await this.repository.delete(cpf)
    Logger.log(result)
  }

  public async inserir (usuario: Usuario): Promise<string> {
    const result = await this.repository.insert(usuario)
    Logger.log(result)
    return result.identifiers[0].id
  }

}