export interface IProcesso {
  id: string
  tipo: string
  estado: string
  descricao: string
  nomecompleto: string
  passaport: string
  
  clientId: string
  profileId: string
  
  createdAt: Date
  updatedAt: Date
}

export interface IProcessoStore {
  tipo: string
  preco: number
  estado: string
  descricao: string
  anexos: string[]
  nomecompleto: string
  passaport: string
  profileId: string
  clientId: string
}