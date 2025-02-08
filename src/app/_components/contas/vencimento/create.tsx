'use client'

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"
import { authStore } from "@/store"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { FileWarning, Loader2, Newspaper, Trash } from "lucide-react"
import Link from "next/link"
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { IClientStore, IProcesso, TClientShow } from "@/types"
import { ClientDelete, ClientUpdate, storeClient } from "@/db"
import { useRouter } from "next/navigation"
import InputMask from 'react-input-mask'
import { IconChevronDown } from "../.."

const clientForm = z.object({
  telefone: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(9, 'Contacto Pequeno de mais').max(20, 'Contacto Grande de mais'),
  nomecompleto: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'Nome muito curto!!').max(25, 'Atingiu o Limite de caracter apenas 50'),
  descricao: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'muito curto!!').max(225, 'Atingiu o Limite de caracter apenas 50'),
})

interface ICreateProps {
  client?: TClientShow
}
export const CreateVencimento: React.FC<ICreateProps> = ({ client }) => {
  const form = useForm<z.infer<typeof clientForm>>({
    resolver: zodResolver(clientForm),
  })

  const [escolhidos, setEscolhidos] = useState<IProcesso[]>([])
  const [eliminar, SetEliminar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editar, setEditar] = useState(true)
  const AUTH = authStore()
  const route = useRouter()
  const { status } = useSession()


  function listaDeSelecionados(lista: IProcesso[]) {
    return setEscolhidos(lista)
  }

  async function submitForm(clientBody: z.infer<typeof clientForm>) {
    try {
      setLoading(true)
      const user = AUTH.userauth

      if (user?.id) {

        const clientData: Omit<IClientStore, 'id'> = {
          telefone: clientBody.telefone,
          nomecompleto: clientBody.nomecompleto,
          descricao: clientBody.descricao,
          userId: user.id,
        }

        const newClient = await storeClient(clientData)

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
    if (client) {
      form.setValue('telefone', client.telefone)
      form.setValue('descricao', client.descricao || '')
      form.setValue('nomecompleto', client.nomecompleto)

      setEditar(true)
      setLoading(false)
    } else {
      form.setValue('telefone', '')
      form.setValue('descricao', '')
      form.setValue('nomecompleto', '')

      setEditar(false)
      setLoading(false)
    }

  }

  const salvar = async () => {
    try {
      setLoading(true)
      const clientEditar = form.getValues()

      if (client) {
        const clientData: IClientStore = {
          id: client.id,
          telefone: clientEditar.telefone,
          nomecompleto: clientEditar.nomecompleto,
          descricao: clientEditar.descricao,
          userId: client.id,
        }

        const clientEdited = await ClientUpdate(clientData)

        if (clientEdited instanceof Error) {
          setLoading(false)
          return toast({
            title: 'Error!',
            description: <pre><code> Erro ao Registrar Cliente </code></pre>,
            variant: 'destructive'
          })
        }

        client.descricao = clientEdited.descricao
        client.createdAt = clientEdited.createdAt
        client.id = clientEdited.id
        client.nomecompleto = clientEdited.nomecompleto
        client.telefone = clientEdited.telefone
        client.updatedAt = clientEdited.updatedAt

        toast({
          title: 'Success',
          description: <pre><code>Cliente Actualizado com sucesso.</code></pre>
        })

        cancelar()
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

  const deleteClient = async () => {
    try {
      setLoading(true)

      if (client) {

        const response = await ClientDelete(client.id)

        if (response instanceof Error) {
          setLoading(false)
          return toast({
            title: 'Error!',
            description: <pre><code> Erro ao Registrar Cliente </code></pre>,
            variant: 'destructive'
          })
        }

        route.push('/auth/home')
        toast({
          title: 'Success',
          description: <pre><code>Cliente Eliminado com sucesso.</code></pre>
        })
      }

      setLoading(false)

    } catch (error) {
      toast({
        title: 'Error!',
        description: <pre><code>Erro ao Registrar novo Cliente</code></pre>,
        variant: 'destructive'
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!client) {
      setEditar(false)
    }

  }, [setEditar, client,])

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">{client?.id ? 'Actualize as Definiçoes do Salário' : 'Registre Novo Salário'}</h1>
        <p className="text-muted-foreground md:text-lg">{client?.id ? 'Configura facilmente o Salário.' : 'Registra facilmente um novo Salário.'}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mt-10 space-y-8">
            <Collapsible open={true} className="border rounded-lg overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="font-medium">Detalhes do Salário</div>
                  <div className="text-muted-foreground text-sm">Detalhes sobre o Salário</div>
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
                          <FormLabel>Salário Base</FormLabel>
                          <Input {...field} type="text" placeholder="Valor do Salário Base" defaultValue={client?.nomecompleto} readOnly={editar} />
                          <FormDescription>Primeiro e o Ultimo no Do Cliente</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Abono</FormLabel>
                          <Input {...field} type="text" placeholder="Abono de transporte" defaultValue={client?.descricao || ''} readOnly={editar} />
                          <FormDescription>Decricao do Cliente</FormDescription>
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
                          <FormLabel>Valor</FormLabel>
                          {/* <Input {...field} type="text" placeholder="+244 999 000 000" defaultValue={client?.telefone} readOnly={editar} /> */}
                          <InputMask
                            type='number'
                            mask={'9 999 999,00'}
                            maskChar={' '}
                            placeholder='Valor do Abono'
                            className='border py-1 px-4 w-full rounded-lg'
                            readOnly={editar}
                            defaultValue={client?.telefone}
                            {...field} />

                          <FormDescription>Telefone do Cliente</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                </div>

                {/* {client && (
                  <div className="space-y-2 my-4 min-w-full">
                    <TabelaDeDados
                      colunaModel={columnsProcesso}
                      listaDeDados={client?.processos || []}
                      dataOnly={false}
                      dataProcessos={listaDeSelecionados}
                      listaDe="Processos"
                      listaPrint={<TabelaProcessos processos={escolhidos} printOnly={true} />}
                    />
                  </div>
                )} */}

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
              <div className="flex items-center justify-between w-full">

                <Button disabled={loading} className="w-6/12" variant={'secondary'} onClick={(e) => {
                  e.preventDefault()
                  setEditar(false)
                }} >{loading ? <Loader2 className="animate-spin" /> : 'Configuar Cliente'}</Button>

                <Button variant='destructive' className="mx-4 px-6" disabled={loading}
                  onClick={(e) => {
                    e.preventDefault()
                    SetEliminar(true)
                  }}>{loading ? <Loader2 className="animate-spin" /> : 'Eliminar Cliente'} </Button>
              </div>
            )}
          </div>
        </>
      )}

      <AlertDialog open={eliminar} onOpenChange={SetEliminar}>
        <AlertDialogContent className="w-full mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex flew-col col-end-2 justify-center"><FileWarning /> Eliminar Cliente!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>Tem certeza que pretende Eliminar este Cliente?</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel> Não </AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive"><Button variant={'destructive'} onClick={(e) => {
              e.preventDefault()
              deleteClient()
            }}> Sim, Eliminar <Trash className="h-5 w-5 mx-2" /></Button></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
