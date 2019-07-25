import { Body, Controller, Get, Post, Header} from "@nestjs/common"
import { ApiExcludeEndpoint, ApiImplicitBody, ApiOperation, ApiResponse, ApiUseTags, ApiConsumes, ApiProduces, ApiModelProperty, ApiImplicitHeader } from "@nestjs/swagger"
import { Usuario } from "../usuario/usuario.entity"
import { AuthService } from "./auth.service"

@ApiUseTags('Authorization')
@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}
  
  @Get()
  @ApiExcludeEndpoint()
  public async getUsuarioLogado(
  ): Promise<Usuario> {
    return this.service.getUsuarioLogado()
  }

  @Post("/token")
  @Header('content-type', 'text/plain')
  @ApiOperation({
    description: 'Esse serviço facilita a recuperação do token de acesso no login.serpro. Devem ser passado um form-data com os campos username e password.',
    title: "Retorna o token",
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiProduces('text/plain')
  @ApiImplicitBody({
    description: `Formulário contendo os atributos username (usuário LDAP) e password (senha LDAP). Exemplo: username=00000000000&password=********`,
    name: 'form-data',
    required: true,
    type: String
  })
  @ApiResponse({ status: 201, description: 'Token no formato texto' })  
  public async getToken(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<string> {
    return this.service.getToken(username, password)
  }
}
