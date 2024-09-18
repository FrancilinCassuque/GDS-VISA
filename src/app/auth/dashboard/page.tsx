'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { FormOcupacao, DrawerDialog, FormBio, IconHeart, IconMapPin, IconSettings, IconBriefcase, DataTableClientes } from "@/app/_components"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { authStore } from "@/store"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { IUserAuth } from "@/types"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Pencil } from "lucide-react"
import { Metadata } from "next"

export default function Component() {
  const { status } = useSession()
  const [user, setUser] = useState<IUserAuth | undefined>(undefined)
  const [casasdisponiveis, setdisponiveis] = useState(0)
  const [open, setopen] = useState(false)
  const u = authStore()

  
  useEffect(() => {
    if (status == 'authenticated') {
      setUser(u.userauth)
      // setCasas(u.casas)
      // setdisponiveis(u.casas.filter(casa => casa.published == true).length)
    }

  }, [status, setUser, u, setdisponiveis])

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
                    Finalize a configuração do teu perfil para melhor usuabilidade.
                  </p>

                  <Link href={`/auth/dashboard/settings`}>
                    <Button className='my-4 flex flex-row w-full'>
                      <IconSettings className='w-5 h-5 mx-2' />
                      Configurar
                    </Button>
                  </Link>

                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <>
              <div className="text-center md:text-left items-center">
                {(user?.pessoa?.funcoes && user.pessoa.funcoes.funcao) ? (
                  <div>
                    <div className="grid grid-flow-col grid-cols-1 items-center justify-center">
                      <IconBriefcase className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground m-4">
                        {user.pessoa.funcoes.funcao}
                      </span>

                      <DrawerDialog  descricao="Actualiza sua Função aqui. Clique em salvar quando terminar."
                        icon={<Pencil className="w-5 text-primary" />}>
                        <FormOcupacao />
                      </DrawerDialog>
                    </div>
                  </div>
                ) : (
                  <div>
                    <DrawerDialog  textoDoBotao="Registrar Função" descricao="Registra sua Função aqui. Clique em salvar quando terminar.">
                      <FormOcupacao />
                    </DrawerDialog>
                  </div>
                )}
              </div>

              {(user?.pessoa && user.pessoa.bio) ? <p className="text-sm text-muted-foreground max-w-[300px] text-center">{user.pessoa.bio}</p> : (
                <div>
                  <DrawerDialog  textoDoBotao="Editar Biografia" descricao="Faça alterações em sua Biografia aqui. Clique em salvar quando terminar.">
                    <FormBio />
                  </DrawerDialog>
                </div>
              )}
            </>
          )}

        </div>
        <div className="bg-muted/20 rounded-lg p-4 w-full">
          <div className="flex items-center justify-between">
            {/* <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{casas.length}</span>
              <span className="text-sm text-muted-foreground">Casas</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">{casasdisponiveis}</span>
              <span className="text-sm text-muted-foreground">Casas Disponíveis</span>
            </div> */}
          </div>

          <Separator className="my-4" />

          {(user?.pessoa?.funcoes && user.pessoa.funcoes.id) && (
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <IconBriefcase className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{user.pessoa.funcoes.funcao}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconHeart className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Gota D` Sol</span>
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

      <div className=" grid gap-6 w-full md:w-6/12">
        <Tabs defaultValue="tudo">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="tudo">Propriedades</TabsTrigger>
              <TabsTrigger value="Disponiveis">Disponiveis</TabsTrigger>
              <TabsTrigger value="Pendentes">Pendentes</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="tudo">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>{('Propriedades').toUpperCase()}</CardTitle>
                <CardDescription>Todas as Propriedades.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <DataTableHome listaDeCasas={casas} /> */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Disponiveis">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>{('Disponiveis').toUpperCase()}</CardTitle>
                <CardDescription>Todas as Propriedades Disponiveis.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <DataTableHome listaDeCasas={casas.filter(casa => casa.published)} /> */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Pendentes">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>{('Pendentes').toUpperCase()}</CardTitle>
                <CardDescription>Todas as Propriedades Pendentes.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <DataTableHome listaDeCasas={casas.filter(casa => !casa.published)} /> */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}