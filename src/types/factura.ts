import { IClient } from "./cliente"
import { IProcesso } from "./processo"

export interface IFacturaStore {
  clientId: string
  estado: string
  descricao: string
  desconto: number
  profileId: string
}

export interface IFactura {
  id: string
  clientId: string
  processosId: string[]
  estado: string
  descricao: string
  total: number
  desconto: number
  valorApagar: number
  valorEmFalta: number
  profileId: string

  createdAt: Date
  updatedAt: Date
}

export interface IFacturaShow {
  id: string
  clientId: string
  processosId: string[]

  estado: string
  descricao: string
  total: number
  desconto: number

  valorApagar: number
  valorEmFalta: number
  profileId: string

  createdAt: Date
  updatedAt: Date

  client: IClient
  processos: IProcesso[]
}

export interface IFacturaList {
  id: string

  estado: string
  descricao: string
  total: number

  valorApagar: number
  valorEmFalta: number

  updatedAt: Date

  totalProcessos: number
  nome: string
}

export interface IFacturaUpdate {
  id: string
  clientId: string
  estado: string
  descricao: string
  total: number
  desconto: number
  valorApagar: number
  valorEmFalta: number
  profileId: string
}