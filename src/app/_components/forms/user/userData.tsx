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
import { BioData } from "./bioData"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { IUserAuth } from "@/types"
import { useUserStore } from "@/store"

interface IUpdateUser {
  id: string
  name: string | null
  email: string
  file: [any]
}

interface IUserSettings {
  userAuth: IUserAuth
}

export const UserData: React.FC<IUserSettings> = ({ userAuth }) => {
  const [editar, setEditar] = useState(true)
  const [loading, setLoading] = useState(false)
  const form = useForm<IUpdateUser>()
  const rote = useRouter()
  const { updateUser } = useUserStore()

  const cancelar = () => {
    form.setValue('name', userAuth?.name || '')
    form.setValue('email', userAuth?.email || '')

    setEditar(true)
  }

  const handlerUpdateUser = form.handleSubmit(async (data: IUpdateUser) => {
    try {
      setLoading(true)
      const userSave = {
        id: userAuth?.id || '',
        name: userAuth?.name || '',
        email: userAuth?.email || '',
        image: userAuth?.image || '',
      }

      if (data.file) {
        if (userAuth?.image) {
          await image.deleteFile(userAuth.image)

          const img = await image.imgUpload(data.file)
          userSave.image = img || ''
        } else {
          const img = await image.imgUpload(data.file)
          userSave.image = img || ''
        }
      }

      await updateUser(userAuth?.id || '', userSave)
      rote.refresh()

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
                  defaultValue={userAuth?.name || ''}
                  readOnly={true}

                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail do proprietário</Label>
                <Input id="email" type="email" placeholder="john@example.com"
                  {...form.register('email')}
                  defaultValue={userAuth?.email || ''}
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

      <PerfilData authUser={userAuth} />

      {userAuth?.pessoa?.id && (
        <>
          <EnderecoForm />

          {userAuth?.pessoa?.bio && (
            <BioData />
          )}
        </>
      )}
    </div>
  )
} 