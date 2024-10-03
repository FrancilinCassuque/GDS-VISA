import { ShowTwin } from "@/app/_components"
import { ContactoShow, NotificacaoDelete, NotificacaoShow, NotificacaoUpdate, ServicoShow } from "@/db"
import { redirect } from "next/navigation"


export default async function ContactoShowPage({ params }: { params: { contactoId: string } }) {
  const id = params.contactoId
  const notificacao = await NotificacaoShow(id)

  if (notificacao instanceof Error) {
    await NotificacaoDelete(id)

    return
  }

  if (notificacao.tipo == 'contacto') {
    const contacto = await ContactoShow(notificacao.eventId)
    if (contacto instanceof Error) {
      await NotificacaoDelete(notificacao.id)

      return
    }

    await NotificacaoUpdate(notificacao.id, true)


    return (
      <ShowTwin contacto={contacto} notId={notificacao.id} />
    )
  } else if (notificacao.tipo == 'servico') {
    const contacto = await ServicoShow(notificacao.eventId)
    if (contacto instanceof Error) {
      await NotificacaoDelete(notificacao.id)

      return
    }

    await NotificacaoUpdate(notificacao.id, true)


    return (
      <ShowTwin servico={contacto} notId={notificacao.id} />
    )
  } else {
    return (
      redirect('/auth/home')
    )
  }


}