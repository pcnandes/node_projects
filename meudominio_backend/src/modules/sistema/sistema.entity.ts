import { ApiModelProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, Matches } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Dominio } from '../dominio/dominio.entity';

@Entity()
export class Sistema {
  @PrimaryGeneratedColumn({ type: 'uuid' })
  @ApiModelProperty()
  public id?: string

  @Column()
  @ApiModelProperty()
  @IsNotEmpty({message: 'Informe o identificador'})
  @Matches(/^[A-Z][A-Z,\-,0-9]{1,18}[A-Z,0-9]$/, {message: 'Identificador inválido'})
  public identificador: string

  @Column()
  @ApiModelProperty()
  @IsNotEmpty({message: 'Informe a sigla'})
  public sigla: string

  @Column()
  @ApiModelProperty()
  @IsNotEmpty({message: 'Informe o nome'})
  public nome: string

  @Column()
  @ApiModelProperty()
  @Allow()
  public descricao?: string

  @Column()
  @ApiModelProperty()
  public situacao?: string

  @Column({name: 'linha_negocio'})
  @ApiModelProperty()
  @Allow()
  public linhaNegocio?: string

  @Column()
  @ApiModelProperty()
  @Allow()
  public producao?: boolean

  @Column({name: 'codigo_servico_principal', type: 'integer'})
  @ApiModelProperty()
  @IsNotEmpty({message: 'Informe o Código de Serviço Principal'})
  public codigoServicoPrincipal?: number
  
  @Column({name: 'codigo_servico_outros', type: 'integer', array: true})
  @ApiModelProperty()
  @Allow()
  public codigoServicoOutros?: number[]

  @Column({name: 'grupos_govi', type: 'character varying', array: true})
  @ApiModelProperty()
  @Allow()
  public gruposGovi?: string[]
  
  @Column()
  @ApiModelProperty()
  @Allow()
  public solucao?: string
  
  @CreateDateColumn({ name: 'data_criacao' })
  public dataCriacao?: Date

  @Column({name: 'criado_por', type: 'bigint'})
  public criadoPor?: number

  @UpdateDateColumn({ name: 'data_alteracao' })
  public dataAlteracao?: Date
  
  @Column({name: 'alterado_por', type: 'bigint'})
  public alteradoPor?: number

  @ManyToOne(type => Dominio, dominio => dominio.sistemas)
  @JoinColumn({name: 'dominio'})
  @ApiModelProperty({type: Dominio})
  @Allow()
  public dominio?: Dominio

}