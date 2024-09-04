'use server'

import { ICasas, ICasaStore, TCasaShow, TCasasList } from "@/types"
import prisma from "../prisma.index"
import { homeStore } from "@/store"
import { revalidatePath } from "next/cache"

async function CasaStore(casa: ICasaStore): Promise<String | Error> {
  'use server'
  try {
    const userAuth = await prisma.user.findUnique({
      where: {
        email: casa.userEmail
      },
      select: {
        id: true
      }
    })

    if (!userAuth) {
      return new Error('Usúario não logado')
    }

    const newCasa = await prisma?.casa.create({
      data: {
        name: casa?.name || '',
        quarto: casa?.quarto || '',
        sala: casa?.sala || '',
        cozinha: casa?.cozinha || '',
        casadebanho: casa?.casadebanho || '',
        descricao: casa?.descricao || '',
        quintal: casa?.quintal || '',
        tipo: casa?.tipo || '',
        images: casa?.images || [],
        userId: userAuth?.id || '',
        address: {
          create: {
            rua: casa?.rua || '',
            bairro: casa?.bairro || '',
            comuna: casa?.comuna || '',
            municipio: casa?.municipio || '',
            provincia: casa?.provincia || '',
            pais: casa?.pais || '',
            profileId: ' '
          }
        }
      },
      include: {
        address: true
      }
    })

    // homeStore.getState().add(newCasa)

    return newCasa.id
  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao Criar registro.')
  }
}

async function CasaIndex(page = 1): Promise<TCasasList | Error> {
  'use server'
  try {
    const totalCasas = await prisma.casa.findMany({
      include: {
        address: true
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

      homeStore.getState().start(casas)
      revalidatePath('/')
      return { data: casas, tatal: totalCount }
    }

    return new Error('Erro ao listar registros')
  } catch (error) {
    console.log(error)
    return new Error((error as { message: string }).message || 'Erro ao listar registros')
  }
}

async function UserCasas(userId: string, page = 1): Promise<TCasasList | Error> {
  'use server'
  try {
    const totalCasas = await prisma.casa.findMany({
      where: {
        userId: userId
      },
      include: {
        address: true
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


async function CasaShow(id: string): Promise<TCasaShow | Error> {
  'use server'
  try {
    const casa = await prisma.casa.findUniqueOrThrow({
      where: {
        id: id
      },
      include: {
        address: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          }
        }
      }
    })

    if (casa) {
      return casa
    }

    return new Error('Residência não existe')

  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao buscar Registro')
  }
}

async function CasaDelete(id: string): Promise<String | Error> {
  'use server'
  try {
    const casa = await prisma.casa.delete({
      where: {
        id: id
      }
    })

    if (casa) {
      return casa.id
    }

    return new Error('Residência não Encontrada')

  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao Apagar Registro')
  }
}

export { CasaStore, CasaIndex, CasaShow, CasaDelete, UserCasas }
