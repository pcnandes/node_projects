import { ApiModelProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, ValidateIf } from 'class-validator';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import { Empregado } from '../empregado/empregado.entity';
import { Sistema } from '../sistema/sistema.entity';

@Entity()
export class Dominio {
  @PrimaryGeneratedColumn({ type: 'uuid' })
  @ApiModelProperty()
  public id?: string

  @ManyToOne(type => Dominio)
  @JoinColumn({name: 'pai'})
  @ApiModelProperty({type: Dominio})
  @Allow()
  public pai?: Dominio

  @Column()
  @ApiModelProperty()
  @IsNotEmpty({message: 'Informe o código'})
  public codigo?: string

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
  @Allow()
  public nivel?: number

  @ManyToOne(type => Empregado)
  @JoinColumn({name: 'gestor_dominio', referencedColumnName: 'cpf'})
  @ApiModelProperty({type: Empregado})
  @ValidateIf(o => !o.pai || !o.pai.id)
  @IsNotEmpty({message: 'Informe o gestor de domínio'})
  public gestorDominio?: Empregado

  @ManyToOne(type => Empregado)
  @JoinColumn({name: 'gestor_negocio', referencedColumnName: 'cpf'})
  @ApiModelProperty({type: Empregado})
  @ValidateIf(o => !o.pai || !o.pai.id)
  public gestorNegocio?: Empregado

  @Column({name: 'ug_dominio'})
  @ApiModelProperty()
  @ValidateIf(o => !o.pai || !o.pai.id)
  @IsNotEmpty({message: 'Informe a UG do domínio'})
  public ugDominio?: string

  @Column({name: 'ug_negocio'})
  @ApiModelProperty()
  @ValidateIf(o => !o.pai || !o.pai.id)
  @IsNotEmpty({message: 'Informe a UG do negócio'})
  public ugNegocio?: string

  @Column()
  @ApiModelProperty()
  public situacao: string

  @Column({name: 'editor_dominio', type: 'bigint', array: true})
  @Allow()
  public editorDominio?: number[]

  @OneToMany(type => Dominio, subdominio => subdominio.pai)
  @ApiModelProperty({type: Dominio, isArray: true})
  public subdominios?: Dominio[]

  @OneToMany(type => Sistema, sistema => sistema.dominio)
  @ApiModelProperty({type: Sistema, isArray: true})
  public sistemas?: Sistema[]

  @CreateDateColumn({ name: 'data_criacao' })
  public dataCriacao?: Date

  @Column({name: 'criado_por'})
  public criadoPor?: number

  @UpdateDateColumn({ name: 'data_alteracao' })
  public dataAlteracao?: Date
  
  @Column({name: 'alterado_por'})
  public alteradoPor?: number
}