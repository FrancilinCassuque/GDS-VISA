import { ShowTwin } from "@/app/_components"
import { ContactoShow } from "@/db"


export default async function ContactoShowPage({ params }: { params: { contactoId: string } }) {
  const id = params.contactoId
  const contacto = await ContactoShow(id)

  if (contacto instanceof Error) return
  return (
    <ShowTwin contacto={contacto} />
  )
}