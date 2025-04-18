'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { NotificacaoDelete, NotificacaoUpdate } from "@/db"
import { IContacto, IServiceShow } from "@/types"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CardAction } from "../home/feed/cardAction"

interface ITwinProps {
  contacto?: IContacto
  servico?: IServiceShow
  notId: string
}
export const ShowTwin: React.FC<ITwinProps> = ({ contacto, notId, servico }) => {
  const rota = useRouter()
  const [loading, setLoading] = useState(false)


  const naoLidaNotify = async () => {
    setLoading(true)
    await NotificacaoUpdate(notId, false)
    window.location.replace('/auth/home')
  }

  return (
    <div className="flex items-center justify-center w-full">
      {contacto && (
        <Card className="w-[350px]">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{contacto?.nome}</h4>
              <p className="text-sm text-muted-foreground">{contacto?.telefone}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {contacto?.descricao}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={naoLidaNotify}> {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Marca como Não Lida</Button>
            <Button>Arquivar</Button>
          </CardFooter>
        </Card>
      )}

      {servico && (
        <Card className="w-[400px]">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{servico.nome}</h4>
              <p className="text-sm text-muted-foreground my-4">Tipo: {servico.tipo}</p>
              <p className="text-sm text-muted-foreground">Preço: {servico.preco.toLocaleString('AO', { style: 'currency', currency: 'AOA' })}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {servico.descricao}
            </p>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={naoLidaNotify}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Marca como Não Lida</Button>
            <Button onClick={() => {
              NotificacaoDelete(notId)
            }}>Arquivar</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}