import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriarTabelaDominio1557783323000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS dominio_historico_trigger ON dominio;
      DROP FUNCTION IF EXISTS dominio_historico_function;
      DROP TABLE IF EXISTS dominio_historico;
      DROP TABLE IF EXISTS dominio;
    `)

    await queryRunner.query(`
      CREATE TABLE dominio (
        id UUID DEFAULT uuid_generate_v4() NOT NULL,
        pai UUID,
        nivel SMALLINT,
        codigo CHARACTER VARYING,
        nome CHARACTER VARYING,
        gestor BIGINT,
        descricao TEXT,
        ug_negocio CHARACTER VARYING,
        ug_dominio CHARACTER VARYING,
        situacao CHARACTER VARYING,
        data_criacao TIMESTAMP DEFAULT NOW() NOT NULL,
        data_alteracao TIMESTAMP DEFAULT NOW() NOT NULL,
        criado_por BIGINT NOT NULL,
        alterado_por BIGINT NOT NULL
      );
      ALTER TABLE ONLY dominio ADD CONSTRAINT dominio_pk PRIMARY KEY (id);
      ALTER TABLE ONLY dominio ADD CONSTRAINT dominio_pai FOREIGN KEY (pai) REFERENCES dominio(id);
    `)
    await queryRunner.query(`
      CREATE TABLE dominio_historico (
        pk UUID DEFAULT uuid_generate_v4() NOT NULL,
        id UUID NOT NULL,
        pai UUID,
        nivel SMALLINT,
        codigo CHARACTER VARYING,
        nome CHARACTER VARYING,
        gestor BIGINT,
        descricao TEXT,
        ug_negocio CHARACTER VARYING,
        ug_dominio CHARACTER VARYING,
        situacao CHARACTER VARYING,
        data_alteracao TIMESTAMP DEFAULT NOW() NOT NULL,
        alterado_por BIGINT NOT NULL
      );
      ALTER TABLE ONLY dominio_historico ADD CONSTRAINT dominio_historico_pk PRIMARY KEY (pk);
      CREATE INDEX idx_dominio_historico ON dominio_historico(data_alteracao, id);
    `)
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION dominio_historico_function()
      RETURNS trigger AS
      $BODY$
      BEGIN
          EXECUTE 'INSERT INTO dominio_historico(id, pai, codigo, nome, descricao, gestor, ug_dominio, ug_negocio, situacao, data_alteracao, alterado_por, nivel) '||
                  'VALUES ($1.id, $1.pai, $1.codigo, $1.nome, $1.descricao, $1.gestor, $1.ug_dominio, $1.ug_negocio, $1.situacao, $1.data_alteracao, $1.alterado_por, $1.nivel);'
                  USING OLD;
          RETURN OLD;
      END
      $BODY$
      LANGUAGE plpgsql;
      CREATE TRIGGER dominio_historico_trigger
      AFTER UPDATE ON dominio FOR EACH ROW
      EXECUTE PROCEDURE dominio_historico_function();
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<any> { 
    await queryRunner.query(`DROP TRIGGER IF EXISTS dominio_historico_trigger ON dominio`)
    await queryRunner.query(`DROP FUNCTION IF EXISTS dominio_historico_function`)
    await queryRunner.query(`DROP TABLE IF EXISTS dominio_historico`)
    await queryRunner.query(`DROP TABLE IF EXISTS dominio`)
  }
}