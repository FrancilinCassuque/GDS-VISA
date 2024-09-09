export interface IProcesso {
  id: string
  tipo: string
  estado: string
  clientId: string
  profileId: string
  descricao: string | null

  createdAt: Date
  updatedAt: Date
}