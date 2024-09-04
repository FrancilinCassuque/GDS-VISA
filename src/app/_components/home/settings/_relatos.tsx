import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


export const Relatos: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Confiável pelos proprietários</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Ouça de nossos clientes satisfeitos sobre sua experiência com nossa plataforma de registro residencial.          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Card className="p-6 bg-muted">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <div className="font-medium">Jane Doe</div>
                <div className="text-muted-foreground text-sm">Proprietário da casa</div>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-muted-foreground">
              O processo de registro de casa foi uma brisa com Acme Home-n Register.
              A plataforma é fácil de usar e a equipe foi extremamente útil durante todo o processo.
            </p>
          </Card>
          <Card className="p-6 bg-muted">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <div className="font-medium">John Smith</div>
                <div className="text-muted-foreground text-sm">Proprietário da casa</div>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-muted-foreground">
              “Eu estava hesitante sobre o processo de registro de casa, mas o Acme Home Register tornou tudo tão fácil.
              A plataforma é intuitiva e a equipe estava lá para me apoiar a cada passo do caminho."
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}