import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DeleteCascade1561573799816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      ALTER TABLE dominio DROP CONSTRAINT IF EXISTS dominio_pai;
      ALTER TABLE dominio ADD CONSTRAINT dominio_pai FOREIGN KEY (pai) REFERENCES dominio(id) ON UPDATE CASCADE ON DELETE CASCADE;
      ALTER TABLE dominio_historico DROP CONSTRAINT IF EXISTS dominio_fk;
      ALTER TABLE dominio_historico ADD CONSTRAINT dominio_fk FOREIGN KEY (id) REFERENCES dominio(id) ON UPDATE CASCADE ON DELETE CASCADE;
    `)
    await queryRunner.query(`
      ALTER TABLE sistema DROP CONSTRAINT IF EXISTS sistema_fk_dominio;
      ALTER TABLE sistema ADD CONSTRAINT sistema_fk_dominio FOREIGN KEY (dominio) REFERENCES dominio(id) ON UPDATE CASCADE ON DELETE SET NULL;
      ALTER TABLE sistema_historico DROP CONSTRAINT IF EXISTS sistema_fk;
      ALTER TABLE sistema_historico ADD CONSTRAINT sistema_fk FOREIGN KEY (id) REFERENCES sistema(id) ON UPDATE CASCADE ON DELETE CASCADE;    
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<any> { 
    await queryRunner.query(`ALTER TABLE dominio_historico DROP CONSTRAINT IF EXISTS dominio_fk;`)
    await queryRunner.query(`ALTER TABLE sistema_historico DROP CONSTRAINT IF EXISTS sistema_fk;`)
  }
}