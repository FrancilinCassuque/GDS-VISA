import { DrawerDialog, FacturaStore, AutorizacaoCheck } from "@/app/_components"
import { ClientIndex, processoIndex } from "@/db"


export default async function ContasCreate() {
  const clientes = await ClientIndex()
  const processos = await processoIndex()

  if (clientes instanceof Error) return
  if (processos instanceof Error) return

  return (
    <>
      {/* <AutorizacaoCheck /> */}
      <FacturaStore clientes={clientes} processos={processos} />
    </>
  )
}