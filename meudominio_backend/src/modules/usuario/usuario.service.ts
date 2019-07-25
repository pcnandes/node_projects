import { ForbiddenException, Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { Page, Pagination } from "../../common/types";
import { AuthService } from "../auth/auth.service";
import { DominioRepository } from "../dominio/dominio.repository";
import { EmpregadoRepository } from "../empregado/empregado.repository";
import { Usuario } from "./usuario.entity";
import { UsuarioRepository } from "./usuario.repository";
import { deletarUsuario } from '../../common/cache';

@Injectable({ scope: Scope.REQUEST })
export class UsuarioService {
  constructor(
    @Inject("AuthService")
    private readonly auth: AuthService,
    @Inject("UsuarioRepository")
    private readonly usuarioRepository: UsuarioRepository,
    @Inject("EmpregadoRepository")
    private readonly empregadoRepository: EmpregadoRepository,
    @Inject("DominioRepository")
    private readonly dominioRepository: DominioRepository,
  ) {}

  /**
   * Busca um serviço pelo código
   * @param {number} cpf CPF do usuário
   * @param {string} fields Campos a serem retornados. Padrão = 'cpf|perfis'
   */
  public async buscarPorCPF(cpf: number): Promise<Usuario> {
    // busca o empregado na base de dados
    const empregado = await this.empregadoRepository.buscarPorCPF(+cpf);
    if (!empregado) { 
      throw new NotFoundException("CPF não encontrado");
    }
    let { result: [usuario] } = await this.buscaPersonalizada('cpf|perfis|empregado/(cpf|nome|lotacao|matricula|email|foto|funcao|ramal)', `cpf$eq${cpf}`);
    if (!usuario) {
      usuario = {
        cpf,
        empregado,
        perfis: []
      }
    }
    const dominios = await this.dominioRepository.buscaPersonalizada('id|editorDominio', 'nivel$eq0', { size: 1000, page: 1 })
    usuario.editorDominio = dominios.result
      .filter(d => (d.editorDominio || [])
      .some(e => +e === +cpf))
      .map(d => d.id)
    return usuario;
  }

  public async listarUsuariosComPerfis(
    fields = 'cpf|perfis|empregado/(cpf|nome|lotacao)',
    condition = null,
    pagination: Pagination = new Pagination()
  ): Promise<Page<Usuario>> {
    return this.usuarioRepository.buscaPersonalizada(fields, condition, pagination);
  }

  public async alterar(cpf: number, usuario: Usuario): Promise<void> {
    const logado: Usuario = await this.auth.getUsuarioLogado();
    const antigo = await this.buscarPorCPF(+cpf);
    if (!antigo) {
      throw new NotFoundException("Usuario não encontrado");
    }
    // verificar se usuario pode fazer alteracao
    if (!logado.perfis || !logado.perfis.includes("ADMIN")) {
      throw new ForbiddenException("Você não têm permissão para alterar perfis de outro usuário");
    }
    usuario.cpf = cpf
    // se o usuário não possui nenhum perfil, então exclui ele da base
    usuario.alteradoPor = logado.cpf
    if ((antigo.perfis || []).length > 0 || (usuario.perfis || []).length > 0) {
      if ((usuario.perfis || []).length === 0) {
        this.usuarioRepository.excluir(+cpf)
      } else if ((antigo.perfis || []).length > 0) {
        this.usuarioRepository.alterar(+cpf, { perfis: usuario.perfis });
      } else {
        usuario.criadoPor = logado.cpf
        this.usuarioRepository.inserir(usuario)
      }
    }
    // acessos a serem incluidos
    const editorIncluir = (usuario.editorDominio || [])
      .filter(d => !(antigo.editorDominio || []).some(a => a === d))
    // acessos a serem removidos
    const editorExcluir = (antigo.editorDominio || [])
      .filter(d => !(usuario.editorDominio || []).some(a => a === d))
    const dominios = await this.dominioRepository.buscaPersonalizada('id|editorDominio', 'nivel$eq0', { size: 1000, page: 1 })
    dominios.result.forEach(d => {
      if (editorIncluir.includes(d.id)) {
        d.editorDominio = (d.editorDominio || []).concat([cpf])
        this.dominioRepository.alterar(d.id, d)
      } else if (editorExcluir.includes(d.id)) {
        d.editorDominio = (d.editorDominio || []).filter(e => +e !== +cpf)
        this.dominioRepository.alterar(d.id, d)
      }
    })
    // exclui usuario alterado do cache
    deletarUsuario(usuario.cpf)
  }

  /**
   * Realiza uma busca personalizada aos usuarios
   * @param {string} fields Campos a serem retornados
   * @param {string} [condition] Condição de consulta
   * @param {Pagination} [pagination] Paginação
   */
  private async buscaPersonalizada(
    fields,
    condition = null,
    pagination: Pagination = new Pagination()
  ): Promise<Page<Usuario>> {
    return this.usuarioRepository.buscaPersonalizada(fields, condition, pagination);
  }
}
