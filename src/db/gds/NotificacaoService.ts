import { INotificacao } from "@/types";


export async function NotificacaoUpdate(estado: boolean):Promise<INotificacao | Error> {
  try {
    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as {message:string}).message || 'Erro ao Registrar.')
  }
}