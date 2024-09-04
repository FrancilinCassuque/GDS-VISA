'use server'

import { IEnderecoShow, IEnderecoStore } from "@/types"
import prisma from "../prisma.index"

export async function EnderecoStore(address: IEnderecoStore, profId = '', homeId = ''): Promise<IEnderecoShow | Error> {
  'use server'

  try {
    const newAddress = await prisma.address.create({
      data: {
        ...address,
        profileId: profId
      }
    })

    if (newAddress) {
      return newAddress
    }

    return new Error('Residência não Encontrada')

  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao Apagar Registro')
  }
}
