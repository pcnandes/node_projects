import { BadRequestException, Inject, Injectable, NotFoundException, Scope, UnauthorizedException, UnprocessableEntityException, ForbiddenException } from '@nestjs/common'
import { Page, Pagination } from '../../common/types'
import { AuthService } from '../auth/auth.service';
import { DominioService } from '../dominio/dominio.service';
import { Usuario } from '../usuario/usuario.entity';
import { Sistema } from './sistema.entity'
import { SistemaRepository } from './sistema.repository'


@Injectable({ scope: Scope.REQUEST })
export class SistemaService {
  constructor(
    @Inject('SistemaRepository')
    private readonly repository: SistemaRepository,
    @Inject('DominioService')
    private readonly dominioService: DominioService,
    @Inject('AuthService')
    private readonly auth: AuthService
  ) {}

  /**
   * Realiza uma busca personalizada aos serviços
   * @param {string} fields Campos a serem obtidos
   * @param {string} condition Condição WHERE a ser aplicada
   * @param {Pagination} pagination Paginação
   */
  public async buscaPersonalizada (fields, condition, pagination: Pagination = new Pagination()): Promise<Page<Sistema>> {
    return this.repository.buscaPersonalizada(fields, condition, pagination)
  }

  public async buscarPorId (id: string, fields: string = 'id|sigla|nome|descricao|linhaNegocio|producao|codigoServicoPrincipal|codigoServicoOutros|gruposGovi'): Promise<Sistema> {
    const { result: [ sistema ] } = await this.repository.buscaPersonalizada(fields, `id$eq${id}`)
    if (!sistema) {
      throw new NotFoundException('Sistema não encontrado')
    }
    return sistema
  }

  public async buscarPorIdentificador (identificador: string, fields: string = 'id|sigla|nome|descricao|linhaNegocio|producao|codigoServicoPrincipal|codigoServicoOutros|gruposGovi'): Promise<Sistema> {
    const { result: [ sistema ] } = await this.repository.buscaPersonalizada(fields, `identificador$eq${identificador}`)
    if (!sistema) {
      throw new NotFoundException('Sistema não encontrado')
    }
    return sistema
  }

  public async inserir (sistema: Sistema): Promise<string> {
    const usuario = await this.auth.getUsuarioLogado()
    // TODO: somente o usuários DIDES/DIRCL podem criar
    sistema = await this.validar(sistema, usuario)
    sistema.criadoPor = usuario.cpf
    sistema.alteradoPor = usuario.cpf
    sistema.id = undefined
    sistema.situacao = 'ATIVO'
    // TODO: verificar se o subdomínio está inativo
    return this.repository.inserir(sistema)
  }

  public async alterar (id: string, sistema: Sistema): Promise<void> {
    const usuario = await this.auth.getUsuarioLogado()
    // TODO: somente o usuário diretor DIDES/DIRCL ou gestor do domínio em questão pode alterar
    const antigo = await this.buscarPorId(id, 'id|situacao|criadoPor|dataCriacao')
    if (!antigo) {
      throw new NotFoundException('Sistema não encontrado')
    }
    sistema.id = id
    sistema.situacao = antigo.situacao
    sistema.alteradoPor = usuario.cpf
    sistema.criadoPor = antigo.criadoPor
    sistema.dataCriacao = antigo.dataCriacao
    sistema = await this.validar(sistema, usuario)
    await this.repository.alterar(id, sistema)
  }

  public async excluir (id: string): Promise<void> {
    const sistema = await this.buscarPorId(id, 'id|identificador|situacao|dominio/id')
    const dominio = await this.dominioService.buscarPorId(sistema.dominio.id, 'id|codigo|situacao|pai/id')
    const usuario = await this.auth.getUsuarioLogado()
    // nao deveria existir sistema em dominio, apenas em subdominio
    const pai = await this.dominioService.buscarPorId(dominio.pai.id, 'id|nivel|codigo|gestorDominio/cpf|gestorNegocio/cpf|editorDominio|pai/id')
    if (!await this.dominioService.podeAlteraDominio(pai, usuario)) {
      throw new ForbiddenException('Usuário não tem permissão para excluir o sistema')
    } else {
      await this.repository.excluir(id)
    }
  }

  public async inativar (id: string): Promise<void> {
    this.alterarSituacao(id, 'INATIVO')
  }

  public async reativar (id: string): Promise<void> {
    this.alterarSituacao(id, 'ATIVO')
  }

  private async validar (sistema: Sistema, usuario: Usuario): Promise<Sistema> {
    if (!sistema.dominio || !sistema.dominio.id) {
      throw new UnprocessableEntityException('Informe o subdomínio')
    }
    const dominio = await this.dominioService.buscarPorId(sistema.dominio.id, 'id|pai/id')
    if (!dominio) {
      throw new UnprocessableEntityException('Subdomínio inexistente')
    }
    let pai = null
    if (dominio.pai && dominio.pai.id) {
      pai = await this.dominioService.buscarPorId(dominio.pai.id, 'id|gestorDominio/cpf|gestorNegocio/cpf|editorDominio')
    } else {
      throw new BadRequestException('Apenas subdomínios podem ter sistemas vinculados')
    }
    if (!await this.dominioService.podeAlteraDominio(pai, usuario)) {
      throw new ForbiddenException('Usuário não tem permissão para alterar sistemas deste dominio')
    }
    const existe = await this.repository.buscaPersonalizada('id|identificador', `identificador$eq${sistema.identificador}`)
    if (existe.count > 0 && existe.result[0].id !== sistema.id) {
      throw new BadRequestException('Já existe outro sistema com o identificador informado')
    }
    sistema.codigoServicoOutros = (sistema.codigoServicoOutros || [])
      .filter(s => s !== sistema.codigoServicoPrincipal)
      .filter((v, i, a) => a.indexOf(v) === i)
    sistema.codigoServicoOutros.sort((a, b) => (+a) - (+b))
    return sistema
  }

  private async alterarSituacao(id: string, situacao: string): Promise<void> {
    const usuario = await this.auth.getUsuarioLogado()
    // TODO: somente o usuário diretor DIDES/DIRCL
    const antigo = await this.buscarPorId(id, 'id|situacao')
    if (antigo.situacao === situacao) {
      throw new Error(`O sistema já está ${situacao}`)
    }
    antigo.alteradoPor = usuario.cpf
    antigo.situacao = situacao
    // TODO: gerar log de alteração
    // TODO: update parcial
    this.repository.alterar(id, antigo)
  }
}
