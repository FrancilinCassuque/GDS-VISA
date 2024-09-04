import { IUser } from "@/types"
import { create } from 'zustand'


type User = {
  users: IUser[]
  total: number
  add: (user: IUser) => void
  start: (users: IUser[] | []) => void
}

export const userStore = create<User>()((set) => ({
  users: [],
  total: 0,
  add: (user: IUser) =>
    set((state) => ({
      users: [...state.users, user]
    })),

  start: (users: IUser[] | []) =>
    set(() => ({
      users: users,
      total: users.length
    }))
}))