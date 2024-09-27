import { IContacto } from "@/types"
import prisma from '../prisma.index'


export default async function ContactoStore(contacto: Omit<IContacto, 'id'>): Promise<string | Error> {
  try {
    // const novoContacto=await prisma.co


    return 'Erro ao registrar Pedido, Consulta o fornecedor de Rede.'
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao registrar Pedido.')
  }

}