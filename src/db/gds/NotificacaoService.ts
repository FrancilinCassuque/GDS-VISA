'use server'

import { INotificacao } from "@/types";
import prisma from "../prisma.index";

export async function NotificacaoUpdate(notificacaoId: string, estado: boolean): Promise<INotificacao | Error> {
  'use server'  
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

export async function NotificacaoIndex(): Promise<INotificacao[] | Error> {
  'use server'
  try {
    const notificacoes = await prisma.notificacao.findMany()

    if (!(notificacoes instanceof Error)) {
      return notificacoes
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao Registrar.')
  }
}

export async function NotificacaoShow(id:string): Promise<INotificacao | Error> {
  'use server'
  try {
    const notificacao = await prisma.notificacao.findUniqueOrThrow({
      where:{
        id
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

export async function NotificacaoDelete(id:string): Promise<INotificacao | Error> {
  'use server'
  try {
    const notificacao = await prisma.notificacao.delete({
      where:{
        id
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