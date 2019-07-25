import { MigrationInterface, QueryRunner } from 'typeorm';

export class DominioEditorDominio1562157614000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP CAST IF EXISTS (character varying AS bigint[]);
      CREATE CAST (character varying AS bigint[]) WITH INOUT AS IMPLICIT;
      DROP TRIGGER IF EXISTS dominio_historico_trigger ON dominio;
      ALTER TABLE dominio ADD COLUMN editor_dominio BIGINT[];
      ALTER TABLE dominio_historico ADD COLUMN editor_dominio BIGINT[];
      CREATE OR REPLACE FUNCTION dominio_historico_function()
      RETURNS trigger AS
      $BODY$
      BEGIN
          EXECUTE 'INSERT INTO dominio_historico(id, pai, codigo, nome, descricao, gestor_dominio, gestor_negocio, ug_dominio, ug_negocio, situacao, data_alteracao, alterado_por, nivel, editor_dominio) '||
                  'VALUES ($1.id, $1.pai, $1.codigo, $1.nome, $1.descricao, $1.gestor_dominio, $1.gestor_negocio, $1.ug_dominio, $1.ug_negocio, $1.situacao, $1.data_alteracao, $1.alterado_por, $1.nivel, $1.editor_dominio);'
                  USING OLD;
          RETURN OLD;
      END
      $BODY$
      LANGUAGE plpgsql;
      CREATE TRIGGER dominio_historico_trigger
      AFTER UPDATE ON dominio FOR EACH ROW
      EXECUTE PROCEDURE dominio_historico_function();
    `)
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS usuario_historico_trigger ON usuario;
      DROP FUNCTION IF EXISTS usuario_historico_function;
      ALTER TABLE usuario DROP COLUMN dominios;
      ALTER TABLE usuario DROP COLUMN gerir_todos_dominios;
      ALTER TABLE usuario_historico DROP COLUMN dominios;
      ALTER TABLE usuario_historico DROP COLUMN gerir_todos_dominios;
      CREATE OR REPLACE FUNCTION usuario_historico_function()
      RETURNS trigger AS
      $BODY$
      BEGIN
          EXECUTE 'INSERT INTO usuario_historico(cpf, perfis, data_alteracao, alterado_por) '||
                  'VALUES ($1.cpf, $1.perfis, $1.data_alteracao, $1.alterado_por);'
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
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS dominio_historico_trigger ON dominio;
      ALTER TABLE dominio DROP COLUMN editor_dominio;
      ALTER TABLE dominio_historico DROP COLUMN editor_dominio;
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
    await queryRunner.query(`
    `)
  }
}