import { create } from 'zustand'
import { IProcesso } from '../types'


type processos = {
  processos: IProcesso[]
  total: number
  add: (processo: IProcesso) => void
  start: (processos: IProcesso[] | []) => void
}

export const processoStore = create<processos>()((set) => ({
  processos: [],
  total: 0,
  add: (processo: IProcesso) =>
    set((state) => ({
      processos: [...state.processos, processo]
    })),

  start: (processos: IProcesso[] | []) =>
    set(() => ({
      processos: processos,
      total: processos.length
    }))
}))