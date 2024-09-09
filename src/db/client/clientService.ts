'use server'

import { ICasas, IClient, IClientStore, TCasaShow, TCasasList, TClientShow } from "@/types"
import prisma from "../prisma.index"
import { homeStore } from "@/store"
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
    console.log(error)
    return new Error((error as { message: string }).message || 'Erro ao listar registros')
  }
}

async function UserClientes(userId: string): Promise<TCasasList | Error> {
  'use server'
  try {
    const totalCasas = await prisma.client.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    if (totalCasas) {
      const totalCount = totalCasas.length
      const end = page * 5
      const start = end - 5

      const casas = totalCasas.filter((casa: ICasas, index: number) => {
        if (index >= start && index <= end) {
          return casa
        }
      })
      return { data: casas, tatal: totalCount }
    }

    return new Error('Erro ao listar registros')
  } catch (error) {
    console.log(error)
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
        user: true,
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