import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AlterSistema1561573800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS sistema_historico_trigger ON sistema;
      DROP FUNCTION IF EXISTS sistema_historico_function;
      DROP CAST IF EXISTS (character varying AS integer[]);
      CREATE CAST (character varying AS integer[]) WITH INOUT AS IMPLICIT;
      DROP CAST IF EXISTS (character varying AS character varying[]);
      CREATE CAST (character varying AS character varying[]) WITH INOUT AS IMPLICIT;
      ALTER TABLE sistema ADD COLUMN IF NOT EXISTS identificador CHARACTER VARYING;
      ALTER TABLE sistema ADD COLUMN IF NOT EXISTS sigla CHARACTER VARYING;
      ALTER TABLE sistema DROP COLUMN IF EXISTS codigo;
      ALTER TABLE sistema_historico ADD COLUMN IF NOT EXISTS identificador CHARACTER VARYING;
      ALTER TABLE sistema_historico ADD COLUMN IF NOT EXISTS sigla CHARACTER VARYING;
      ALTER TABLE sistema_historico DROP COLUMN IF EXISTS codigo;
      ALTER TABLE sistema DROP CONSTRAINT IF EXISTS sistema_uk;
      ALTER TABLE sistema ADD CONSTRAINT sistema_uk UNIQUE(identificador);
    `)
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION sistema_historico_function()
      RETURNS trigger AS
      $BODY$
      BEGIN
          EXECUTE 'INSERT INTO sistema_historico(id, identificador, sigla, situacao, nome, descricao, dominio, producao, linha_negocio, codigo_servico_principal, codigo_servico_outros, grupos_govi, solucao, data_alteracao, alterado_por) '||
                  'VALUES ($1.id, $1.identificador, $1.sigla, $1.situacao, $1.nome, $1.descricao, $1.dominio, $1.producao, $1.linha_negocio, $1.codigo_servico_principal, $1.codigo_servico_outros, $1.grupos_govi, $1.solucao, $1.data_alteracao, $1.alterado_por);'
                  USING OLD;
          RETURN OLD;
      END
      $BODY$
      LANGUAGE plpgsql;
      CREATE TRIGGER sistema_historico_trigger
      AFTER UPDATE ON sistema FOR EACH ROW
      EXECUTE PROCEDURE sistema_historico_function();
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<any> { 
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS sistema_historico_trigger ON sistema;
      DROP FUNCTION IF EXISTS sistema_historico_function;
      DROP CAST IF EXISTS (character varying AS integer[]);
      DROP CAST IF EXISTS (character varying AS character varying[]);
      ALTER TABLE sistema DROP CONSTRAINT IF EXISTS sistema_uk;
      ALTER TABLE sistema ADD COLUMN IF NOT EXISTS codigo CHARACTER VARYING;
      ALTER TABLE sistema DROP COLUMN IF EXISTS sigla;
      ALTER TABLE sistema DROP COLUMN IF EXISTS identificador;
      ALTER TABLE sistema_historico ADD COLUMN IF NOT EXISTS codigo CHARACTER VARYING;
      ALTER TABLE sistema_historico DROP COLUMN IF EXISTS sigla;
      ALTER TABLE sistema_historico DROP COLUMN IF EXISTS identificador;
    `)
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION sistema_historico_function()
      RETURNS trigger AS
      $BODY$
      BEGIN
          EXECUTE 'INSERT INTO sistema_historico(id, codigo, situacao, nome, descricao, dominio, producao, linha_negocio, codigo_servico_principal, codigo_servico_outros, grupos_govi, solucao, data_alteracao, alterado_por) '||
                  'VALUES ($1.id, $1.codigo, $1.situacao, $1.nome, $1.descricao, $1.dominio, $1.producao, $1.linha_negocio, $1.codigo_servico_principal, $1.codigo_servico_outros, $1.grupos_govi, $1.solucao, $1.data_alteracao, $1.alterado_por);'
                  USING OLD;
          RETURN OLD;
      END
      $BODY$
      LANGUAGE plpgsql;
      CREATE TRIGGER sistema_historico_trigger
      AFTER UPDATE ON sistema FOR EACH ROW
      EXECUTE PROCEDURE sistema_historico_function();
    `)
  }
}