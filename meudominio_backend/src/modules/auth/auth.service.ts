import {
  Inject,
  Injectable,
  Logger,
  Request,
  Scope,
  UnauthorizedException,
  BadRequestException
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import axios from "axios";
import { Pagination } from "../../common/types";
import config from "../../config";
import { Dominio } from "../dominio/dominio.entity";
import { DominioRepository } from "../dominio/dominio.repository";
import { Empregado } from "../empregado/empregado.entity";
import { EmpregadoRepository } from "../empregado/empregado.repository";
import { Usuario } from "../usuario/usuario.entity";
import { UsuarioRepository } from "../usuario/usuario.repository";
import { gravarUsuario, getUsuario } from '../../common/cache';


@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private usuario: Usuario = undefined;

  constructor(
    @Inject(REQUEST)
    private readonly req: Request,
    @Inject("UsuarioRepository")
    private readonly usuarioRepository: UsuarioRepository,
    @Inject("EmpregadoRepository")
    private readonly empregadoRepository: EmpregadoRepository,
    @Inject("DominioRepository")
    private readonly dominioRepository: DominioRepository
  ) {}

  // TODO ajustar esse método para apenas recuperar o usuario logado do cache e delegar
  // para outro o carregamento do usuario caso o mesmo nao se encontre no cache
  public async getUsuarioLogado(): Promise<Usuario> {
    const header = this.req.headers['authorization'];
    // const key = this.req['kauth'].grant.access_token.content.sub
    const cpf = +this.req['kauth'].grant.access_token.content.CPF
    const dataExpiracao = new Date(0)
    dataExpiracao.setUTCSeconds(this.req['kauth'].grant.access_token.content.exp)
    // após expirar a sessao, mantenho o usuario em cache por 5 minutos
    // verificar se precisa definir tempo de expiração
    const exp = Math.max((dataExpiracao.getTime() - new Date().getTime()), (1000 * 60 * 5))

    this.usuario = await getUsuario(cpf)
    
    if (!this.usuario || !this.usuario.cpf) {
      let response
      try {
        response = await axios.get(
          `${config.auth.serverUrl}/realms/${
            config.auth.realm
          }/protocol/openid-connect/userinfo`,
          { headers: { Authorization: header } }
        );
      } catch (err) {
        Logger.error(err);
        throw new UnauthorizedException("Erro ao validar login SERPRO");
      }
      const cpf = parseInt(response.data.CPF, 10);
      const usuario = await this.buscarUsuarioPorCPF(cpf);
      const empregado = await this.buscarEmpregadoPorCPF(cpf);
      const dominios = await this.buscarDominios();

      if (!empregado) {
        throw new UnauthorizedException('CPF não encontrado');
      }
      
      this.usuario = {
        cpf,
        editorDominio: dominios
          .filter(d => (d.editorDominio || []).some(e => +e === +cpf))
          .map(d => d.id),
        empregado,
        perfis: (usuario || {}).perfis
      }
      gravarUsuario(this.usuario, exp)
    }
    return this.usuario;
  }

  public async getToken(usuario: string, senha: string): Promise<string> {
    let token
    const redirectUri = encodeURIComponent(config.auth.clientId === 'meudominio' ? 'https://meudominio.serpro.gov.br/#/' : 'https://val-meudominio.estaleiro.serpro/#/')
    if (!usuario || !senha)
      throw new BadRequestException("Informe usuário e senha")
    try {
      // chamada da tela de login
      const responseGet = await axios.get(
        `${config.auth.serverUrl}/realms/${
          config.auth.realm
        }/protocol/openid-connect/auth?client_id=${config.auth.clientId}&redirect_uri=${redirectUri}&response_mode=fragment&response_type=code&scope=openid`
      )
      // recupero o cookie
      const cookie = responseGet.headers['set-cookie'].map(c => c.split(';')[0]).join(';')
      // recupero o action
      let action = responseGet.data.match(/action=\"(https:[^\"]+).+\"/)
      // retiro os caracteres amp;
      action = action[1].replace(/amp;/g, '')
      // envio o formulario de login para o loginserpro
      let responsePost = await axios.post(action,
        `username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(senha)}`,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'cookie': cookie },
          maxRedirects: 0, validateStatus: (status => status >= 200 && status < 400)})

      // recupero o code para solicitar o token        
      const code = responsePost.headers['location'].match(/.*&code=([^&]+).*$/)[1]
      const formToken = `code=${code}&grant_type=authorization_code&client_id=${config.auth.clientId}&redirect_uri=${redirectUri}`
      
      // envio o form solitando o token
      const responsetoken = await axios.post(`${config.auth.serverUrl}/realms/${config.auth.realm}/protocol/openid-connect/token`,
        formToken,
        { headers: {'Content-Type': 'application/x-www-form-urlencoded', 'cookie': cookie },
          maxRedirects: 0, validateStatus: (status => status >= 200 && status < 400) }
      )
      token = `${responsetoken.data.access_token}`
    } catch (err) {
      Logger.error(err)
      throw new UnauthorizedException("Erro ao validar login SERPRO")
    }
    return token
  }

  private async buscarUsuarioPorCPF(cpf: number): Promise<Usuario> {
    const fields: string =
      "cpf|perfis|empregado/(*)";
    const {
      result: [usuario]
    } = await this.usuarioRepository.buscaPersonalizada(fields, `cpf$eq${cpf}`);
    return usuario;
  }

  private async buscarEmpregadoPorCPF(cpf: number): Promise<Empregado> {
    const fields: string =
      "cpf|matricula|nome|lotacao|funcao|cargo|ramal|foto|email";
    const {
      result: [empregado]
    } = await this.empregadoRepository.buscaPersonalizada(
      fields,
      `cpf$eq${cpf}`,
      new Pagination()
    );
    return empregado;
  }

  private async buscarDominios(): Promise<Dominio[]> {
    const { result } = await this.dominioRepository.buscaPersonalizada('id|editorDominio', 'nivel$eq0', { page: 1, size: 1000 });
    return result
  }

}
