import { IFactura, IFacturaStore, IFacturaUpdate, IProcesso } from "@/types"
import prisma from "../prisma.index"

export async function facturaStore(store: IFacturaStore, listaDeProcessos: IProcesso[]): Promise<string | Error> {
  try {
    const calculo = {
      total: 0,
      valorApagar: 0,
      valorEmFalta: 0,
      processosId: ['']
    }

    listaDeProcessos.map(processo => {
      calculo.processosId.push(processo.id)
      calculo.total += processo.preco
    })

    if (store.estado === '1ª Parcela Pendente') {
      calculo.valorApagar = (calculo.total / 2) - store.desconto
      calculo.valorEmFalta = calculo.total / 2
    } else if (store.estado === '2ª Parcela Pendente') {
      calculo.valorApagar = (calculo.total / 2) - store.desconto
      calculo.valorEmFalta = 0
    } else if (store.estado === '1ª Pago') {
      calculo.valorApagar = 0
      calculo.valorEmFalta = (calculo.total / 2) - store.desconto
    } else {
      calculo.valorApagar = 0
      calculo.valorEmFalta = 0
    }

    const novaFactura = await prisma.factura.create({
      data: {
        desconto: store.desconto,
        descricao: store.descricao,
        estado: store.estado,
        agenteId: store.agenteId,
        clientId: store.clientId,
        total: calculo.total,
        valorApagar: calculo.valorApagar,
        valorEmFalta: calculo.valorEmFalta,
        processosId: calculo.processosId,
      }
    })

    if (novaFactura.id) {
      return novaFactura.id
    }

    return new Error('Erro ao registrar a factura')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao registrar Registro')
  }
}


export async function FacturaUpdate(factura: IFacturaUpdate, listaDeProcessos: IProcesso[]): Promise<string | Error> {
  try {
    const processosId = ['']

    listaDeProcessos.map(processo => {
      processosId.push(processo.id)
    })

    if (factura.estado === '1ª Parcela Pendente') {
      factura.valorApagar = (factura.total / 2) - factura.desconto
      factura.valorEmFalta = factura.total / 2
    } else if (factura.estado === '2ª Parcela Pendente') {
      factura.valorApagar = factura.valorEmFalta - factura.desconto
      factura.valorEmFalta = 0
    } else if (factura.estado === '1ª Pago') {
      factura.valorApagar = 0
    } else {
      factura.valorApagar = 0
      factura.valorEmFalta = 0
    }

    const novaFactura = await prisma.factura.create({
      data: {
        desconto: factura.desconto,
        descricao: factura.descricao,
        estado: factura.estado,
        agenteId: factura.agenteId,
        clientId: factura.clientId,
        total: factura.total,
        valorApagar: factura.valorApagar,
        valorEmFalta: factura.valorEmFalta,
        processosId: processosId,
      }
    })

    if (novaFactura.id) {
      return novaFactura.id
    }

    return new Error('Erro ao Actualiza a factura')
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao Actualizar Registro')
  }
}

export async function FacturaIndex(): Promise<IFactura[] | Error> {
  try {

    const listaDeFacturas = await prisma.factura.findMany()

    return listaDeFacturas

  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao Actualizar Registro')
  }
}