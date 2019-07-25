# Meu Dominio - Backend

## Ferramentas

* Visual Studio Code + Plugins:
* PgAdmin 4
* NodeJS 10+
* Dependências globais do NPM: `npm install -g tslint typescript npm-check-updates`

## Organização

* ***.vscode/launch.json***: Configurações sobre a execução da aplicação pelo VSCode, inclusive no modo Debug;
* ***src/migrations***: Código incremental para criação do banco de dados. Quando a aplicação é iniciada ele executa os *scripts* novos, que é controlado por uma tabela migrations no banco de dados. Os arquivos são nomeados em sequencia numérica para garantir a ordem de execução, e dentro deles o nome da classe deve ser terminado com o timestamp do horário de criação do migration;
* ***src/modules***: Aqui ficam os módulos da aplicação, dividos por assunto;
* ***src/modules/*{modulo}*/*{modulo}*.controller.ts***: Controlador do módulo, é o ponto de entrada da API REST;
* ***src/modules/*{modulo}*/*{modulo}*.service.ts***: Camada de serviço da funcionalidade;
* ***src/modules/*{modulo}*/*{modulo}*.entity.ts***: Entidade mapeada com o banco de dados;
* ***src/modules/*{modulo}*/*{modulo}*.module.ts***: Encapsula os arquivos do módulo para serem importados em outros módulos;
* ***src/modules/*{modulo}*/*{modulo}*.resolver.ts***: Classe que resolve as rotas do GraphQL;
* ***src/modules/*{modulo}*/*{modulo}*.repository.ts***: Repositório da entidade para acesso ao banco de dados;
* ***src/app.module.ts***: Módulo principal da aplicação. Aqui importa todos os outros módulos existentes;
* ***src/config.ts***: Parâmetros de configuração da aplicação;
* ***src/main.ts***: Ponto de entrada da aplicação;
* ***.gitignore***: Arquivos e pastas ignoradas pelo Git no versionamento;
* ***.gitlab-ci.yml***: Instruções para o Build e Deploy contínuos;
* ***index.js***: Ponto de entrada alternativo da aplicação;
* ***package.json***: Dependências do projeto;
* ***tsconfig.json***: Configurações para converter o código TypeScript em JavaScript puro;
* ***tsling.json***: Padrões de codificação do TypeScript;

## Tecnologias

* NodeJS
* TypeScript
* NestJS
* TypeORM
* GraphQL
* Swagger
* Express
* Graylog