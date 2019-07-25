import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaUsuario1559654951000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS usuario_historico;
      DROP TABLE IF EXISTS usuario;
    `)
    await queryRunner.query(`
      CREATE TABLE usuario (
        cpf BIGINT NOT NULL,
        perfis CHARACTER VARYING[],
        dominios UUID[],
        gerir_todos_dominios BOOLEAN,
        data_criacao TIMESTAMP DEFAULT NOW() NOT NULL,
        data_alteracao TIMESTAMP DEFAULT NOW() NOT NULL,
        criado_por BIGINT NOT NULL,
        alterado_por BIGINT NOT NULL
      );
      ALTER TABLE ONLY usuario ADD CONSTRAINT usuario_pk PRIMARY KEY (cpf);
    `)
    await queryRunner.query(`
      CREATE TABLE usuario_historico (
        pk UUID DEFAULT uuid_generate_v4() NOT NULL,
        cpf BIGINT NOT NULL,
        perfis CHARACTER VARYING[],
        dominios UUID[],
        gerir_todos_dominios BOOLEAN,
        data_alteracao TIMESTAMP DEFAULT NOW() NOT NULL,
        alterado_por BIGINT NOT NULL
      );
      ALTER TABLE ONLY usuario_historico ADD CONSTRAINT usuario_historico_pk PRIMARY KEY (pk);
      CREATE INDEX idx_usuario_historico ON usuario_historico(data_alteracao, cpf);
    `)
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS usuario_historico_trigger ON usuario;
      DROP FUNCTION IF EXISTS usuario_historico_function;
      CREATE OR REPLACE FUNCTION usuario_historico_function()
      RETURNS trigger AS
      $BODY$
      BEGIN
          EXECUTE 'INSERT INTO usuario_historico(cpf, dominios, perfis, gerir_todos_dominios, data_alteracao, alterado_por) '||
                  'VALUES ($1.cpf, $1.dominios, $1.perfis, $1.gerir_todos_dominios, $1.data_alteracao, $1.alterado_por);'
                  USING OLD;
          RETURN OLD;
      END
      $BODY$
      LANGUAGE plpgsql;
      CREATE TRIGGER usuario_historico_trigger
      AFTER UPDATE ON usuario FOR EACH ROW
      EXECUTE PROCEDURE usuario_historico_function();
    `)
  }
  

  public async down(queryRunner: QueryRunner): Promise<any> { 
    await queryRunner.query(`DROP TRIGGER IF EXISTS usuario_historico_trigger ON usuario`)
    await queryRunner.query(`DROP FUNCTION IF EXISTS usuario_historico_function`)
    await queryRunner.query(`DROP TABLE IF EXISTS usuario_historico`)
    await queryRunner.query(`DROP TABLE IF EXISTS usuario`)
  }
}