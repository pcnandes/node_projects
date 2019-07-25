import { Repository } from 'typeorm'
import { Page, Pagination } from './types';

/**
 * Cria um SQL aplicando um operador a um atributo e um argumento
 * @param {string} field Campo
 * @param {string|number} suffix Sufixo do campo, para diferenciar no caso de repetição
 * @param {string} operator Operador a ser aplicado
 * @param {string} [where] Array com as condições unitárias
 * @param {object} params Objeto com os parâmetros e valores
 * @param {string|number} arg Argumento a ser colocado no parâmetro
 */
function oneParamSQL(field: string, suffix: string|number, operator: string, where: string[], params: any, arg: string|number) {
  where.push(`${field} ${operator} :${field}${suffix}`)
  params[`${field}${suffix}`] = arg
}

/**
 * Lista de operadores aplicados ao SQL
 */
const operators = {
  an: (field, suffix, where) => where.push(`:${field}${suffix}=any(${field})`),
  bw: (field, suffix, where, params, ...args) => {
    where.push(`${field} between :${field}${suffix}a and :${field}${suffix}b`)
    params[`${field}${suffix}a`] = args[0]
    params[`${field}${suffix}b`] = args[1]
  },
  eq: (field, suffix, where, params, ...args) => oneParamSQL(field, suffix, '=', where, params, args[0]),
  ew: (field, suffix, where, params, ...args) => oneParamSQL(field, suffix, 'like', where, params, `%${args[0]}`),
  ge: (field, suffix, where, params, ...args) => oneParamSQL(field, suffix, '>=', where, params, args[0]),
  gt: (field, suffix, where, params, ...args) => oneParamSQL(field, suffix, '>', where, params, args[0]),
  in: () => { throw new Error() },
  le: (field, suffix, where, params, ...args) => oneParamSQL(field, suffix, '<=', where, params, args[0]),
  lk: (field, suffix, where, params, ...args) => oneParamSQL(field, suffix, 'like', where, params, `%${args[0]}%`),
  lt: (field, suffix, where, params, ...args) => oneParamSQL(field, suffix, '<', where, params, args[0]),
  ne: (field, suffix, where, params, ...args) => oneParamSQL(field, suffix, '<>', where, params, args[0]),
  nl: (field, suffix, where) => where.push(`${field} is null`),
  nn: (field, suffix, where) => where.push(`${field} is not null`),
  rx: () => { throw new Error() },
  sw: (field, suffix, where, params, ...args) => oneParamSQL(field, suffix, 'like', where, params, `${args[0]}%`)
}

/**
 * 
 * @param {string} fields Campos a serem incluídos no select
 * @param {string} alias Apelido da tabela principal. Padrão = ''
 * @returns Retorna um objeto com dois atributos:
 *   - select: Lista com os nomes dos campos a serem incluídos
 *   - relations: Lista com os relacionamentos necessários
 */
export function parseSelect(fields: string, alias: string = ''): any {
  if (alias && alias !== '') {
    alias = alias + '.'
  }
  // |=separador, ()=agrupador, /=aninhados
  const result: any = {
    select: []
  }
  const stack = []
  let parenteses = 0
  let level = 0
  let attr = ''
  fields += '|'
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < fields.length; i++) {
    const c = fields[i]
    switch (c) {
      case '(':
        parenteses++
        break
      case '/':
        level++
        stack.push(attr)
        result.relations = result.relations || []
        result.relations.push(stack.join('.'))
        attr = ''
        break
      case ')':
        parenteses--
      case '|':
        if (attr !== '') {
          result.select.push((stack.length ? (stack.join('.') + '.') : alias) + attr)
          attr = ''
        }
        if (parenteses < level) {
          stack.pop()
          level--
        }
        break
      default: 
        attr += c
        break
    }
  }
  return result
}

/**
 * Interpreta a condição em um string para montar a cláusula WHERE da consulta
 * @param {string} condition Condição a ser interpretada
 * @param {string} alias Apelido da tabela principal. Padrão = ''
 * @returns Retorna um objeto com 2 atributos:
 *   - where: Cláusua WHERE em SQL
 *   - params: Parâmetros a serem injetados
 */
export function parseWhere(condition: string, alias: string = ''): any {
  if (!condition) {
    return {}
  }
  const regex = /([^\$,+]+)\$(eq|ne|lt|le|gt|ge|nl|nn|in|sw|ew|rx|bw|lk)([^\$,+]*)/g
  const params: any = {}
  const where: string[] = []
  let match = regex.exec(condition)
  let contador = 1
  // TODO: permitir combinações de AND() e OR[]
  while (match) {
    const field = (alias && alias !== '' ? (alias + '.') : '') + match[1]
    const operator = match[2]
    let value = [match[3]]
    if (['in', 'bw'].includes(operator)) {
      value = value[0].split(',')
    }
    operators[operator](field, contador++, where, params, ...value)
    match = regex.exec(condition)
  }
  return { where: where.join(' and '), params }
}

/**
 * 
 * @param {string} sort 
 * @param {string} alias
 * @returns
 */
export function parseOrderBy(sort: string, alias: string = ''): any {
  if (!sort) {
    return undefined
  }
  return sort
    .split(',')
    .reduce((obj, item) => {
      const direction = item.endsWith('-') ? 'DESC' : 'ASC'
      if (['+', '-'].includes(item.slice(-1))) {
        item = item.slice(0, -1)
      }
      obj[(alias && alias !== '' ? (alias + '.') : '') + item] = direction
      return obj
    }, {})
}

/**
 * Executa uma Query Personalizada
 * @param {Repository<T>} repository Repositório
 * @param {string} fields Campos a serem obtidos
 * @param {string} condition Condição WHERE a ser aplicada
 * @param {Pagination} pagination Paginação
 * @returns
 */
export async function queryPersonalizada<T>(repository: Repository<T>, fields: string, condition: string, { page, sort, size }: Pagination): Promise<Page<T>> {
  const alias = 'main'
  // calcula a posição do primeiro elemento
  const skip = (page - 1) * size
  // pega os atributos do select e os relacionamentos necessários
  const { select, relations } = parseSelect(fields, alias)
  // constrói a condição where
  const { where, params } = parseWhere(condition, alias)
  // constrói a estrutura do orderby
  const order = parseOrderBy(sort, alias) as {[P in keyof T]: 'ASC' | 'DESC'}
  // executa a consulta no banco de dados
  const builder = repository.createQueryBuilder(alias)
  builder.select(select.map(x => x.replace('.*', '')))
  // TODO: garantir que no select estejam as chaves de junção dos relacionamentos, atributos do where e orderby
  if (relations) {
    relations.forEach(relation => {
      builder.leftJoin(alias + '.' + relation, relation.split('.').join('_'))
    })
  }
  if (where && where.length > 0) {
    builder.where(where, params)
  }
  builder.skip(skip)
  builder.take(size)
  if (order) {
    builder.orderBy(order)
  }
  const [ result, count ] = await builder.getManyAndCount()
  // retorna uma página com o resultado
  size = Math.max(Math.min(size, count - skip))
  return { count, page, size, result }
}

  // TODO criar uma queryPersonalizada sem paginação