import "reflect-metadata"

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApplicationModule } from "./app.module"
import config from "./config"

const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const Keycloak = require('keycloak-connect');

const keycloak = new Keycloak({}, config.auth);

async function bootstrap() {
  const opt = {
    logger: console
  }
  const app = await NestFactory.create(ApplicationModule, opt)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    whitelist: true
  }));

  // Configura os Middlewares do Express
  app.use(helmet())
  app.use(cors())
  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(keycloak.middleware())

  // obriga o login de tudo dentro de api, exceto para a documentação
  app.use(/^\/api\/(?!docs|auth\/token).+$/, keycloak.protect());

  /* recupera usuario do login 
    app.use('/api/*', (req, res: Response, next: Function) => {
    const header = req.headers['authorization']
    const sub = req.kauth.grant.access_token.content.sub
    const exp = req.kauth.grant.access_token.content.sub
    if(usuarios.some((u) => u.sub !== sub)){
      axios.get(`${kcConfig.serverUrl}/realms/${kcConfig.realm}/protocol/openid-connect/userinfo`, { headers: { Authorization: header } })
      .then(response => {
        usuarios.push({sub: response.data.sub, cpf: response.data.CPF, exp })
        next()
      })
      .catch(error => {next(error)})
    }
  }); */

  // Configura a documentação da API
  const options = new DocumentBuilder()
    .setTitle('MeuDominio.SERPRO')
    .setDescription('API REST do Portal MeuDominio.SERPRO')
    .setVersion('1.0')
    .setBasePath('api')
    .setSchemes('https')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);

  // Inicia o servidor
  await app.listen(process.env.BACKEND_PORT || 9000);
}
bootstrap();