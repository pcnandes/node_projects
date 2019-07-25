import { ApiModelProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Empregado } from '../empregado/empregado.entity';

@Entity()
export class Usuario {
  @PrimaryColumn()
  @ApiModelProperty()
  public cpf?: number

  // [ADMIN, CADASTRADOR_DOMINIO]
  @Column({name: 'perfis', type: 'character varying', array: true})
  @ApiModelProperty()
  @Allow()
  public perfis?: string[]
  
  // DOMINIOS ONDE TEM PERMISSAO DE ALTERACAO 
  @Allow()
  public editorDominio?: string[]

  @OneToOne(type => Empregado)
  @JoinColumn({name: 'cpf'})
  @ApiModelProperty({type: Empregado})
  public empregado?: Empregado

  @CreateDateColumn({ name: 'data_criacao' })
  public dataCriacao?: Date

  @Column({name: 'criado_por', type: 'bigint'})
  public criadoPor?: number

  @UpdateDateColumn({ name: 'data_alteracao' })
  public dataAlteracao?: Date
  
  @Column({name: 'alterado_por', type: 'bigint'})
  public alteradoPor?: number
}
