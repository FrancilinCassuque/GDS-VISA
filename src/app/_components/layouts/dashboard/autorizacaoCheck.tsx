"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown, Loader2, Newspaper } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { ocupacaoCreate, ocupacaoUpdate } from "@/db"
import { authStore } from "@/store"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { ListaDeCargos } from "@/app/_components/listas/cargos"
import { Input } from "@/components/ui/input"


const FormSchema = z.object({
  funcao: z.string({ required_error: "Por favor Selecciona a ocupacao..", }),
})

interface IOcupacaoProps {
  update?: boolean
  id?: number
}

export const AutorizacaoCheck: React.FC<IOcupacaoProps> = ({ update, id }) => {
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(false)
  const authUser = authStore()
  const route = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)

      if (update) {
        if (id) {
          const ocupacao = await ocupacaoUpdate(id, data.funcao)

          if (ocupacao instanceof Error) {
            setErro(true)
            setLoading(false)
            return
          }
          const upAuth = authUser.userauth
    
          if (upAuth) {
            upAuth.pessoa.funcoes = ocupacao
    
            authUser.startAuth(upAuth)
    
            route.push('/auth/home')
          }
          setLoading(false)
    
          toast({
            title: "sucesso!",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">Perfil Actualizado com sucesso!</code>
              </pre>
            ),
          })
        }

      } else {
        const ocupacao = await ocupacaoCreate({ ...data, profileId: authUser.userauth?.pessoa?.id || '' })

        if (ocupacao instanceof Error) {
          setErro(true)
          setLoading(false)
          return
        }
        const upAuth = authUser.userauth
  
        if (upAuth) {
          upAuth.pessoa.funcoes = ocupacao
  
          authUser.startAuth(upAuth)
  
          route.push('/auth/dashboard')
        }
        setLoading(false)
  
        toast({
          title: "sucesso!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Perfil Actualizado com sucesso!</code>
            </pre>
          ),
        })
      }

    } catch (error) {
      setErro(true)
      setLoading(false)
      return
    }
  }

  return (
    <Form {...form}>

<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center w-full mt-10">

  {erro && (
    <div>
      <Alert variant='destructive'>
        <ExclamationTriangleIcon />
        <AlertTitle>Erro!</AlertTitle>
        <AlertDescription className="flex flex-col text-center">
          <p>
            Erro ao Registrar Ocupacao!.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  )}

  <div className="flex flex-col items-center justify-center w-full">
    <FormField
      // control={form.control}
      name="funcao"
      render={({ field }) => (
        <FormItem className="flex flex-col mx-6 w-full">
          <FormLabel>Ocupacao Actual</FormLabel>
          <Input type="text" />
          <FormDescription>
            O que fazes?
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
  <Button type="submit" className="w-11/12" disabled={loading}> {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}</Button>
</form>
</Form>
  )
}
