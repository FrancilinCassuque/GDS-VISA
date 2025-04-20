'use client'

import React, { useState } from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { EnderecoForm, PerfilData } from "@/app/_components"
import { useForm } from "react-hook-form"
import { image } from "@/firebase/uploadImage"
import { ChevronDown, Loader } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { BioData } from "@/app/_components/forms/user/bioData"
import { useUserStore } from "@/store"
import { useRouter } from "next/navigation"

interface IUpdateUser {
  id: string
  name: string | null
  email: string
  file: [any]
}

export default function Settings({ params }: { params: { userId: string } }) {

  const [editar, setEditar] = useState(true)
  const [loading, setLoading] = useState(false)
  const form = useForm<IUpdateUser>()
  const { currentUser, updateUser } = useUserStore()
  const rote = useRouter()

  const cancelar = () => {
    form.setValue('name', currentUser?.name || '')
    form.setValue('email', currentUser?.email || '')

    setEditar(true)
  }

  const handlerUpdateUser = form.handleSubmit(async (data: IUpdateUser) => {
    try {
      setLoading(true)
      const userSave = {
        id: currentUser?.id || '',
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        image: currentUser?.image || '',
      }

      if (data.file) {
        if (currentUser?.image) {
          await image.deleteFile(currentUser.image)

          const img = await image.imgUpload(data.file)
          userSave.image = img || ''
        } else {
          const img = await image.imgUpload(data.file)
          userSave.image = img || ''
        }
      }

      await updateUser(currentUser?.id || '', userSave)

      rote.refresh()
      toast.success("Usuario actualizado com successo! Por favor, actualiza a Pagina.")

    } catch (erro) {
      setLoading(false)
      setEditar(true)
      toast.error('Erro ao actualizar a Imagem')
    }
  })

  return (
    <div className="w-full max-w-max mx-auto py-12 md:py-16 lg:py-20">
      <div className="space-y-4 text-center mb-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Definições & Privacidades</h1>
        <p className="md:text-lg text-foreground">Informações detalhadas do perfil.</p>
      </div>

      <div className="border rounded-lg">
        <Collapsible className="rounded-lg overflow-hidden" open={true} >
          <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="font-medium">Dados do Usuário</div>
              <div className="text-muted-foreground text-sm">Informações básicas do usuário</div>
            </div>
            <ChevronDown className="h-5 w-5 transition-transform" />
          </CollapsibleTrigger>

          <CollapsibleContent className="px-6 py-4 space-y-4">
            <form className="mx-2 mt-10 mb-20" onSubmit={handlerUpdateUser}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome de Usuário</Label>
                  <Input id="name" placeholder="John Doe"
                    {...form.register('name')}
                    defaultValue={currentUser?.name || ''}
                    readOnly={true}

                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail do proprietário</Label>
                  <Input id="email" type="email" placeholder="john@example.com"
                    {...form.register('email')}
                    defaultValue={currentUser?.email || ''}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images</Label>
                  <Input id="images" type="file" {...form.register('file')} disabled={editar} />
                </div>
              </div>

              <div className="flex flex-row items-end justify-end my-3">
                {!editar ? (
                  <>
                    <Button className="mx-2 px-6" type="submit" disabled={loading} variant='secondary'>
                      {loading ? <Loader className="animate-spin h-8 w-8" /> : 'Salvar'}
                    </Button>
                    <Button variant='destructive' className="mx-2 px-6" disabled={loading}
                      onClick={(e) => {
                        e.preventDefault()
                        cancelar()
                      }}>
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button className="mx-2 px-6" variant='secondary' onClick={(e) => {
                    e.preventDefault()
                    setEditar(false)
                  }}>Editar</Button>
                )}
              </div>

              <Separator />
            </form>
          </CollapsibleContent>
        </Collapsible>

        {currentUser && (
          <PerfilData authUser={currentUser} />
          // Pico do gohst
        )}

        {currentUser?.pessoa?.id && (
          <>
            <EnderecoForm />

            {currentUser?.pessoa?.bio && (
              <BioData />
            )}
          </>
        )}
      </div>
    </div>
  )
}

