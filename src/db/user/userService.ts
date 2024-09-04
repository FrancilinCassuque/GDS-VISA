'use server'

import { IUser, IUserAuth, IUserProfileHome, IUserShow, userlogin } from "@/types"
import prisma from "../prisma.index"
import { CriptPassword } from "@/lib/criptPass"
import { authStore, userStore } from '@/store'
import { revalidatePath } from "next/cache"

interface IUpdateUser {
  id: string
  name: string | null
  email: string
  image?: string
}

type authRetun = {
  auth: IUserAuth,
  userCompleto: IUserProfileHome
}

export async function userCreate(formDara: Omit<userlogin, 'id'>): Promise<string | Error> {
  'use server'

  try {
    const user = {
      email: formDara.email,
      password: formDara.password
    }

    const criptPass = CriptPassword(user.password as string || '')
    const name = `user_${Date.now()}`

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: criptPass,
        name: name
      }
    })

    if (newUser.id) {
      return newUser.id
    }

    return new Error('Error ao registrar usuário')

  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao registrar usuário')
  }
}

export async function login(user: Omit<userlogin, 'id'>): Promise<IUser | Error> {

  'use server'

  try {
    const userFinded = await prisma.user.findUnique({
      where: {
        email: user.email
      },
      // include: {
      //   profile: true,
      //   casas: {
      //     include: {
      //       address: true
      //     }
      //   }
      // },
    })

    const passwordHash = CriptPassword(user.password)

    if (!userFinded) {
      return new Error('Conta não existe.')
    }

    if (userFinded?.password != passwordHash) {
      return new Error('Palavra passe errada.')
    }

    // if (!userFinded?.emailVerified) {
    //   return new Error('Confirma teu Email.')
    // }
    revalidatePath('/')
    // authStore.getState().login(userFinded)

    return userFinded
  } catch (error) {
    return new Error((error as { massage: string }).massage || 'Erro ao fazer login')
  }
}

export async function auth(email: string): Promise<authRetun | Error> {
  'use server'
  try {
    const userCompleto = await prisma.user.findUnique({
      where: {
        email: email
      },

      include: {
        casas: {
          include: {
            address: true
          },
        },

        profile: {
          // select: {
          //   id: true,
          //   nome: true,
          //   Apelido: true,
          //   genero: true,
          //   pais: true,
          //   bio: true,
          //   pessoatipo: true,
          //   telefone: true,
          // },

          include: {
            identidades: true,

            ocupacoes: {
              orderBy: {
                updatedAt: "desc"
              },

              select: {
                id: true,
                ocupacao: true,
                ocupante: true,
                area: true,
              }
            },

            Address: {
              select: {
                id: true,
                rua: true,
                bairro: true,
                comuna: true,
                municipio: true,
                provincia: true,
                pais: true,
              }
            }
          }
        },
      }
    })

    if (!userCompleto) {
      return new Error('Conta não existe.')
    }

    const pessoa = userCompleto.profile.find(pessoa => pessoa.pessoatipo == 'Pessoa Fisíca')
    const identidade = pessoa?.identidades.find(indentidade => indentidade.tipo == 'NIF' || indentidade.tipo == 'PASSAPORTE')
    const ocupacao = pessoa?.ocupacoes.find((ocupacao, index) => index == 0)
    const address = pessoa?.Address.find((a, index) => index == 0)

    const auth: IUserAuth = {
      id: userCompleto.id,
      name: userCompleto.name,
      email: userCompleto.email,
      image: userCompleto.image,
      password: userCompleto.password,
      pessoa: {
        id: pessoa?.id || '',
        nome: pessoa?.nome || '',
        Apelido: pessoa?.Apelido || '',
        genero: pessoa?.genero || '',
        pais: pessoa?.pais || '',
        telefone: pessoa?.telefone || '',
        pessoatipo: pessoa?.pessoatipo || '',
        bio: pessoa?.bio || '',

        identidade: {
          id: identidade?.id || '',
          numero: identidade?.numero || '',
          tipo: identidade?.tipo || '',
        },

        ocupacao: {
          id: ocupacao?.id || 0,
          area: ocupacao?.area || '',
          ocupacao: ocupacao?.ocupacao || '',
          ocupante: ocupacao?.ocupante || '',
        },

        address: {
          id: address?.id || 0,
          rua: address?.rua || '',
          bairro: address?.bairro || '',
          comuna: address?.comuna || '',
          municipio: address?.municipio || '',
          provincia: address?.provincia || '',
          pais: address?.pais || '',
        }
      }
    }

    revalidatePath('/')

    return { auth, userCompleto }
  } catch (error) {
    return new Error((error as { massage: string }).massage || 'Erro ao fazer login')
  }
}

