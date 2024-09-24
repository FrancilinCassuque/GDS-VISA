'use server'

import { IProcesso, IProcessoStore } from "@/types"
import prisma from "../prisma.index"
import { revalidatePath } from "next/cache"
import { processoStore } from "@/store"
import { FacturaUpdateDeletedProcesso, FacturaUpdatePreco } from "../contas/facturaService"

export async function storeProcesso(processo: IProcessoStore): Promise<String | Error> {
  'use server'

  try {
    const processoNovo = await prisma.processo.create({
      data: {
        nomecompleto: processo.nomecompleto.toUpperCase(),
        descricao: processo.descricao,
        estado: processo.estado,
        tipo: processo.tipo,
        preco: processo.preco,
        passaport: processo.passaport,

        profileId: processo.profileId,
        clientId: processo.clientId,
      },

      // select: {
      //   id: true
      // }
    })

    processoStore.getState().add(processoNovo)
    revalidatePath('/auth/home')

    return processoNovo.id
  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao Criar registro.')
  }
}

export async function processoIndex(): Promise<IProcesso[] | Error> {
  'use server'
  try {
    const processos = await prisma.processo.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })

    // processoStore.getState().start(processos)
    // revalidatePath('/')

    return processos
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao listar registros')
  }
}

// async function UserClientes(userId: string): Promise<IClient[] | Error> {
//   'use server'
//   try {
//     const clients = await prisma.client.findMany({
//       where: {
//         userId
//       },
//       orderBy: {
//         updatedAt: "desc",
//       },
//     })
//     return clients
//   } catch (error) {
//     return new Error((error as { message: string }).message || 'Erro ao listar registros')
//   }
// }


export async function processoShow(id: string): Promise<IProcesso | Error> {
  'use server'
  try {
    const processo = await prisma.processo.findUniqueOrThrow({
      where: {
        id
      },
    })

    if (processo) {
      return processo
    }

    return new Error('Cliente não existe')

  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao buscar Registro')
  }
}

export async function processoUpdate(id: string, processo: IProcessoStore, precoAntigo: number): Promise<IProcesso | Error> {
  'use server'
  try {
    const processoEditado = await prisma.processo.update({
      where: {
        id
      },
      data: {
        ...processo
      }
    })

    if (processoEditado.preco != precoAntigo) {
      await FacturaUpdatePreco(processoEditado.clientId, processoEditado.preco, precoAntigo, processoEditado.id)
    }

    if (processo) {
      return processoEditado
    }

    return new Error('Cliente não existe')

  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao buscar Registro')
  }
}

export async function processoDelete(id: string): Promise<String | Error> {
  'use server'
  try {
    const processo = await prisma.processo.delete({
      where: {
        id: id
      }
    })

    await FacturaUpdateDeletedProcesso(processo.clientId, processo.id, processo.preco)

    if (processo) {
      return processo.id
    }

    return new Error('Processo não Encontrada')

  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao Apagar Registro')
  }
}

