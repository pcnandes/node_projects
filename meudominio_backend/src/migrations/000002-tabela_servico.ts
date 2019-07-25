import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaServico1557783322000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS servico;
      CREATE TABLE servico (
        codigo INTEGER NOT NULL,
        multicliente BOOLEAN,
        ug CHARACTER VARYING,
        cliente CHARACTER VARYING,
        mnemonico CHARACTER VARYING,
        titulo CHARACTER VARYING,
        data_desativacao DATE,
        gestor_tecnico BIGINT,
        gestor_negocio BIGINT,
        gestor_servico BIGINT
      );
      ALTER TABLE ONLY servico ADD CONSTRAINT servico_pk PRIMARY KEY (codigo);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<any> { 
    await queryRunner.query(`DROP TABLE IF EXISTS servico`)
  }
}