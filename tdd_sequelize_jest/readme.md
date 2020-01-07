### referencia: https://www.youtube.com/watch?v=2G_mWfG0DZE

- aplicação usará um banco sql lite para rodar os testes
- npm run test -> executa os testes.. existe um pretest que será executado sempre antes dos tests. (existe PREtest e POSTtest, sempre q precisar executar algo antes ou depois utilize PRE e POST)
- o banco será recriado a cada execução de testes

# criaçao do projeto
- npm init
- npm install express --save
- npm install --save sequelize
- npm install --save pg pg-hstore
> blibliotecas do sequelize para trabalhar com postgres 
- npm install --save sequelize-cli -D
> cli do sequelize
- npx sequelize init 
> cria arquivos de configuração do sequelize
os arquivos foram mudados de pasta conforme verificado no projeto
o arquivo .sequelizerc detem a informacao da localização de cada arquivo
- npx sequelize migration:create --name=create-users
> criacao de arquivo de migration
- npx sequelize db:migrate
> executa a migração do banco de dados
- npm install --save-dev nodemon


# bibliotecas usadas para testes
- npm install dotenv
> usado para ler arquivos .env
- npm install sqlite3 -D
> banco mais simples usado para rodar os testes
- npm install supertest -D
> usado para fazer testes em API, ou seja, executar get, post, delete, etc

# Testes JEST
- npm install --save-dev jest
- npx jest --init
