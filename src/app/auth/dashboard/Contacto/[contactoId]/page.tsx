import { ShowTwin } from "@/app/_components"
import { ContactoShow, NotificacaoShow, NotificacaoUpdate } from "@/db"
import { redirect } from "next/navigation"


export default async function ContactoShowPage({ params }: { params: { contactoId: string } }) {
  const id = params.contactoId
  const notificacao = await NotificacaoShow(id)

  if (notificacao instanceof Error) {
    return (
      redirect('/auth/home')
    )
  }
  const contacto = await ContactoShow(notificacao.eventId)
  if (contacto instanceof Error) {
    redirect('/auth/home')
  }

  await NotificacaoUpdate(notificacao.id, true)


  return (
    <ShowTwin contacto={contacto} notId={notificacao.id} />
  )
}