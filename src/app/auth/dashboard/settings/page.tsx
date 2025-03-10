'use client'

import React, { useState } from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { EnderecoForm, IconChevronDown, PerfilData } from "@/app/_components"
import { useForm } from "react-hook-form"
import { authStore } from "@/store"
import { update } from "@/db"
import { image } from "@/firebase/uploadImage"
import { Loader } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { BioData } from "@/app/_components/forms/user/bioData"

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
  const auth = authStore()
  const rote = useRouter()

  const cancelar = () => {
    form.setValue('name', auth.userauth?.name || '')
    form.setValue('email', auth.userauth?.email || '')

    setEditar(true)
  }

  const updateUser = form.handleSubmit(async (data: IUpdateUser) => {
    try {
      setLoading(true)
      const userSave = {
        id: auth.userauth?.id || '',
        name: auth.userauth?.name || '',
        email: auth.userauth?.email || '',
        image: auth.userauth?.image || '',
      }

      if (data.file) {
        if (auth.userauth?.image) {
          await image.deleteFile(auth.userauth.image)

          const img = await image.imgUpload(data.file)
          userSave.image = img || ''
        } else {
          const img = await image.imgUpload(data.file)
          userSave.image = img || ''
        }
      }

      const response = await update(auth.userauth?.id || '', userSave)

      if (!(response instanceof Error)) {
        const upAuth = auth.userauth

        if (upAuth) {
          upAuth.image = userSave.image
          auth.startAuth(upAuth)
        }

        setEditar(true)
        setLoading(false)
        rote.push('/auth/dashboard')
        toast({
          title: 'Sucesso!',
          description: 'Usuario actualizado com successo! Por favor, actualiza a Pagina.',
          variant: 'default'
        })

      }

    } catch (erro) {
      setLoading(false)
      setEditar(true)
      toast({
        title: 'Erro',
        description: 'Erro ao actualizar a Imagem',
        variant: 'destructive'
      })

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
            <IconChevronDown className="h-5 w-5 transition-transform" />
          </CollapsibleTrigger>

          <CollapsibleContent className="px-6 py-4 space-y-4">
            <form className="mx-2 mt-10 mb-20" onSubmit={updateUser}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome de Usuário</Label>
                  <Input id="name" placeholder="John Doe"
                    {...form.register('name')}
                    defaultValue={auth.userauth?.name || ''}
                    readOnly={true}

                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail do proprietário</Label>
                  <Input id="email" type="email" placeholder="john@example.com"
                    {...form.register('email')}
                    defaultValue={auth.userauth?.email || ''}
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

        {auth.userauth && (
          <PerfilData authUser={auth.userauth} />
    // Pico do gohst
      )}

        {auth.userauth?.pessoa?.id && (
          <>
            <EnderecoForm />

            {auth.userauth?.pessoa?.bio && (
              <BioData />
            )}
          </>
        )}
      </div>
    </div>
  )
}

