import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
// api que captura os erros do servidor
import { errorHandlerApi } from './errorHandlerApi';

// importando nossas rotas
import Routes from './routes/routes';

class Api {
  public express : Application;

  constructor() {
    this.express = express();
    // invoca o middleware para que esses sejam carregados e as rotas passem a ser aceitas
    this.middleware();
  }

  middleware(): void {
    // morgan serve para gerar um log de toda requisição q é feita
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.urlencoded( {extended: true} ));
    this.express.use(bodyParser.json());
    // modulo responsável por capturar erros
    this.express.use(errorHandlerApi);
    // express representa nossa Application
    this.router(this.express);
  }

  private router(app: Application): void {
    // routes precisa do objeto application para funcionar
    new Routes(app);
  }
}

export default new Api().express;