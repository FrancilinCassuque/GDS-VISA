import { IProcesso } from "./processo"
import { IUser } from "./user"

export interface IClient {
  id: string
  userId: string
  telefone: string
  nomecompleto: string
  descricao: string | null

  createdAt: Date
  updatedAt: Date
}

export interface IClientStore {
  id: string
  userId: string
  telefone: string
  nomecompleto: string
  descricao: string
}


export type TClientShow = {
  id: string
  userId: string
  telefone: string
  nomecompleto: string
  descricao: string | null

  createdAt: Date
  updatedAt: Date

  processos: IProcesso[]

  user: IUser
}