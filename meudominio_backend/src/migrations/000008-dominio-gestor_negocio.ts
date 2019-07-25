import { MigrationInterface, QueryRunner } from 'typeorm';

export class DominioGestorNegocio1562157613091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS dominio_historico_trigger ON dominio;
      ALTER TABLE dominio ADD COLUMN gestor_negocio BIGINT;
      ALTER TABLE dominio RENAME COLUMN gestor TO gestor_dominio;
      ALTER TABLE dominio_historico ADD COLUMN gestor_negocio BIGINT;
      ALTER TABLE dominio_historico RENAME COLUMN gestor TO gestor_dominio;
      CREATE OR REPLACE FUNCTION dominio_historico_function()
      RETURNS trigger AS
      $BODY$
      BEGIN
          EXECUTE 'INSERT INTO dominio_historico(id, pai, codigo, nome, descricao, gestor_dominio, gestor_negocio, ug_dominio, ug_negocio, situacao, data_alteracao, alterado_por, nivel) '||
                  'VALUES ($1.id, $1.pai, $1.codigo, $1.nome, $1.descricao, $1.gestor_dominio, $1.gestor_negocio, $1.ug_dominio, $1.ug_negocio, $1.situacao, $1.data_alteracao, $1.alterado_por, $1.nivel);'
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
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS dominio_historico_trigger ON dominio;
      ALTER TABLE dominio DROP COLUMN gestor_negocio;
      ALTER TABLE dominio RENAME COLUMN gestor_dominio TO gestor;
      ALTER TABLE dominio_historico DROP COLUMN gestor_negocio;
      ALTER TABLE dominio_historico RENAME COLUMN gestor_dominio TO gestor;
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
}