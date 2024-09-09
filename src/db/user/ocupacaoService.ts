'use server'

import prisma from "../prisma.index"

interface IUpdateUser {
  id: number
  funcao: string
  profileId: string
}

export async function ocupacaoCreate(formDara: Omit<IUpdateUser, 'id'>): Promise<Number | Error> {
  'use server'

  try {
    const ocupacao = await prisma.funcao.create({
      data: {
        ...formDara
      }
    })

    if (ocupacao.id) {
      return ocupacao.id
    }

    return new Error('Erro ao criar registro')

  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao criar registro')
  }
}

export async function ocupacaoUpdate(id: number, funcao: string): Promise<Number | Error> {
  'use server'

  try {
    const ocupacao = await prisma.funcao.update({
      where: {
        id
      },
      data: {
        funcao
      },

      select: {
        id: true
      }
    })

    if (ocupacao.id) {
      return ocupacao.id
    }

    return new Error('Erro ao Actualizar registro')

  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao Actualizar registro')
  }
}

// export async function ocupacaoIndex(page = 1): Promise<IUpdateUser[] | Error> {
//   'use server'

//   try {
//     const users = await prisma.ocupacao.findMany()

//     if (users) {
//       return users
//     }

//     return new Error('Usários não encontrados')
//   } catch (error) {
//     return new Error((error as { message: string }).message || 'Erro ao buscar usuários')
//   }
// }

// async function ocupacaoUpdate(user: IUpdateUser): Promise<string | Error> {
//   'use server'

//   try {
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: user.id
//       },
//       data: {
//         ...user
//       }
//     })

//     if (updatedUser) {
//       authStore.getState().update(updatedUser)
//       return updatedUser.id
//     }

//     return new Error('usuário não encontrado')
//   } catch (err) {
//     return new Error((err as { message: string }).message || 'Erro ao buscar Usuário')
//   }
// }
