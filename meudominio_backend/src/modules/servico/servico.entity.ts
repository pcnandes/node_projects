import { PrimaryColumn, Column, Entity, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm'
import { Empregado } from '../empregado/empregado.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Servico {
  @PrimaryColumn()
  @ApiModelProperty()
  public codigo: string

  @Column()
  @ApiModelProperty()
  public multicliente: string

  @Column()
  @ApiModelProperty()
  public ug?: string

  @Column()
  @ApiModelProperty()
  public cliente?: string

  @Column()
  @ApiModelProperty()
  public mnemonico?: string

  @Column()
  @ApiModelProperty()
  public titulo?: string

  @UpdateDateColumn({ name: 'data_desativacao' })
  @ApiModelProperty({ type: 'string', format: 'date-time', example: '2018-11-21T06:20:32.232Z' })
  public dataDesativacao?: Date

  @ManyToOne(type => Empregado)
  @JoinColumn({name: 'gestor_tecnico'})
  @ApiModelProperty({type: Empregado})
  public gestorTecnico?: Empregado

  @ManyToOne(type => Empregado)
  @JoinColumn({name: 'gestor_negocio'})
  @ApiModelProperty({type: Empregado})
  public gestorNegocio?: Empregado

  @ManyToOne(type => Empregado)
  @JoinColumn({name: 'gestor_servico'})
  @ApiModelProperty({type: Empregado})
  public gestorServico?: Empregado

}