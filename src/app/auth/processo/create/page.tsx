import { CreateProcess } from "@/app/_components";
import { ClientIndex } from "@/db";


export default async function CreateProcesso() {
  const clientes = await ClientIndex()

  if(clientes instanceof Error) return

  return (
    <CreateProcess clientes={clientes} />
  )
}