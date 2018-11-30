import * as http from 'http';
// classe principal
import Api from './api/api';

// esse require ja retorna o arquivo index.ts q esta dentro de models
const models = require('./models')

// importando e executando () arquivo de condigurações
const config = require('./config/env/config')();

// atrela o servidor a nossa classe principal
const server = http.createServer(Api);

// models.sequelize.sync() -> ira criar as tabelas no banco
// colocamos as intrucoes de subir o servidor no seu retorno para que o servidor so inicie 
// depois que o banco estiver sincronizado com o modelo
models.sequelize.sync().then(() => {
  server.listen(config.serverPort);
  // capturando eventos do servidor
  // servidor iniciado
  server.on('listening', () => console.log(`Server está rodando na porta ${config.serverPort}`))
  // erro
  server.on('error', (error: NodeJS.ErrnoException) => console.log(`Ocorreu um erro: ${error}`))
  
});

