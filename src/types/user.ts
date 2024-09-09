// User types

import { ICasas } from "./home"

export interface userlogin {
  id: string
  email: string
  password: string
}

export type IUserProfileHome = {
  id: string
  name: string | null
  email: string
  image: string | null
  password: string | null
  emailVerified: Date | null

  profile: IProfile[]

  createdAt: Date
  updatedAt: Date
}

export interface IUser {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  password: string | null
  createdAt: Date
  updatedAt: Date
}

export interface IProfile {
  id: string
  nome: string
  Apelido: string;
  genero: string
  pais: string | null
  bio: string | null
  userId: string
  telefone: string

  identidades?: {
    id: string,
    numero: string,
    tipo: string
  }[]

  createdAt: Date
  updatedAt: Date
}

export interface IProfileStore {
  pais: string
  nome: string
  apelido: string
  numero: string
  tipo: string
  genero?: string
  telefone: string
}


export interface IUserAuth {
  id: string
  name: string | null
  email: string
  image: string | null
  password: string | null
  pessoa?: {
    id: string
    nome: string
    Apelido: string
    genero: string
    pais: string | null
    bio: string | null
    telefone: string

    address: {
      id: number
      rua: string
      bairro: string
      comuna: string
      municipio: string
      provincia: string
      pais: string
    }

    identidade?: {
      id: string,
      numero: string,
      tipo: string
    }

    funcoes?: {
      id: number,
      funcao: string
    }

  }

}

export interface IUserShow {
  id: string
  name: string | null
  email: string
  image: string | null
  password: string | null
  pessoa?: {
    id: string
    nome: string
    Apelido: string
    genero: string
    pais: string | null
    bio: string | null
    telefone: string

    address: {
      id: number
      rua: string
      bairro: string
      comuna: string
      municipio: string
      provincia: string
      pais: string
    }

    identidade?: {
      id: string,
      numero: string,
      tipo: string
    }

    funcao?: {
      id: number,
      funcao: string
    }
  },

  // casas: ICasas[]
}

