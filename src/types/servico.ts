import { IUser } from "./user"


export interface IService {
  id: string
  tipo: string
  preco: number
  descricao: string
  userId: string
}

export interface IServiceShow {
  id: string
  tipo: string
  preco: number
  descricao: string
  user: IUser | undefined
  userId: string
}