'use server'

import { IClient, IClientStore, TClientShow } from "@/types"
import prisma from "../prisma.index"
import { revalidatePath } from "next/cache"

async function ClientStore(client: Omit<IClientStore, 'id'>): Promise<String | Error> {
  'use server'
  try {
    const clientNovo = await prisma.client.create({
      data: {
        ...client,
      }
    })

    return clientNovo.id
  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao Criar registro.')
  }
}

async function ClientIndex(): Promise<IClient[] | Error> {
  'use server'
  try {
    const clientes = await prisma.client.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })


    revalidatePath('/')
    return clientes
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao listar registros')
  }
}

async function UserClientes(userId: string): Promise<IClient[] | Error> {
  'use server'
  try {
    const clients = await prisma.client.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
    return clients
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao listar registros')
  }
}


async function ClientShow(id: string): Promise<TClientShow | Error> {
  'use server'
  try {
    const client = await prisma.client.findUniqueOrThrow({
      where: {
        id
      },

      include: {
        processos: true,
        user: true
      }
    })

    if (client) {
      return client
    }

    return new Error('Cliente não existe')

  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao buscar Registro')
  }
}

async function ClientDelete(id: string): Promise<String | Error> {
  'use server'
  try {
    const client = await prisma.client.delete({
      where: {
        id: id
      }
    })

    if (client) {
      return client.id
    }

    return new Error('Residência não Encontrada')

  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao Apagar Registro')
  }
}

export { ClientStore, ClientIndex, UserClientes, ClientShow, ClientDelete }