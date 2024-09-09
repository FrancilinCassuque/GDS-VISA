import { create } from 'zustand'
import { IClient } from '../types'


type Casas = {
  clientes: IClient[]
  total: number
  add: (casa: IClient) => void
  start: (casas: IClient[] | []) => void
}

export const ClientStore = create<Casas>()((set) => ({
  clientes: [],
  total: 0,
  add: (cliente: IClient) =>
    set((state) => ({
      clientes: [...state.clientes, cliente]
    })),

  start: (casas: IClient[] | []) =>
    set(() => ({
      casas: casas,
      total: casas.length
    }))
}))