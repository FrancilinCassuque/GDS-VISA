export interface IFuncao {
  id: number
  funcao: string
  profileId: string
}

export interface IFuncaoVencimento {
  id: number
  funcaoid: number
  base: number
  abonos: [
    {
      id: number
      descricao: string,
      valor: number
    }
  ]
}