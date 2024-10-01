'use server'

import { IContacto } from "@/types"
import prisma from '../prisma.index'


export async function ContactoStore(contacto: Omit<IContacto, 'id'>): Promise<string | Error> {
  'use server'
  try {
    const novoContacto = await prisma.contacto.create({
      data: {
        nome: contacto.nome.toUpperCase(),
        telefone: contacto.telefone,
        descricao: contacto.descricao
      }
    })

    if (!(novoContacto instanceof Error)) {

      const novaNotificacao = await prisma.notificacao.create({
        data: {
          eventId: novoContacto.id,
          mensagem: `${novoContacto.nome} entrou em contacto.`,
          tipo: 'contacto',
          visto: false,
        }
      })

      if (!(novaNotificacao instanceof Error)) {
        return novoContacto.id
      }
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao registrar Pedido.')
  }
}

export async function ContactoIndex(): Promise<IContacto[] | Error> {
  'use server'
  try {
    const contactos = await prisma.contacto.findMany()

    if (!(contactos instanceof Error)) {
      return contactos
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao buscar Pedido.')
  }
}

export async function ContactoShow(id:string): Promise<IContacto | Error> {
  'use server'
  try {
    const contacto = await prisma.contacto.findUniqueOrThrow({
      where:{
        id
      }
    })

    if (contacto) {
      return contacto
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao buscar Pedido.')
  }
}

export async function ContactoDeletar(id:string): Promise<IContacto | Error> {
  'use server'
  try {
    const contacto = await prisma.contacto.delete({
      where:{
        id
      }
    })

    if (!(contacto instanceof Error)) {
      return contacto
    }

    return new Error('Erro ao registrar Pedido, Consulta o fornecedor de Rede.')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao buscar Pedido.')
  }
}