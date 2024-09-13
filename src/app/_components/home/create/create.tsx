'use client'

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select"
import { IconLeft, IconRight } from "react-day-picker"
import { Controller, useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useCallback, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { IconChevronDown } from "../../icons"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { authStore } from "@/store"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { FileWarning, Loader2, Newspaper } from "lucide-react"
import Link from "next/link"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { IClientStore, TClientShow } from "@/types"
import { storeClient } from "@/db"

const clientForm = z.object({
  telefone: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(9, 'Contacto Pequeno de mais').max(20, 'Contacto Grande de mais'),
  nomecompleto: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'Nome muito curto!!').max(25, 'Atingiu o Limite de caracter apenas 50'),
  descricao: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'muito curto!!').max(225, 'Atingiu o Limite de caracter apenas 50'),
})

interface ICreateProps {
  client?: TClientShow
}
export const CreateClient: React.FC<ICreateProps> = ({ client }) => {
  const form = useForm<z.infer<typeof clientForm>>({
    resolver: zodResolver(clientForm),
  })

  const FormImage = useForm()

  const [loading, setLoading] = useState(false)
  const [editar, setEditar] = useState(true)
  const AUTH = authStore()
  // const route = useRouter()
  const { status } = useSession()

  async function submitForm(clientBody: z.infer<typeof clientForm>) {
    try {
      setLoading(true)
      const user = AUTH.userauth

      if (user?.id) {
        const client: Omit<IClientStore, 'id'> = {
          telefone: clientBody.telefone,
          nomecompleto: clientBody.nomecompleto,
          descricao: clientBody.descricao,
          userId: user.id,
        }

        const newClient = await storeClient(client)

        if (newClient instanceof Error) {
          setLoading(false)
          return toast({
            title: 'Error!',
            description: <pre><code> Erro ao Registrar Cliente </code></pre>,
            variant: 'destructive'
          })
        }


        toast({
          title: 'Success',
          description: <pre><code>Cliente Registrado com sucesso.</code></pre>
        })

        cancelar()

        form.setFocus('nomecompleto')
      }

    } catch (error) {
      toast({
        title: 'Error!',
        description: <pre><code>Erro ao Registrar novo Cliente</code></pre>,
        variant: 'destructive'
      })
      setLoading(false)
    }
  }

  const cancelar = () => {
    form.setValue('telefone', '')
    form.setValue('descricao', '')
    form.setValue('nomecompleto', '')

    setEditar(true)
    setLoading(false)

  }

  const salvar = async () => {
    const formValue = form.getValues()
    console.log(formValue)
  }

  useEffect(() => {
    if (!client) {
      setEditar(false)
    }

  }, [setEditar, client,])

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20">

      {status == 'authenticated' && (
        <AlertDialog open={AUTH.userauth?.pessoa?.identidade?.id ? false : true}>
          <AlertDialogContent className="w-full mx-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex flew-col col-end-2 justify-center"><FileWarning /> Aviso!</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>Registro incompleto, termine o teu registro de Perfil para poder registra Propriedade.</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel> <Link href={'/auth/home'}>Voltar</Link> </AlertDialogCancel>
              <AlertDialogAction><Newspaper className="h-4 w-4 mx-2" /><Link href={'/auth/dashboard/settings'}>Terminar Registro</Link></AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">{client?.id ? 'Actualize As Definiçoes Do Cliente' : 'Registre Novo Cliente'}</h1>
        <p className="text-muted-foreground md:text-lg">{client?.id ? 'Configura facilmente um novo Cliente.' : 'Registra facilmente um novo Cliente.'}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mt-10 space-y-8">
            <Collapsible open={true} className="border rounded-lg overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="font-medium">Detalhes da Cliente</div>
                  <div className="text-muted-foreground text-sm">Forneça detalhes sobre o Cliente a ser Registrado</div>
                </div>
                <IconChevronDown className="h-5 w-5 transition-transform" />
              </CollapsibleTrigger>

              <CollapsibleContent className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="nomecompleto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <Input {...field} type="text" placeholder="Fulano de Tal" />
                          <FormDescription>Primeiro e o Ultimo no Do Cliente</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contacto</FormLabel>
                          <Input {...field} type="text" placeholder="+244 999 000 000" />
                          <FormDescription>Telefone do Cliente</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sobre</FormLabel>
                          <Textarea {...field} placeholder="Descreva o Cliente" />
                          <FormDescription>Decricao do Cliente</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                </div>


              </CollapsibleContent>
            </Collapsible>

            <div className="flex justify-end">
              <div className="flex items-center justify-center w-full">

                {!client && (
                  <Button disabled={loading} className="w-6/12" >{loading ? <Loader2 className="animate-spin" /> : 'Registar Cliente'}</Button>
                )}

              </div>
            </div>
          </div>
        </form>
      </Form>


      {client && (
        <>
          <div className="flex items-center justify-center w-full my-10" >
            {!editar ? (
              <>
                <Button className="mx-2 px-6" disabled={loading} variant='secondary' onClick={(e) => {
                  e.preventDefault()
                  salvar()
                }}>
                  {loading ? <Loader2 className="animate-spin h-8 w-8" /> : 'Salvar'}
                </Button>
                <Button variant='destructive' className="mx-2 px-6" disabled={loading}
                  onClick={(e) => {
                    e.preventDefault()
                    cancelar()
                  }}> Cancelar </Button>
              </>
            ) : (
              <>
                <Button disabled={loading} className="w-6/12" variant={'secondary'} onClick={(e) => {
                  e.preventDefault()
                  setEditar(false)
                  // alert('Clickou...')
                }} >{loading ? <Loader2 className="animate-spin" /> : 'Configuar Cliente'}</Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
