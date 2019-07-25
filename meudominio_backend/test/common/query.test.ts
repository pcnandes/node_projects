// tslint:disable-next-line: no-implicit-dependencies
import 'jest'
import { parseOrderBy, parseSelect, parseWhere } from '../../src/common/query'

describe('common/query', () => {
  describe('parseSelect', () => {
    it('atributos', () => {
      const result = parseSelect('nome|lotacao|email|matricula')
      expect(result).toStrictEqual({
        select: ['nome', 'lotacao', 'email', 'matricula']
      })
    })
    it('atributos aninhados', () => {
      const result = parseSelect('nome|gestor|subdominio/nome')
      expect(result).toStrictEqual({
        relations: ['subdominio'],
        select: ['nome', 'gestor', 'subdominio.nome']
      })
    })
    it('atributos aninhados e agrupados', () => {
      const result = parseSelect('nome|sistema/(nome|codigo)')
      expect(result).toStrictEqual({
        relations: ['sistema'],
        select: ['nome', 'sistema.nome', 'sistema.codigo']
      })
    })
    it('atributos aninhados em vários níveis', () => {
      const result = parseSelect('nome|subdominio/(nome|sistema/(nome|codigo))')
      expect(result).toStrictEqual({
        relations: ['subdominio', 'subdominio.sistema'],
        select: ['nome', 'subdominio.nome', 'subdominio.sistema.nome', 'subdominio.sistema.codigo']
      })
    })
  })

  describe('parseWhere', () => {
    it('condição simples', () => {
      const { where, params } = parseWhere('lotacao$swDIDES/COADM')
      expect(where).toBe('lotacao like :lotacao1')
      expect(params).toStrictEqual({
        lotacao1: 'DIDES/COADM%'
      })
    })
    it('condição multipla', () => {
      const { where, params } = parseWhere('jornada$eq480+funcao$nn+lotacao$swDIDES')
      expect(where).toBe('jornada = :jornada1 and funcao is not null and lotacao like :lotacao3')
      expect(params).toStrictEqual({
        jornada1: '480',
        lotacao3: 'DIDES%'
      })
    })
  })

  describe('parseOrderBy', () => {
    it('ordenacao simples', () => {
      const result = parseOrderBy('nome')
      expect(result).toStrictEqual({
        nome: 'ASC'
      })
    })
    it('ordenação multipla', () => {
      const result = parseOrderBy('lotacao+,nome-')
      expect(result).toStrictEqual({
        lotacao: 'ASC',
        nome: 'DESC'
      })
    })
  })
})