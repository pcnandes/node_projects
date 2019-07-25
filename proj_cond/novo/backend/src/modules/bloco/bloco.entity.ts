import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Condominio } from './../condominio/condominio.entity';
import { Unidade } from "../unidade/unidade.entity";

@Entity()
export class Bloco {
  
  @PrimaryGeneratedColumn("uuid")
  public id?: string
  
  @Column({ length: 200 })
  public nome?: string
  
  @ManyToOne(type => Condominio, condominio => condominio.blocos)
  public condominio?: Condominio

  @OneToMany(type => Unidade, unidade => unidade.bloco)
  public unidades?: Unidade []
}