
import { ClientShow } from "@/db"
import { redirect } from "next/navigation"
import { CreateClient } from "@/app/_components"

interface Props {
  params: { id: string }
}

export default async function Component({ params }: Props) {
  const id = params?.id

  const cliente = await ClientShow(id).then(res => {
    if (res instanceof Error) {
      return redirect('/home')
    }

    return res
  })

  return (
    <CreateClient client={cliente} />
  )
}