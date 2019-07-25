import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import config from "./config"
import { DominioModule } from "./modules/dominio/dominio.module";
import { EmpregadoModule } from "./modules/empregado/empregado.module"
import { ServicoModule } from "./modules/servico/servico.module"
import { SistemaModule } from "./modules/sistema/sistema.module"
import { UsuarioModule } from "./modules/usuario/usuario.module"
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Módulo do Banco de Dados
    TypeOrmModule.forRoot({
      database: config.database.name,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      host: config.database.host,
      logging: false,
      migrations: [__dirname + "/**/migrations/*{.js,.ts}"],
      migrationsRun: true,
      migrationsTableName: "migrations",
      password: config.database.password,
      port: config.database.port,
      synchronize: false,
      type: "postgres",
      username: config.database.username
    }),
    // Módulos da Aplicação
    AuthModule,
    EmpregadoModule,
    DominioModule,
    ServicoModule,
    SistemaModule,
    UsuarioModule,
    // Módulo do GraphQL
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: false,
      path: '/api/graphql',
      playground: {
        endpoint: '/api/graphql'
      }
    })
  ]
})
export class ApplicationModule {}
