import { DrawerDialog, FacturaStore } from "@/app/_components"
import { AutorizacaoCheck } from "@/app/_components/layouts/dashboard/autorizacaoCheck"
import { ClientIndex, FacturaShow, processoIndex } from "@/db"

export default async function Component({ params }: { params: { facturaId: string } }) {
  const id = params.facturaId
  const factura = await FacturaShow(id)

  const clientes = await ClientIndex()
  const processos = await processoIndex()

  if (clientes instanceof Error) return
  if (processos instanceof Error) return
  if (factura instanceof Error) return

  return (
    <>
      {/* <AutorizacaoCheck /> */}
      <FacturaStore clientes={clientes} processos={processos} factura={factura} />
    </>
  )
}