// Home types

export interface ICasaStore {
  id?: string
  name?: string
  quarto?: string
  sala?: string
  casadebanho?: string
  cozinha?: string
  quintal?: string
  tipo?: string
  images?: any[]
  descricao?: string

  rua?: string
  userEmail?: string
  bairro?: string
  comuna?: string
  municipio?: string
  provincia?: string
  pais?: string
}
export interface ICasas {
  id: string
  name: string | null
  descricao: string | null
  published: boolean | null
  quarto: string
  sala: string
  casadebanho: string
  cozinha: string
  quintal: string
  tipo: string
  images: any[]

  address: {
    id: number
    rua: string
    bairro: string
    comuna: string
    municipio: string
    provincia: string
    pais: string
    casaId: string | null
    profileId: string | null
    createdAt: Date
    updatedAt: Date
  }[]

  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface ICasasList{
  id: string
  name: string | null
  published: boolean | null
  tipo: string

  // updatedAt: Date
}

export type TCasasList = {
  data: ICasas[],
  tatal: number
}

export type TCasaShow = {
  id: string
  name: string | null
  descricao: string | null
  published: boolean | null
  quarto: string
  sala: string
  casadebanho: string
  cozinha: string
  quintal: string
  tipo: string
  images: any[]
  address: {
    id: number
    rua: string
    bairro: string
    comuna: string
    municipio: string
    provincia: string
    pais: string
    casaId: string | null
    profileId: string | null
    createdAt: Date
    updatedAt: Date
  }[]
  user: {
    id: string
    email: string
    name: string | null
    image: string | null
  }

  userId: string
  createdAt: Date
  updatedAt: Date
}


export interface IEnderecoStore {
  rua: string
  userEmail: string
  bairro: string
  comuna: string
  municipio: string
  provincia: string
  pais: string
}

export interface IEnderecoShow {
  id: number
  rua: string
  bairro: string
  comuna: string
  municipio: string
  provincia: string
  pais: string
  profileId: string | null
  createdAt: Date
  updatedAt: Date
}