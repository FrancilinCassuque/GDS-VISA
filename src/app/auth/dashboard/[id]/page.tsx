import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { FormOcupacao, DrawerDialog, FormBio, IconHeart, IconMapPin, IconSettings, IconBriefcase, } from "@/app/_components"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { ShowUser } from "@/db"
import { redirect } from "next/navigation"

export default async function Component({ params }: { params: { id: string } }) {
  const id = params.id

  const user = await ShowUser(id)

  if (user instanceof Error) { redirect('/auth/user') }

  // const casasdisponiveis = user.casas.filter(casa => casa.published == true).length

  return (
    <div className="flex flex-col items-center gap-8 min-w-full mx-auto py-12 px-4 md:px-0">
      <div className="flex flex-col items-center gap-6 md:w-1/3 md:min-w-96">
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
                  <div>
                    <div className="flex items-center gap-2">
                      <IconBriefcase className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{user.pessoa.funcao.funcao}</span>
                    </div>
                  </div>
                ) : (
                  <div>

                    <DrawerDialog textoDoBotao="Registrar Ocupaçao" descricao="Registra sua Ocupaçao aqui. Clique em salvar quando terminar.">
                      <FormOcupacao />
                    </DrawerDialog>
                  </div>
                )}
              </div>

              {(user?.pessoa && user.pessoa.bio) ? <p className="text-sm text-muted-foreground max-w-[300px] text-center">{user.pessoa.bio}</p> : (
                <div>
                  <DrawerDialog textoDoBotao="Editar Biografia" descricao="Faça alterações em sua Biografia aqui. Clique em salvar quando terminar.">
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
              <span className="text-sm text-muted-foreground">Casas</span>
            </div>
            <div className="flex flex-col items-center">
              {/* <span className="text-2xl font-bold">{casasdisponiveis}</span> */}
              <span className="text-sm text-muted-foreground">Casas Disponíveis</span>
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

      {/* <div className=" grid gap-6 w-80 items-center">
        {user.casas?.map((casa: any) => (
          <Card key={casa.id}>
            <CardHeader>
              <Image
                src="/placeholder.png"
                width={300}
                height={350}
                alt="Project Thumbnail"
                className="rounded-t-lg object-cover"
              />
            </CardHeader>
            <CardContent className="p-4 items-center">
              <h3 className="text-lg font-semibold">{casa?.name}</h3>
              <p className="text-sm text-muted-foreground">
                <IconCasaLocate className="w-4 h-4 inline-block mr-1" />
                {`${casa.quarto} quarto, ${casa.sala} Sala, ${casa.casadebanho} Casa de Banho, ${casa.cozinha} Cozinha e Quintal ${casa.quintal}`}
              </p>

              <Link
                href={`/auth/home/${casa.id}`}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm my-4 font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-80"
                prefetch={false}
              >
                Ver
              </Link>
            </CardContent>
            <CardFooter>
              <p>
                <IconCasaCalendar className="w-4 h-4 inline-block mr-1" />
                <span>{new Date(casa.updatedAt).toLocaleDateString('pt-Br', {
                  weekday: 'short',
                  year: '2-digit',
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })
                }</span>
              </p>
            </CardFooter>
          </Card>
        ))}
      </div> */}

    </div>
  )
}