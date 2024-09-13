'use server'

import { IProcessoStore } from "@/types"
import prisma from "../prisma.index"
import { revalidatePath } from "next/cache"
import { processoStore } from "@/store"
// import { redirect } from "next/navigation"

async function storeProcesso(processo: IProcessoStore): Promise<String | Error> {
  'use server'

  try {
    const processoNovo = await prisma.processo.create({
      data: {
        nomecompleto: processo.nomecompleto.toUpperCase(),
        descricao: processo.descricao,
        estado: processo.estado,
        tipo:processo.tipo,
        preco: processo.preco,
        passaport: processo.passaport,

        profileId: processo.profileId,
        clientId: processo.profileId,
      },

      // select: {
      //   id: true
      // }
    })

    processoStore.getState().add(processoNovo)
    revalidatePath('/auth/home')
    // redirect('')


    return processoNovo.id
  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao Criar registro.')
  }
}

// async function ClientIndex(): Promise<IClient[] | Error> {
//   'use server'
//   try {
//     const clientes = await prisma.client.findMany({
//       orderBy: {
//         updatedAt: "desc",
//       },
//     })

//     revalidatePath('/')

//     ClientStore.getState().start(clientes)

//     return clientes
//   } catch (error) {
//     return new Error((error as { message: string }).message || 'Erro ao listar registros')
//   }
// }

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


// async function ClientShow(id: string): Promise<TClientShow | Error> {
//   'use server'
//   try {
//     const client = await prisma.client.findUniqueOrThrow({
//       where: {
//         id
//       },

//       include: {
//         processos: true,
//         user: true
//       }
//     })

//     if (client) {
//       return client
//     }

//     return new Error('Cliente não existe')

//   } catch (err) {
//     return new Error((err as { message: string }).message || 'Erro ao buscar Registro')
//   }
// }

// async function ClientDelete(id: string): Promise<String | Error> {
//   'use server'
//   try {
//     const client = await prisma.client.delete({
//       where: {
//         id: id
//       }
//     })

//     if (client) {
//       return client.id
//     }

//     return new Error('Residência não Encontrada')

//   } catch (err) {
//     return new Error((err as { message: string }).message || 'Erro ao Apagar Registro')
//   }
// }

// ClientIndex, UserClientes, ClientShow, ClientDelete

export { storeProcesso }