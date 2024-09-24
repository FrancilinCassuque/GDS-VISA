import { CreateProcess } from "@/app/_components"
import { ClientIndex, processoShow } from "@/db"


export default async function Component({ params }: { params: { processoId: string } }) {
  const id = params.processoId
  const processo = await processoShow(id)
  const clientes = await ClientIndex()

  if (processo instanceof Error) return
  if (clientes instanceof Error) return

  return (
    <CreateProcess processo={processo} clientes={clientes} />
  )
}