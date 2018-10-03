const PAGINAS = {
  // {id: 'TODOS', label: 'Todos', sublabel: ''},
  'portal.alm.serpro.gov.br': {label: 'Portal ALM', sublabel: 'https://portal.alm.serpro.gov.br'},
  'observatorio.dircl.serpro': {label: 'Observatório DIRCL', sublabel: 'https://observatorio.dircl.serpro'},
  'dedat.gitpages.serpro': {label: 'DEDAT GitPages', sublabel: 'https://dedat.gitpages.serpro'},
  'gitcorporativo.serpro': {label: 'SUPDE GitPages', sublabel: 'https://gitcorporativo.serpro/supde/SUPDE'}
}

const TIPOS_ARQUIVO = {
  // {id: 'TODOS', label: 'Todos', sublabel: ''},
  'web_page': {label: 'Páginas WEB'},
  'pdf': {label: 'PDFs'},
  'doc': {label: 'Documentos Texto'},
  'ppt': {label: 'Apresentações'},
  'xls': {label: 'Planilhas'},
  'outros': {label: 'Outros'}
}

const TIPO_FILTRO = {
  PAGINA: {tipo: 'host', label: 'Página'},
  TIPO_DOC: {tipo: 'type', label: 'Tipos de documentos'}
}

export { PAGINAS, TIPOS_ARQUIVO, TIPO_FILTRO }
