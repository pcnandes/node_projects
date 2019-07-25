import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'
import { Field, InputType, ObjectType } from 'type-graphql'

@InputType()
export class Pagination {
  @Field({defaultValue: 1})
  @ApiModelPropertyOptional()
  public page?: number = 1
  @Field({defaultValue: 10})
  @ApiModelPropertyOptional()
  public size?: number = 10
  @Field({nullable: true})
  @ApiModelPropertyOptional()
  public sort?: string
}

@ObjectType()
export class Page<T> {
  @ApiModelProperty()
  @Field()
  public page: number
  @ApiModelProperty()
  @Field()
  public size: number
  @ApiModelProperty()
  @Field()
  public count: number
  @ApiModelProperty({isArray: true})
  public result: T[]
}