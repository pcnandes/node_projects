### referencia: https://www.youtube.com/watch?v=2G_mWfG0DZE

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

# Testes JEST
- npm install --save-dev jest
- npx jest --init