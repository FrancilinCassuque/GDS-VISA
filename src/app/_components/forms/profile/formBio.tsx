'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateBio } from "@/db"
import { authStore } from "@/store"
import { Loader } from "lucide-react"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface IUpdateUser {
  bio: string
}

const bio = z.string({ message: 'Erro! Diga qualquer coisa sobre vc!' }).min(5, 'Escreva mais sobre ti').max(225, 'Queremos Apenas 225 caracteres!')

export const FormBio: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm<IUpdateUser>()
  const auth = authStore()
  const rote=useRouter()

  // const cancelar = () => {
  //   form.setValue('bio', auth.userauth?.pessoa?.bio || '')

  //   setEditar(true)
  // }

  const createBio = form.handleSubmit(async (data: IUpdateUser) => {
    try {
      setLoading(true)

      const id = auth.userauth?.pessoa?.id || ''

      const bioSend = bio.parse(data.bio)

      const response = await updateBio(bioSend, id)

      if (!(response instanceof Error)) {
        const upAuth = auth.userauth

        if (upAuth) {
          upAuth.pessoa.bio = response

          auth.startAuth(upAuth)

          rote.push('/auth/dashboard')
        }
      }
      setLoading(false)

    } catch (erro) {
      setLoading(false)
    }
  })


  return (
    <form className="grid items-start gap-4" onSubmit={createBio}>
      <div className="grid gap-2">
        <Label htmlFor="email">Biografia</Label>
        <Textarea placeholder="Fala um pouco sobre voce..."
          rows={10}
          {...form.register('bio')}
          autoFocus
        />
      </div>
      <Button> {loading ? <Loader className="w-10 animate-spin" /> : 'Salvar'} </Button>
    </form>
  )
} 
