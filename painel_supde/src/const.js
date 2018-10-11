const OPERADOR = {
  'EXIST': 'existe',
  'BETWEEN': 'entre',
  'EQUALS': 'igual a',
  'GREATER': 'maior que',
  'LOWER': 'menor que',
  'LIKE': 'semelhante à',
  'CONTAINS': 'contém',
  'START': 'começa com',
  'END': 'termina com',
  'IN': 'pertence à'
}

const PERFIL = {
  'ADMINISTRADOR': 'Administrador',
  'HABILITADOR': 'Habilitador',
  'SERPRO': 'SERPRO',
  'SUPERINTENDENTE': 'Superintendente',
  'GERENTE': 'Gerente',
  'CHEFIA': 'Chefia',
  'APOIO_GERENTE': 'Apoio ao Gerente',
  'APOIO_SUPERINTENDENTE': 'Apoio ao Superintendente',
  'APOIO_CHEFIA': 'Apoio à Chefia',
  'DIRETORIA': 'Diretoria',
  'IRRESTRITO': 'Irrestrito',
  'URC': 'URC'
}

const EXIBICAO = {
  'formulario': 'Formulário',
  'indicador': 'Indicador',
  'grafico-area': 'Gráfico de Área',
  'grafico-barra': 'Gráfico de Barras',
  'grafico-bolha': 'Gráfico de Bolhas',
  'grafico-dispersao': 'Gráfico de Dispersão',
  'grafico-linha': 'Gráfico de Linhas',
  'grafico-pizza': 'Gráfico de Pizza',
  'grafico-misto': 'Gráfico Misto',
  'multi-dimensional': 'Gráfico Multi-Dimensional',
  'grafico-radar': 'Gráfico Radar',
  'grafico-rosca': 'Gráfico Rosca',
  'timeline': 'Linha de Tempo',
  'heatmap': 'Mapa de Calor',
  'tabela': 'Tabela'
}

const TIPO_DADO = {
  'INTEGER': 'Inteiro',
  'DOUBLE': 'Numérico',
  'PERCENT': 'Percentual',
  'STRING': 'Texto',
  'BOOLEAN': 'Lógico',
  'DATE': 'Data',
  'TIMESTAMP': 'Data/Hora',
  'URL': 'Link'
}

const LOCALE_AG_GRID = {
  // for filter panel
  page: 'Página',
  more: 'mais',
  to: 'de',
  of: 'até',
  next: 'Próximo',
  last: 'Último',
  first: 'Primeiro',
  previous: 'Anterior',
  loadingOoo: 'Carregando...',
  // for set filter
  selectAll: 'Selecionar Todos',
  searchOoo: 'daSearch...',
  blanks: 'daBlanc',
  // for number filter and text filter
  filterOoo: 'filtrar por...',
  applyFilter: 'daApplyFilter...',
  // for number filter
  equals: 'Igual',
  notEqual: 'Diferente',
  lessThanOrEqual: 'Menor ou igual',
  greaterThanOrEqual: 'Maior ou igual',
  inRange: 'Dentro de',
  lessThan: 'Fora de',
  greaterThan: 'maior que',
  // for text filter
  contains: 'Contém',
  notContains: 'Não contém',
  startsWith: 'Inicia com',
  endsWith: 'Termina com',
  // the header of the default group column
  group: 'Grupo',
  // tool panel
  columns: 'Colunas',
  // other
  noRowsToShow: 'Nenhum resultado encontado',
  // enterprise menu
  export: 'Expotar',
  csvExport: 'Exportar para CSV',
  excelExport: 'Exportar para XLS',
  // enterprise menu pinning
  pinLeft: '<<',
  pinRight: '>>',
  noPin: '<>',
  // standard menu
  copy: 'Copiar',
  ctrlC: 'ctrl n C',
  paste: 'Colar',
  ctrlV: 'ctrl n V'
}

export { OPERADOR, PERFIL, EXIBICAO, TIPO_DADO, LOCALE_AG_GRID }
