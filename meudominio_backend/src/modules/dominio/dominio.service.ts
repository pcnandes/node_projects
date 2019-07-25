import { BadRequestException, Inject, Injectable, NotFoundException, Scope, UnauthorizedException, UnprocessableEntityException, ForbiddenException } from '@nestjs/common'
import { Page, Pagination } from '../../common/types'
import { AuthService } from '../auth/auth.service';
import { Usuario } from '../usuario/usuario.entity';
import { Dominio } from './dominio.entity'
import { DominioRepository } from './dominio.repository'

@Injectable({ scope: Scope.REQUEST })
export class DominioService {
  constructor(
    @Inject('DominioRepository')
    private readonly repository: DominioRepository,
    @Inject('AuthService')
    private readonly auth: AuthService
  ) {}

  /**
   * Realiza uma busca personalizada aos empregados
   * @param {string} fields Campos a serem obtidos
   * @param {string} condition Condição WHERE a ser aplicada
   * @param {Pagination} pagination Paginação
   */
  public async buscaPersonalizada (fields, condition, pagination: Pagination = new Pagination()): Promise<Page<Dominio>> {
    return this.repository.buscaPersonalizada(fields, condition, pagination)
  }

  public async buscarPorId (id: string, fields: string = '*|pai/id|gestorDominio/(cpf|nome|email|ramal|foto|lotacao)'): Promise<Dominio> {
    const { result: [ dominio ] } = await this.repository.buscaPersonalizada(fields, `id$eq${id}`)
    if (!dominio) {
      throw new NotFoundException('Domínio não encontrado')
    }
    return dominio
  }

  public async inserir (dominio: Dominio): Promise<string> {
    const usuario = await this.auth.getUsuarioLogado()
    // TODO: somente o usuários DIDES/DIRCL com perfil diretor ou superintendente podem criar
    dominio.criadoPor = usuario.cpf
    dominio.alteradoPor = usuario.cpf
    dominio.id = undefined
    dominio.situacao = 'ATIVO'
    let pai = null
    if (dominio.pai && dominio.pai.id) {
      pai = await this.buscarPorId(dominio.pai.id, 'id|nivel|codigo|sistemas/id|gestorDominio/cpf|gestorNegocio/cpf|editorDominio')
      // incluo o código do pai ao dominio
      dominio.codigo = `${pai.codigo}-${dominio.codigo}`
    }
    dominio = await this.validar(dominio, null, pai, usuario)
    return this.repository.inserir(dominio)
  }

  public async alterar (id: string, dominio: Dominio): Promise<void> {
    const usuario = await this.auth.getUsuarioLogado()
    // TODO: somente o usuário diretor DIDES/DIRCL ou gestor do domínio em questão pode alterar
    const antigo = await this.buscarPorId(id, 'id|codigo|situacao|gestorDominio/cpf|gestorNegocio/cpf|editorDominio|pai/id|criadoPor|dataCriacao')
    if (!antigo) {
      throw new NotFoundException('Domínio não encontrado')
    }
    // não permite alterar os atributos id, código, situação e pai
    dominio.id = id
    dominio.codigo = antigo.codigo || dominio.codigo
    dominio.situacao = antigo.situacao
    dominio.pai = antigo.pai
    dominio.alteradoPor = usuario.cpf
    dominio.criadoPor = antigo.criadoPor
    dominio.dataCriacao = antigo.dataCriacao
    let pai = null
    if (dominio.pai && dominio.pai.id) {
      pai = await this.buscarPorId(dominio.pai.id, 'id|nivel|codigo|sistemas/id|gestorDominio/cpf|gestorNegocio/cpf|editorDominio')
    }
    dominio = await this.validar(dominio, antigo, pai, usuario)
    await this.repository.alterar(id, dominio)
    return
  }

  public async inativar (id: string): Promise<void> {
    return this.alterarSituacao(id, 'INATIVO')
  }

  public async reativar (id: string): Promise<void> {
    return this.alterarSituacao(id, 'ATIVO')
  }

