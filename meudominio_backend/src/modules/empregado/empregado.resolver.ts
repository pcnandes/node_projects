import { Args, Query, Resolver, Info } from '@nestjs/graphql'
import { Field, ObjectType, Int } from 'type-graphql';
import { Page } from '../../common/types';
import { Empregado } from './empregado.entity';
import { EmpregadoService } from './empregado.service';
import { GraphQLResolveInfo } from 'graphql';

@ObjectType()
export class PageOfEmpregado extends Page<Empregado> {
  @Field(type => [Empregado])
  public result: Empregado[]
}

@Resolver(of => Empregado)
export class EmpregadoResolver {
  constructor(private readonly service: EmpregadoService) {}

  @Query(returns => Empregado, { name: 'empregadoPorCPF' })
  public async empregadoPorCPF(
    @Args({ name: 'cpf', type: () => String }) cpf: number,
    @Info() info: GraphQLResolveInfo
  ): Promise<Empregado> {
    const infoField = info.fieldNodes[0];
    const { selectionSet } = infoField;
    const { selections } = selectionSet;
    const select = selections.map(sel => sel['name'].value).join('|')
    const { result: [empregado] } = await this.service.buscaPersonalizada(select, `cpf$eq${cpf}`)
    return empregado
  }
  
  @Query(returns => PageOfEmpregado, { name: 'empregadoPorLotacao' })
  public async empregadoPorLotacao(
    @Args({ name: 'lotacao', type: () => String }) lotacao: string,
    @Args({ name: 'page', type: () => Int, nullable: true }) page: number = 1,
    @Args({ name: 'size', type: () => Int, nullable: true }) size: number = 10,
    @Args({ name: 'sort', type: () => String, nullable: true }) sort: string = null,
    @Info() info: GraphQLResolveInfo
  ): Promise<Page<Empregado>> {
    const select = info
      .fieldNodes[0]
      .selectionSet
      .selections
      .filter(sel => sel['name'].value === 'result')
      .map(sel => sel['selectionSet'].selections
        .map(sub => sub['name'].value)
        .join('|')
      )[0] || 'nome'
    const result = await this.service.buscaPersonalizada(select, `lotacao$sw${lotacao}`, { page, size, sort })
    return result
  }
}