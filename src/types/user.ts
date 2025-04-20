// User types
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

  identidade?: {
    id: string,
    numero: string,
    tipo: string
  }

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

export interface IUserAuth extends IUser {
  pessoa: {
    id: string;
    nome: string;
    Apelido: string;
    genero: string;
    pais: string;
    telefone: string;
    bio: string;
    identidade: {
      id: string;
      numero: string;
      tipo: string;
    };
    funcao: {
      id: number;
      funcao: string;
    };
    address: {
      id: number;
      rua: string;
      bairro: string;
      comuna: string;
      municipio: string;
      provincia: string;
      pais: string;
    };
  };
}


export interface IUserShow extends IUserAuth {
  // casas: Casa[]; // Adicione o tipo correto para casas, se necessário
}

export interface IUpdateUser {
  id: string;
  name: string | null;
  email: string;
  image?: string;
}

export interface userlogin {
  id: string;
  email: string;
  password: string;
}