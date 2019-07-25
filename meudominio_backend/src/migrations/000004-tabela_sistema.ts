import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaSistema1557783325000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS sistema_historico;
      DROP TABLE IF EXISTS sistema;
    `)
    await queryRunner.query(`
      CREATE TABLE sistema (
        id UUID DEFAULT uuid_generate_v4() NOT NULL,
        codigo CHARACTER VARYING,
        situacao CHARACTER VARYING,
        nome CHARACTER VARYING,
        descricao TEXT,
        dominio UUID,
        producao BOOLEAN,
        linha_negocio CHARACTER VARYING,
        codigo_servico_principal INTEGER,
        codigo_servico_outros INTEGER[],
        grupos_govi CHARACTER VARYING[],
        solucao CHARACTER VARYING,
        data_criacao TIMESTAMP DEFAULT NOW() NOT NULL,
        data_alteracao TIMESTAMP DEFAULT NOW() NOT NULL,
        criado_por BIGINT NOT NULL,
        alterado_por BIGINT NOT NULL
      );
      ALTER TABLE ONLY sistema ADD CONSTRAINT sistema_pk PRIMARY KEY (id);
      ALTER TABLE ONLY sistema ADD CONSTRAINT sistema_fk_dominio FOREIGN KEY (dominio) REFERENCES dominio(id) ON DELETE CASCADE;
    `)
    await queryRunner.query(`
      CREATE TABLE sistema_historico (
        pk UUID DEFAULT uuid_generate_v4() NOT NULL,
        id UUID NOT NULL,
        codigo CHARACTER VARYING,
        situacao CHARACTER VARYING,
        nome CHARACTER VARYING,
        descricao TEXT,
        dominio UUID,
        producao BOOLEAN,
        linha_negocio CHARACTER VARYING,
        codigo_servico_principal INTEGER,
        codigo_servico_outros INTEGER[],
        grupos_govi CHARACTER VARYING[],
        solucao CHARACTER VARYING,
        data_alteracao TIMESTAMP DEFAULT NOW() NOT NULL,
        alterado_por BIGINT NOT NULL
      );
      ALTER TABLE ONLY sistema_historico ADD CONSTRAINT sistema_historico_pk PRIMARY KEY (pk);
      CREATE INDEX idx_sistema_historico ON sistema_historico(data_alteracao, id);
    `)
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS sistema_historico_trigger ON sistema;
      DROP FUNCTION IF EXISTS sistema_historico_function;
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
  

  public async down(queryRunner: QueryRunner): Promise<any> { 
    await queryRunner.query(`DROP TRIGGER IF EXISTS sistema_historico_trigger ON sistema`)
    await queryRunner.query(`DROP FUNCTION IF EXISTS sistema_historico_function`)
    await queryRunner.query(`DROP TABLE IF EXISTS sistema_historico`)
    await queryRunner.query(`DROP TABLE IF EXISTS sistema`)
  }
}