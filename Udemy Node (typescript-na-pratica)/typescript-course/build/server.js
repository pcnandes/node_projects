"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
// classe principal
const api_1 = require("./api/api");
// importando e executando () arquivo de condigurações
const config = require('./config/env/config')();
// atrela o servidor a nossa classe principal
const server = http.createServer(api_1.default);
server.listen(config.serverPort);
// capturando eventos do servidor
// servidor iniciado
server.on('listening', () => console.log(`Server está rodando na porta ${config.serverPort}`));
// erro
server.on('error', (error) => console.log(`Ocorreu um erro: ${error}`));