export async function ShowUser(id: string): Promise<IUserShow | Error> {
  'use server'
  try {
    const userCompleto = await prisma.user.findUnique({
      where: {
        id: id
      },

      include: {
        casas: {
          include: {
            address: true
          },
        },

        profile: {
          // select: {
          //   id: true,
          //   nome: true,
          //   Apelido: true,
          //   genero: true,
          //   pais: true,
          //   bio: true,
          //   pessoatipo: true,
          //   telefone: true,
          // },

          include: {
            identidades: true,

            ocupacoes: {
              orderBy: {
                updatedAt: "desc"
              },

              select: {
                id: true,
                ocupacao: true,
                ocupante: true,
                area: true,
              }
            },

            Address: {
              select: {
                id: true,
                rua: true,
                bairro: true,
                comuna: true,
                municipio: true,
                provincia: true,
                pais: true,
              }
            }
          }
        },
      }
    })

    if (!userCompleto) {
      return new Error('Conta não existe.')
    }

    const pessoa = userCompleto.profile.find(pessoa => pessoa.pessoatipo == 'Pessoa Fisíca')
    const identidade = pessoa?.identidades.find(indentidade => indentidade.tipo == 'NIF' || indentidade.tipo == 'PASSAPORTE')
    const ocupacao = pessoa?.ocupacoes.find((ocupacao, index) => index == 0)
    const address = pessoa?.Address.find((a, index) => index == 0)

    const auth: IUserShow = {
      id: userCompleto.id,
      name: userCompleto.name,
      email: userCompleto.email,
      image: userCompleto.image,
      password: userCompleto.password,
      pessoa: {
        id: pessoa?.id || '',
        nome: pessoa?.nome || '',
        Apelido: pessoa?.Apelido || '',
        genero: pessoa?.genero || '',
        pais: pessoa?.pais || '',
        telefone: pessoa?.telefone || '',
        pessoatipo: pessoa?.pessoatipo || '',
        bio: pessoa?.bio || '',

        identidade: {
          id: identidade?.id || '',
          numero: identidade?.numero || '',
          tipo: identidade?.tipo || '',
        },

        ocupacao: {
          id: ocupacao?.id || 0,
          area: ocupacao?.area || '',
          ocupacao: ocupacao?.ocupacao || '',
          ocupante: ocupacao?.ocupante || '',
        },

        address: {
          id: address?.id || 0,
          rua: address?.rua || '',
          bairro: address?.bairro || '',
          comuna: address?.comuna || '',
          municipio: address?.municipio || '',
          provincia: address?.provincia || '',
          pais: address?.pais || '',
        }
      },

      casas: userCompleto.casas
    }

    revalidatePath('/')

    return auth
  } catch (error) {
    return new Error((error as { massage: string }).massage || 'Erro ao fazer login')
  }
}

export async function userIndex(page = 1): Promise<IUser[] | Error> {
  'use server'

  try {
    const users = await prisma.user.findMany()

    if (users) {
      userStore.getState().start(users)
      return users
    }

    return new Error('Usários não encontrados')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao buscar usuários')
  }
}

export async function update(user: IUpdateUser): Promise<string | Error> {
  'use server'

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        ...user
      }
    })

    if (updatedUser) {
      authStore.getState().update(updatedUser)
      return updatedUser.id
    }

    return new Error('usuário não encontrado')
  } catch (err) {
    return new Error((err as { message: string }).message || 'Erro ao buscar Usuário')
  }
}

