import { IClient } from "./cliente"

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