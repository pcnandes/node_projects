"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// api que captura os erros do servidor
const errorHandlerApi_1 = require("./errorHandlerApi");
// importando nossas rotas
const routes_1 = require("./routes/routes");
class Api {
    constructor() {
        this.express = express();
        // invoca o middleware para que esses sejam carregados e as rotas passem a ser aceitas
        this.middleware();
    }
    middleware() {
        // morgan serve para gerar um log de toda requisição q é feita
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        // modulo responsável por capturar erros
        this.express.use(errorHandlerApi_1.errorHandlerApi);
        // express representa nossa Application
        this.router(this.express);
    }
    router(app) {
        // routes precisa do objeto application para funcionar
        new routes_1.default(app);
    }
}
exports.default = new Api().express;
