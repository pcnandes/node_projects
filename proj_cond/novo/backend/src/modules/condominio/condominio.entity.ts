import { Bloco } from "../bloco/bloco.entity";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Situacao {
  RASCUNHO = 'Rascunho',
  ATIVO = 'Ativo',
  INATIVO = 'Inativo'
}

@Entity()
export class Condominio {

  @PrimaryGeneratedColumn("uuid")
  public id?: string

  @Column({ length: 200 })
  public nome?: string

  @Column({
    type: "enum",
    enum: Situacao,
    default: Situacao.RASCUNHO
})
  public situacao: string
  // public blocos: Bloco []
}