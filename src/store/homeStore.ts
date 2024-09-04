import { create } from 'zustand'
import { ICasas } from '../types'


type Casas = {
  casas: ICasas[]
  total: number
  add: (casa: ICasas) => void
  start: (casas: ICasas[] | []) => void
}

export const homeStore = create<Casas>()((set) => ({
  casas: [],
  total: 0,
  add: (casa: ICasas) =>
    set((state) => ({
      casas: [...state.casas, casa]
    })),

  start: (casas: ICasas[] | []) =>
    set(() => ({
      casas: casas,
      total: casas.length
    }))
}))