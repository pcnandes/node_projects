import { Bloco } from "../bloco/bloco.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CondominioSituacao } from "./condominio.enum";

@Entity()
export class Condominio {

  @PrimaryGeneratedColumn("uuid")
  public id?: string

  @Column({ length: 200 })
  public nome?: string

  @Column({
    type: "enum",
    enum: CondominioSituacao,
    default: CondominioSituacao.RASCUNHO
  })
  public situacao?: string

  @OneToMany(type => Bloco, bloco => bloco.condominio, {
    cascade: true
  })
  public blocos?: Bloco []
}