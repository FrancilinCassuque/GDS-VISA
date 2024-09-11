import { IProcesso } from "./processo"
import { IUser } from "./user"

export interface IClient {
  id: string
  userId: string
  telefone: string
  nomecompleto: string
  descricao: string | null
  passaport: string | null

  createdAt: Date
  updatedAt: Date
}

export interface IClientStore {
  id: string
  userId: string
  telefone: string
  nomecompleto: string
  descricao: string
  passaport: string | null
}


export type TClientShow = {
  id: string
  userId: string
  telefone: string
  nomecompleto: string
  descricao: string | null
  passaport: string | null

  createdAt: Date
  updatedAt: Date

  processos: IProcesso[]

  user: IUser
}