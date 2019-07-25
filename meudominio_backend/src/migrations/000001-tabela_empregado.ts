import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CriarTabelaEmpregado1557783321000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
    await queryRunner.query(`DROP CAST IF EXISTS (character varying AS uuid);`);
    await queryRunner.query(`CREATE CAST (character varying AS uuid) WITH INOUT AS IMPLICIT;`)
    await queryRunner.query(`
      DROP TABLE IF EXISTS empregado;
      CREATE TABLE empregado (
        cpf BIGINT NOT NULL,
        matricula INTEGER NOT NULL,
        nome CHARACTER VARYING,
        lotacao CHARACTER VARYING,
        teletrabalhador BOOLEAN,
        funcao CHARACTER VARYING,
        cargo CHARACTER VARYING,
        data_desligamento DATE,
        jornada SMALLINT,
        ramal CHARACTER VARYING,
        email CHARACTER VARYING,
        foto CHARACTER VARYING
      );
      ALTER TABLE ONLY empregado ADD CONSTRAINT empregado_pk PRIMARY KEY (cpf);
      CREATE INDEX idx_empregado_matricula ON empregado(matricula);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<any> { 
    await queryRunner.query(`DROP TABLE IF EXISTS empregado`)
  }
}