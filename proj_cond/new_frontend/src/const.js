const ID_TOKEN = 'SINDCON_TOKEN'

const ITENS_MENU = {
  'HOME': 'home',
  'CONDOMINIO': { icone: 'location_city', uri: '', label: '' },
  'BLOCO': { icone: 'business', uri: 'business', label: '' },
  'UNIDADE': 'unidade'
}

const PERFIS = { ADMINISTRADOR: 'ADMINISTRADOR', SINDICO: 'SINDICO', SUBSINDICO: 'SUB-SINDICO', FUNCIONARIO: 'FUNCIONARIO', MORADOR: 'MORADOR' }

const TIPO_MORADOR = { MORADOR: 'Morador', LOCADOR: 'Locador', LOCATARIO: 'Locatário' }

const TIPO_VEICULO = { CARRO: 'Carro', MOTO: 'Moto', PICKUP: 'Pickup', VAN: 'Van' }

const CORES = { AZUL: 'Azul', AMARELO: 'Amarelo', BEGE: 'Bege', BRANCO: 'Branco', CINZA: 'Cinza', GRAFITE: 'Grafite', LARANJA: 'Laranja', MARROM: 'Marrom', PRETO: 'Preto', ROSA: 'Rosa', VERMELHO: 'Vermelho', VERDE: 'Verde', VINHO: 'Vinho' }

const TIPO_DOCUMENTO_COLABORADOR = { RG: 'RG', CPF: 'CPF', CNPJ: 'CNPJ' }

export { ID_TOKEN, ITENS_MENU, PERFIS, TIPO_MORADOR, TIPO_VEICULO, CORES, TIPO_DOCUMENTO_COLABORADOR }
