import { ICasas, IProfile, IUser, IUserAuth, IUserProfileHome, TCasasList } from '../types'
import { create } from 'zustand'


type Auth = {
  user: IUser | null
  userauth: IUserAuth | undefined
  casas: ICasas[]
  profiles: IProfile[]
  startAuth: (user: IUserAuth) => void
  addCasas: (casa: ICasas) => void
  startCasas: (casasT: ICasas[]) => void
  startProfile: (profile: IProfile[]) => void
  addProfile: (perfil: IProfile) => void
  update: (user: IUser) => void
}

export const authStore = create<Auth>()((set) => ({
  user: null,
  userauth: undefined,
  casas: [],
  profiles: [],

  addCasas: (casa: ICasas) =>
    set((state) => ({
      casas: [...state.casas, casa]
    })),

  addProfile: (perfil: IProfile) =>
    set((state) => ({
      profiles: [...state.profiles, perfil]
    })),

  startCasas: (casasT: ICasas[]) =>
    set(() => ({
      casas: casasT
    })),

    startProfile: (profiles: IProfile[]) =>
      set(() => ({
        profiles: profiles
      })),

  startAuth: (user: IUserAuth) =>
    set(() => ({
      userauth: user
    })),

  update: (user: IUser) =>
    set(() => ({
      user: user
    }))
}))