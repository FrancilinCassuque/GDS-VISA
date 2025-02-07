import { IClient } from "./cliente"
import { IProcesso } from "./processo"

export interface IFacturaStore {
  clientId: string
  estado: string
  descricao: string
  desconto: number
  profileId: string
  valorApagar?:number
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

export interface IFacturaPrint {
  id: string
  cliente: {
    id:string
    nome: string,
    telefone: string
  }
  processos: IProcesso[]
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