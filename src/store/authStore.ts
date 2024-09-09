import { ICasas, IProfile, IUser, IUserAuth, IUserProfileHome, TCasasList } from '../types'
import { create } from 'zustand'


type Auth = {
  userauth: IUserAuth | undefined
  // casas: ICasas[]
  startAuth: (user: IUserAuth) => void
  // addCasas: (casa: ICasas) => void
  // startCasas: (casasT: ICasas[]) => void
}

export const authStore = create<Auth>()((set) => ({
  userauth: undefined,
  // casas: [],

  // addCasas: (casa: ICasas) =>
  //   set((state) => ({
  //     casas: [...state.casas, casa]
  //   })),

  // startCasas: (casasT: ICasas[]) =>
  //   set(() => ({
  //     casas: casasT
  //   })),

  startAuth: (user: IUserAuth) =>
    set(() => ({
      userauth: user
    }))
}))