import { CreateClient } from "@/app/_components"
import { ClientShow } from "@/db"

export default async function Component({ params }: { params: { clientId: string } }) {
  const id = params.clientId

  const cliente = await ClientShow(id)
  if (cliente instanceof Error) return

  return (
    <CreateClient client={cliente} />
  )
}