  public async podeAlteraDominio(dominio: Dominio, usuario: Usuario) {
    if(!usuario) {
      return false
    }
    // é administrador ou cadastrador de domínio
    if (usuario.perfis && (usuario.perfis.includes('ADMIN') || usuario.perfis.includes('CADASTRO_DOMINIO'))) {
      return true
    }
    // é gestor do domínio ou gestor de negócio do domínio
    return dominio && (+(dominio.gestorDominio || {}).cpf === +usuario.cpf
      || +(dominio.gestorNegocio || {}).cpf === +usuario.cpf
      || (dominio.editorDominio || []).some(e => +e === +usuario.cpf))
  }

  // Funcionalidade temporária. No futuro será implementada exclusao lógica
  public async excluir (id: string): Promise<void> {
    const usuario = await this.auth.getUsuarioLogado()
    const dominio = await this.buscarPorId(id, 'id|codigo|situacao|gestorDominio/cpf|gestorNegocio/cpf|editorDominio|pai/id')
    let pai = null
    if (dominio.pai && dominio.pai.id) {
      pai = await this.buscarPorId(dominio.pai.id, 'id|nivel|codigo|gestorDominio/cpf|gestorNegocio/cpf|editorDominio|pai/id')
    } else {
      throw new BadRequestException('Apenas subdomínios podem ser excluídos')
    }
    if (!await this.podeAlteraDominio(pai, usuario)) {
      throw new ForbiddenException('Usuário não tem permissão para excluir o dominio')
    } else {
      await this.repository.excluir(id)
    }
  }

  private async validar (dominio: Dominio, antigo: Dominio, pai: Dominio, usuario: Usuario): Promise<Dominio> {
    if (dominio.pai && dominio.pai.id) {
      if (!await this.podeAlteraDominio(pai, usuario)) {
        throw new ForbiddenException('Usuário não tem permissão para alterar o dominio')
      }
      // TODO: tratamento quando o pai estiver inativo
      if (!pai.codigo) {
        throw new UnprocessableEntityException('Domínio pai não possui código cadastrado')
      }
      // verifica se o código do subdomínio inclui o código do pai
      if (!dominio.codigo.match(new RegExp(`^${pai.codigo}-[a-z,0-9]{3}$`,'i'))) {
        throw new UnprocessableEntityException('Código do domínio inválido')
      }
      // TODO: tratamento para quando houver sistemas inativos
      if (pai.sistemas && pai.sistemas.length > 0) {
        throw new UnprocessableEntityException('Não é permitido incluir subdomínio em um domínio que possui sistemas vinculados')
      }
      // o nível do subdomínio é o nível do pai + 1
      dominio.nivel = pai.nivel + 1
      // atributos que não existem em subdominios
      dominio.gestorDominio = undefined
      dominio.gestorNegocio = undefined
      dominio.ugDominio = undefined
      dominio.ugNegocio = undefined
      dominio.editorDominio = undefined
    } else {
      if (!await this.podeAlteraDominio(antigo, usuario)) {
        throw new ForbiddenException('Usuário não tem permissão para alterar o dominio')
      }
      dominio.nivel = 0
      if (!dominio.codigo.match(/^[a-z,0-9]{4}$/i)) {
        throw new UnprocessableEntityException('Código do domínio inválido')
      }
      // TODO: validar se o gestor foi desligado da empresa ou saiu da DIDES
      // TODO: validar se a UG do domínio bate com a UG do gestor
      // TODO: validar se a UG do negócio está inativa
    }
    // verifica se existe outro domínio com o mesmo código
    const outro = await this.repository.buscarPorCodigo(dominio.codigo, 'id')
    if (outro && outro.id !== dominio.id) {
      throw new BadRequestException('Já existe outro domínio com este código')
    }
    return dominio
  }

  private async alterarSituacao(id: string, situacao: string): Promise<void> {
    const usuario = await this.auth.getUsuarioLogado()
    // TODO: somente o usuário diretor DIDES/DIRCL ou gestor do domínio em questão pode inativar
    const antigo = await this.buscarPorId(id, '*, gestorDominio/cpf')
    if (antigo.situacao === situacao) {
      throw new Error(`O domínio já está ${situacao}`)
    }
    antigo.alteradoPor = usuario.cpf
    antigo.situacao = situacao
    // TODO: gerar log de alteração
    // TODO: update parcial
    return this.repository.alterar(id, antigo)
  }
}