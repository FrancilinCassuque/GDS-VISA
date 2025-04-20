'use client'

import React, { useState } from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { authStore } from "@/store"
import { update, updateBio } from "@/db"
import { image } from "@/firebase/uploadImage"
import { ChevronDown, Loader, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface IUpdateUser {
  bio: string
}

const bio = z.string({ message: 'Erro! Diga qualquer coisa sobre vc!' }).min(5, 'Escreva mais sobre ti').max(225, 'Queremos Apenas 225 caracteres!')

export const BioData: React.FC = () => {
  const [editar, setEditar] = useState(true)
  const [loading, setLoading] = useState(false)
  const form = useForm<IUpdateUser>()
  const auth = authStore()
  const rote = useRouter()

  const cancelar = () => {
    form.setValue('bio', auth.userauth?.pessoa?.bio || '')

    setEditar(true)
  }

  const updateBioForm = form.handleSubmit(async (data: IUpdateUser) => {
    try {
      setLoading(true)

      const id = auth.userauth?.pessoa?.id || ''
      const bioSend = bio.parse(data)

      const response = await updateBio(bioSend, id)

      if (!(response instanceof Error)) {
        const updateAuth = auth.userauth
        if (updateAuth) {
          updateAuth.pessoa.bio = response

          auth.startAuth(updateAuth)
          rote.push('/auth/dashboard')

          toast({
            title: "sucesso!",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">Perfil Actualizado com sucesso!</code>
              </pre>
            ),
          })
        }
      }

      setEditar(true)
      setLoading(false)



    } catch (erro) {
      setLoading(false)
      setEditar(true)

    }
  })

  return (
    <Collapsible className="rounded-lg overflow-hidden" open={true} >
      <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="font-medium">Bio do Usuário</div>
          <div className="text-muted-foreground text-sm">Que es Tu? (Como Ti descreves?)</div>
        </div>
        <ChevronDown className="h-5 w-5 transition-transform" />
      </CollapsibleTrigger>

      <CollapsibleContent className="px-6 py-4 space-y-4">
        <form className="mx-2 mt-10 mb-6" onSubmit={updateBioForm}>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Descrições</Label>
              <Textarea id="bio" placeholder="Fale Sobre voce!"
                {...form.register('bio')}
                defaultValue={auth.userauth?.pessoa?.bio || ''}
                readOnly={editar}
                rows={8}
              />
            </div>

            <div className="flex flex-row items-end justify-end my-5">
              {!editar ? (
                <>
                  <Button className="mx-2 px-6" disabled={loading} variant='secondary'>
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
                }}> Editar </Button>
              )}
            </div>
          </div>
        </form>

        <Separator />
      </CollapsibleContent>
    </Collapsible>
  )
} 