export interface IClient {
  id: string
  userId: string
  telefone: string
  nomecompleto: string
  descricao: string | null
  passaport: string | null

  createdAt: Date
  updatedAt: Date

  // Processo Processo[]
  // User     User       @relation(fields: [userId], references: [id])
}