import { INotificacao } from "@/types";
import prisma from "../prisma.index";

export async function NotificacaoUpdate(notificacaoId: string, estado: boolean): Promise<INotificacao | Error> {
  try {
    const notificacao = await prisma.notificacao.update({
      where: {
        id: notificacaoId
      },
      data: {
        visto: estado
      }
    })

    if (!(notificacao instanceof Error)) {
      return notificacao
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao Registrar.')
  }
}