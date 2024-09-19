import { FacturaStore } from "@/app/_components";
import { ClientIndex, processoIndex } from "@/db";


export default async function ContasCreate(){
  const clientes = await ClientIndex()
  const processos = await processoIndex()

  if (clientes instanceof Error) return
  if (processos instanceof Error) return

  return(
    <FacturaStore clientes={clientes} processos={processos} />
  )
}