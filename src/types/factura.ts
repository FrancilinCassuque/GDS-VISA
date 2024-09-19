import { IClient } from "./cliente";

export interface IFacturaStore {
  clientId: string
  estado: string
  descricao: string
  desconto: number
  agenteId: string
}