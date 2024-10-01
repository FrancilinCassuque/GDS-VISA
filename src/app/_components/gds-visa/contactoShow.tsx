import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { NotificacaoUpdate } from "@/db"
import { IContacto } from "@/types"

interface ITwinProps {
  contacto: IContacto,
  notId: string
}
export const ShowTwin: React.FC<ITwinProps> = ({ contacto, notId }) => {

  const naoLida = async () => {
    await NotificacaoUpdate(notId, false)
  }

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{contacto.nome}</h4>
            <p className="text-sm text-muted-foreground">{contacto.telefone}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {contacto.descricao}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={naoLida}>Marca como Não Lida</Button>
          <Button>Arquivar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}