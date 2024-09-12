import { create } from 'zustand'
import { IClient } from '../types'


type clientes = {
  clientes: IClient[]
  total: number
  add: (cliente: IClient) => void
  start: (clientes: IClient[] | []) => void
}

export const ClientStore = create<clientes>()((set) => ({
  clientes: [],
  total: 0,
  add: (cliente: IClient) =>
    set((state) => ({
      clientes: [...state.clientes, cliente]
    })),

  start: (clientes: IClient[] | []) =>
    set(() => ({
      clientes: clientes,
      total: clientes.length
    }))
}))