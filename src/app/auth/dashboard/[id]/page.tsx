import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { FormOcupacao, DrawerDialog, FormBio, IconHeart, IconMapPin, IconSettings, IconBriefcase, } from "@/app/_components"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { ShowUser } from "@/db"
import { redirect } from "next/navigation"
import { Pencil } from "lucide-react"

export default async function Component({ params }: { params: { id: string } }) {
  const id = params.id

  const user = await ShowUser(id)

  if (user instanceof Error) { redirect('/auth/user') }

  // const casasdisponiveis = user.casas.filter(casa => casa.published == true).length

  return (
    <div className="flex flex-col items-center gap-8 min-w-full mx-auto py-12 px-4 md:px-0">
      <div className="flex flex-col items-center gap-6 md:w-1/3 md:min-w-96 mb-72">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.image ? user.image : "/placeholder-user.jpg"} />
            <AvatarFallback>{user?.name ? `${user.name[0]}` : 'MC'}</AvatarFallback>
          </Avatar>

          <div className="text-center md:text-left items-center">
            <h2 className="text-2xl font-bold text-center">{user?.name}</h2>
          </div>

          {(!user?.pessoa?.id) ? (
            <div>
              <Alert variant='destructive'>
                <ExclamationTriangleIcon />
                <AlertTitle>Perfil incompleto</AlertTitle>
                <AlertDescription className="flex flex-col">
                  <p>
                    Configuração do perfil Está incompleta.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <>
              <div className="text-center md:text-left items-center">
                {(user?.pessoa?.funcao && user.pessoa.funcao.funcao) ? (
                  <div className="flex items-center gap-2">
                    <IconBriefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{user.pessoa.funcao.funcao}</span>

                    <DrawerDialog
                      // textoDoBotao="Registrar Ocupaçao"
                      descricao="Registra sua Ocupaçao aqui. Clique em salvar quando terminar."
                      icon={<Pencil className="w-5 text-primary" />} >
                      <FormOcupacao update={true} id={user.pessoa.funcao?.id} />
                    </DrawerDialog>
                  </div>
                ) : (
                  <div>

                    <DrawerDialog textoDoBotao="Registrar Ocupaçao" descricao="Registra sua Ocupaçao aqui. Clique em salvar quando terminar.">
                      <FormOcupacao update={true} />
                    </DrawerDialog>
                  </div>
                )}
              </div>

              {(user?.pessoa && user.pessoa.bio) ? <p className="text-sm text-muted-foreground max-w-[300px] text-center">{user.pessoa.bio}</p> : (
                <div>
                  <DrawerDialog textoDoBotao="Editar Biografia" descricao="Faça alterações em sua Biografia aqui. Clique em salvar quando terminar." >
                    <FormBio />
                  </DrawerDialog>
                </div>
              )}
            </>
          )}
        </div>

        <div className="bg-muted/20 rounded-lg p-4 w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              {/* <span className="text-2xl font-bold">{user.casas.length}</span> */}
              <Button variant={'outline'}><span className="text-sm text-muted-foreground">Vencimento</span></Button>
            </div>
            <div className="flex flex-col items-center">
              {/* <span className="text-2xl font-bold">casasdisponiveis</span> */}
              <Button variant={'outline'}><span className="text-sm text-muted-foreground">Declaração de Efetividade</span></Button>
            </div>
          </div>

          <Separator className="my-4" />

          {(user?.pessoa?.funcao && user.pessoa.funcao.funcao) && (
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <IconBriefcase className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{user.pessoa.funcao.funcao}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconHeart className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Gota D' Sol, {user.pessoa.funcao.funcao}</span>
              </div>
            </div>
          )}

          {user?.pessoa?.address.id && (
            <div className="flex items-center gap-2 my-2">
              <IconMapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user.pessoa.address.rua}, {user.pessoa.address.bairro}, {user.pessoa.address.comuna}, {user.pessoa.address.municipio}, {user.pessoa.address.provincia}, {user.pessoa.address.pais}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}