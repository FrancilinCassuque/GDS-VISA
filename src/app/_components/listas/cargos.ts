const gestao = [
  'Diretor Administrativo',
  'Gerente Administrativo',
  'Coordenador Administrativo',
  'Chefe de Escritório',
  'Administrador Geral',
  'Superintendente',
]

const Administrativo = [
  'Assistente Administrativo',
  'Auxiliar Administrativo',
  'Secretária Executiva',
  'Recepcionista',
  'Assistente de Escritório',
  'Auxiliar de Escritório',
]

const financas = [
  'Analista Financeiro',
  'Assistente Financeiro',
  'Tesoureiro',
  'Contador',
  'Analista de Contas a Pagar/Receber',
  'Cargos de Recursos Humanos:',
  'Analista de Recursos Humanos',
  'Assistente de Recursos Humanos',
  'Coordenador de RH',
  'Gerente de RH',
  'Recrutador',
  'Cargos de Compras e Logística:',
  'Gerente de Compras',
  'Analista de Compras',
  'Assistente de Compras',
  'Coordenador de Logística',
  'Analista de Logística',
]

const TI = [
  'Gerente de TI',
  'Analista de Sistemas',
  'Assistente de TI',
  'Coordenador de ',
]

const superLista = TI.concat(financas, Administrativo, gestao)

export const ListaDeCargos = {
  gestao,
  Administrativo,
  financas,
  TI,

  superLista
}