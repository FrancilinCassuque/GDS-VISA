'use server'

import { IService, IServiceShow } from "@/types"
import prisma from "../prisma.index"
import { redirect } from "next/navigation"

export async function ServicoStore(servico: Omit<IService, 'id'>): Promise<string | Error> {
  'use server'
  try {
    const novoServico = await prisma.servico.create({
      data: {
        descricao: servico.descricao,
        preco: servico.preco,
        tipo: servico.tipo.toUpperCase(),
        userId: servico.userId,
        nome: servico.nome
      }
    })

    if (!(novoServico instanceof Error)) {
      const userName = await prisma.user.findUnique({
        where: {
          id: novoServico.userId
        }
      })

      await prisma.notificacao.create({
        data: {
          mensagem: `${userName?.name} adicionou novo Serviço`,
          eventId: novoServico.id,
          tipo: 'servico',
          visto: false,
        }
      })

      return novoServico.id
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error ao Resgistrar')
  }
}

export async function ServicoIndex(): Promise<IService[] | Error> {
  'use server'
  try {
    const servicos = await prisma.servico.findMany()

    if (!(servicos instanceof Error)) {
      return servicos
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error ao Resgistrar')
  }
}

export async function ServicoShow(id: string): Promise<IServiceShow | Error> {
  'use server'
  try {
    const servico = await prisma.servico.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        user: true
      }
    })

    if (!(servico instanceof Error)) {
      return servico
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error ao Resgistrar')
  }
}

export async function ServicoUpdate(servicoDate: IService): Promise<IService | Error> {
  'use server'
  try {
    const servico = await prisma.servico.update({
      where: {
        id: servicoDate.id
      },
      data: {
        descricao: servicoDate.descricao,
        userId: servicoDate.userId,
        preco: servicoDate.preco,
        tipo: servicoDate.tipo,
      }
    })

    if (!(servico instanceof Error)) {
      return servico
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error ao Resgistrar')
  }
}

export async function ServicoDelete(id: string): Promise<string | Error> {
  'use server'
  try {
    const servico = await prisma.servico.delete({
      where: {
        id
      }
    })

    if (!(servico instanceof Error)) {
      return servico.id
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error ao Resgistrar')
  }
}