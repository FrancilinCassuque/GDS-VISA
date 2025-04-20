'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { FormOcupacao, DrawerDialog, FormBio } from "@/app/_components"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useUserStore } from "@/store"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { IUserAuth } from "@/types"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Briefcase, Heart, MapPin, Pencil, Settings } from "lucide-react"
import { Metadata } from "next"

export default function Component() {
  const { currentUser } = useUserStore()

  return (
    <div className="flex flex-col items-center gap-8 min-w-full mx-auto py-12 px-4 md:px-0">
      <div className="flex flex-col items-center gap-6 md:w-1/3 md:min-w-96 mb-10">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={currentUser?.image ? currentUser.image : "/placeholder-user.jpg"} />
            <AvatarFallback>{currentUser?.name ? `${currentUser.name[0]}` : 'MC'}</AvatarFallback>
          </Avatar>

          <div className="text-center md:text-left items-center">
            <h2 className="text-2xl font-bold text-center">{currentUser?.name}</h2>
          </div>

          {(!currentUser?.pessoa?.id) ? (
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
                      <Settings className='w-5 h-5 mx-2' />
                      Configurar
                    </Button>
                  </Link>

                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <>
              <div className="text-center md:text-left items-center">
                {(currentUser?.pessoa?.funcao && currentUser.pessoa.funcao.funcao) ? (
                  <div className="grid grid-flow-col grid-cols-1 items-center justify-center">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground m-4">
                      {currentUser.pessoa.funcao.funcao}
                    </span>

                    <DrawerDialog descricao="Actualiza sua Função aqui. Clique em salvar quando terminar."
                      icon={<Pencil className="w-5 text-primary" />}>
                      <FormOcupacao id={currentUser.pessoa.funcao.id} update={true} />
                    </DrawerDialog>
                  </div>
                ) : (
                  <div>
                    <DrawerDialog textoDoBotao="Registrar Função" descricao="Registra sua Função aqui. Clique em salvar quando terminar.">
                      <FormOcupacao />
                    </DrawerDialog>
                  </div>
                )}
              </div>

              {(currentUser?.pessoa && currentUser.pessoa.bio) ? <p className="text-sm text-muted-foreground max-w-[300px] text-center">{currentUser.pessoa.bio}</p> : (
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

          {(currentUser?.pessoa?.funcao && currentUser.pessoa.funcao.id) && (
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{currentUser.pessoa.funcao.funcao}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Gota D` Sol</span>
              </div>
            </div>
          )}

          {currentUser?.pessoa?.address.id && (
            <div className="flex items-center gap-2 my-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{currentUser.pessoa.address.rua}, {currentUser.pessoa.address.bairro}, {currentUser.pessoa.address.comuna}, {currentUser.pessoa.address.municipio}, {currentUser.pessoa.address.provincia}, {currentUser.pessoa.address.pais}</span>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}