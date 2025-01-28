import { create } from 'zustand'
import { IFacturaList } from '../types'


type facturas = {
  facturas: IFacturaList[]
  total: number
  add: (processo: IFacturaList) => void
  start: (facturas: IFacturaList[] | []) => void
}

export const facturastore = create<facturas>()((set) => ({
  facturas: [],
  total: 0,
  add: (processo: IFacturaList) =>
    set((state) => ({
      facturas: [...state.facturas, processo]
    })),

  start: (facturas: IFacturaList[] | []) =>
    set(() => ({
      facturas: facturas,
      total: facturas.length
    }))
}))