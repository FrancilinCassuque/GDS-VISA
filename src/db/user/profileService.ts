'use server'

import { IProfile, IProfileStore } from "@/types"
import prisma from '../prisma.index'



export async function profileIndex(): Promise<IProfile[] | Error> {
  'use server'

  try {
    const perfis = await prisma.profile.findMany()

    if (perfis instanceof Error) {
      return new Error('Erro ao buscar todos os Perfis')
    }
    return perfis

  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao buscar Registros')
  }
}

export async function userProfiles(userId: string): Promise<IProfile[] | Error> {
  'use server'

  try {
    const userProfiles = await prisma.profile.findMany({
      where: {
        userId: userId
      }
    })

    if (userProfiles instanceof Error) {
      return new Error('Error ao buscar perfis do usuário')
    }

    return userProfiles
  } catch (error) {
    return new Error((error as { message: string }).message || 'Error ao buscar Registro')
  }
}

export async function storeProfile(profile: IProfileStore, userId: string): Promise<string | Error> {
  'use server'

  try {
    const perfil = await prisma.profile.create({
      data: {
        nome: profile.nome,
        Apelido: profile.apelido,
        pessoatipo: profile.pessoatipo,
        genero: profile.genero || 'Outro',
        telefone: profile.telefone,
        pais: profile.pais,
        userId: userId,
        bio: '',
        identidades: {
          create: {
            numero: profile.numero,
            tipo: profile.tipo
          }
        }
      },
      select: {
        id: true
      }
    })

    if (perfil instanceof Error) {
      return new Error('Error ao registrar perfil.')
    }

    return perfil.id

  } catch (error) {
    return new Error((error as { message: string }).message || 'Error ao crear registro.')
  }
}

export async function updateProfile(profile: IProfileStore, profileId: string, identidadeId = ''): Promise<string | Error> {
  'use server'

  try {
    const perfil = await prisma.profile.update({
      where: {
        id: profileId
      },

      data: {
        nome: profile.nome,
        Apelido: profile.apelido,
        pessoatipo: profile.pessoatipo,
        genero: profile.genero || 'Outro',
        telefone: profile.telefone,
        pais: profile.pais,
      },
    })

    const identidade = await prisma.identidade.update({
      where: {
        id: identidadeId
      },
      data: {
        numero: profile.numero,
        tipo: profile.tipo
      }
    })

    if (perfil instanceof Error) {
      return new Error('Error ao registrar perfil.')
    }

    return perfil.id

  } catch (error) {
    return new Error((error as { message: string }).message || 'Error ao crear registro.')
  }
}

export async function updateBio(bio: string, profileId: string): Promise<string | Error> {
  'use server'

  try {
    const perfil = await prisma.profile.update({
      where: {
        id: profileId
      },

      data: {
        bio
      },
    })

    if (perfil instanceof Error) {
      return new Error('Error ao registrar perfil.')
    }

    return perfil.id

  } catch (error) {
    return new Error((error as { message: string }).message || 'Error ao crear registro.')
  }
}