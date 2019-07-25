import { Bloco } from './../bloco/bloco.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Unidade {
  
  @PrimaryGeneratedColumn("uuid")
  public id?: string

  @Column({ length: 50 })
  public nome?: string

  @Column({type: "int"})
  public andar?: number

  @ManyToOne(type => Bloco, bloco => bloco.unidades)
  public bloco?: Bloco

}