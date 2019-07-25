import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'
import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Empregado {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public cpf?: number

  @Column({ type: 'integer' })
  @Field()
  @ApiModelProperty()
  public matricula?: number

  @Column()
  @Field()
  @ApiModelProperty()
  public nome?: string

  @Column()
  @Field()
  @ApiModelProperty()
  public lotacao?: string

  @Column()
  @Field({ nullable: true })
  @ApiModelPropertyOptional()
  public ramal?: string

  @Column()
  @Field({ nullable: true })
  @ApiModelPropertyOptional()
  public email?: string

  @Column({ type: 'date', name: 'data_desligamento' })
  @ApiModelPropertyOptional({type: 'string', format: 'date', example: '2018-12-31'})
  public dataDesligamento?: Date

  @Column({ type: 'smallint' })
  @Field({ nullable: true })
  @ApiModelPropertyOptional()
  public jornada?: number

  @Column()
  @Field({ nullable: true })
  @ApiModelPropertyOptional()
  public teletrabalhador?: boolean

  @Column()
  @Field({ nullable: true })
  @ApiModelPropertyOptional()
  public funcao?: string

  @Column()
  @Field({ nullable: true })
  @ApiModelPropertyOptional()
  public cargo?: string

  @Column()
  @Field({ nullable: true })
  @ApiModelPropertyOptional()
  public foto?: string
}