'use client'

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { IconChevronDown } from "../icons"
import { useSession } from "next-auth/react"
import { authStore } from "@/store"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { FileWarning, Loader2, Newspaper, Trash } from "lucide-react"
import Link from "next/link"
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { IService, } from "@/types"
import { ServicoStore, } from "@/db"
import { useRouter } from "next/navigation"
import InputMask from 'react-input-mask'

const clientForm = z.object({
  tipo: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(4, 'Contacto Pequeno de mais').max(30, 'Contacto Grande de mais'),
  nome: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'Nome muito curto!!').max(75, 'Atingiu o Limite de caracter apenas 50'),
  preco: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }),
  descricao: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'muito curto!!').max(225, 'Atingiu o Limite de caracter apenas 50'),
})

interface ICreateProps {
  service?: IService
}
export const NewService: React.FC<ICreateProps> = ({ service }) => {
  const form = useForm<z.infer<typeof clientForm>>({
    resolver: zodResolver(clientForm),
  })

  const [eliminar, SetEliminar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editar, setEditar] = useState(true)
  const AUTH = authStore()
  // const route = useRouter()
  const { status } = useSession()


  async function submitForm(serviceData: z.infer<typeof clientForm>) {
    try {
      setLoading(true)
      const user = AUTH.userauth

      if (user?.id) {

        const service: Omit<IService, 'id'> = {
          tipo: serviceData.tipo,
          nome: serviceData.nome,
          descricao: serviceData.descricao,
          userId: user.id,
          preco: Number.parseInt(serviceData.preco),
        }

        const newService = await ServicoStore(service)

        if (newService instanceof Error) {
          setLoading(false)
          return toast({
            title: 'Error!',
            description: <pre><code> Erro ao Registrar Serviço </code></pre>,
            variant: 'destructive'
          })
        }

        toast({
          title: 'Success',
          description: <pre><code>Serviço Registrado com sucesso.</code></pre>
        })

        cancelar()

        form.setFocus('nome')
      }

    } catch (error) {
      toast({
        title: 'Error!',
        description: <pre><code>Erro ao Registrar novo Serviço</code></pre>,
        variant: 'destructive'
      })
      setLoading(false)
    }
  }

  const cancelar = () => {
    if (service) {
      form.setValue('tipo', service.tipo)
      form.setValue('descricao', service.descricao || '')
      form.setValue('nome', service.nome)
      form.setValue('nome', JSON.stringify(service.preco))

      setEditar(true)
      setLoading(false)
    } else {
      form.setValue('tipo', '')
      form.setValue('descricao', '')
      form.setValue('nome', '')
      form.setValue('preco', '0')

      setEditar(true)
      setLoading(false)
    }

  }

  // const salvar = async () => {
  //   try {
  //     setLoading(true)
  //     const serviceEditar = form.getValues()

  //     if (service) {
  //       const clientData: IClientStore = {
  //         id: service.id,
  //         tipo: serviceEditar.tipo,
  //         nome: serviceEditar.nome,
  //         descricao: serviceEditar.descricao,
  //         userId: service.id,
  //       }

  //       const clientEdited = await ClientUpdate(clientData)

  //       if (clientEdited instanceof Error) {
  //         setLoading(false)
  //         return toast({
  //           title: 'Error!',
  //           description: <pre><code> Erro ao Registrar Serviço </code></pre>,
  //           variant: 'destructive'
  //         })
  //       }

  //       service.descricao = clientEdited.descricao
  //       service.createdAt = clientEdited.createdAt
  //       service.id = clientEdited.id
  //       service.nome = clientEdited.nome
  //       service.tipo = clientEdited.tipo
  //       service.updatedAt = clientEdited.updatedAt

  //       toast({
  //         title: 'Success',
  //         description: <pre><code>Serviço Actualizado com sucesso.</code></pre>
  //       })

  //       cancelar()
  //     }
  //   } catch (error) {
  //     toast({
  //       title: 'Error!',
  //       description: <pre><code>Erro ao Registrar novo Serviço</code></pre>,
  //       variant: 'destructive'
  //     })
  //     setLoading(false)
  //   }
  // }

  // const deleteClient = async () => {
  //   try {
  //     setLoading(true)

  //     if (service) {

  //       const response = await ClientDelete(service.id)

  //       if (response instanceof Error) {
  //         setLoading(false)
  //         return toast({
  //           title: 'Error!',
  //           description: <pre><code> Erro ao Registrar Serviço </code></pre>,
  //           variant: 'destructive'
  //         })
  //       }

  //       route.push('/auth/home')
  //       toast({
  //         title: 'Success',
  //         description: <pre><code>Serviço Eliminado com sucesso.</code></pre>
  //       })
  //     }

  //     setLoading(false)

  //   } catch (error) {
  //     toast({
  //       title: 'Error!',
  //       description: <pre><code>Erro ao Registrar novo Serviço</code></pre>,
  //       variant: 'destructive'
  //     })
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    if (!service) {
      setEditar(false)
    }

  }, [setEditar, service,])

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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">{service?.id ? 'Actualize as Definiçoes do Serviço' : 'Registre Novo Serviço'}</h1>
        <p className="text-muted-foreground md:text-lg">{service?.id ? 'Configura facilmente o Serviço.' : 'Registra facilmente um novo Serviço.'}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mt-10 space-y-8">
            <Collapsible open={true} className="border rounded-lg overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="font-medium">Detalhes do Serviço</div>
                  <div className="text-muted-foreground text-sm">Detalhes sobre o Serviço</div>
                </div>
                <IconChevronDown className="h-5 w-5 transition-transform" />
              </CollapsibleTrigger>

              <CollapsibleContent className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      name="nome"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Serviço</FormLabel>
                          <Input {...field} type="text" placeholder="Visto de Estada Temporaria da CPLP" defaultValue={service?.nome} readOnly={editar} />
                          <FormDescription>Nome Do Serviço</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      name="tipo"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categória</FormLabel>
                          <Input {...field} type="text" placeholder="Visto /  Passagem / Estra" defaultValue={service?.tipo} readOnly={editar} />
                          <FormDescription>tipo do Serviço</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      name="preco"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço do Serviço</FormLabel>
                          <InputMask
                            type='text'
                            mask={'999 999,00'}
                            maskChar={'.'}
                            placeholder='350.000,00'
                            className='border py-1 px-4 w-full rounded-lg'
                            readOnly={editar}
                            defaultValue={service?.preco}
                            {...field} />
                          <FormDescription>infome o preço do Serviço</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <FormField
                      name="descricao"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sobre</FormLabel>
                          <Textarea {...field} placeholder="Descreva o Serviço" defaultValue={service?.descricao || ''} readOnly={editar} />
                          <FormDescription>Decricao do Serviço</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex justify-end">
              <div className="flex items-center justify-center w-full">

                {!service && (
                  <Button disabled={loading} className="w-6/12" >{loading ? <Loader2 className="animate-spin" /> : 'Registar Serviço'}</Button>
                )}

              </div>
            </div>
          </div>
        </form>
      </Form>


      {service && (
        <>
          <div className="flex items-center justify-center w-full my-10" >
            {!editar ? (
              <>
                <Button className="mx-2 px-6" disabled={loading} variant='secondary' onClick={(e) => {
                  e.preventDefault()
                  // salvar()
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
                }} >{loading ? <Loader2 className="animate-spin" /> : 'Configuar Serviço'}</Button>

                <Button variant='destructive' className="mx-4 px-6" disabled={loading}
                  onClick={(e) => {
                    e.preventDefault()
                    SetEliminar(true)
                  }}>{loading ? <Loader2 className="animate-spin" /> : 'Eliminar Serviço'} </Button>
              </div>
            )}
          </div>
        </>
      )}

      <AlertDialog open={eliminar} onOpenChange={SetEliminar}>
        <AlertDialogContent className="w-full mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex flew-col col-end-2 justify-center"><FileWarning /> Eliminar Serviço!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>Tem certeza que pretende Eliminar este Serviço?</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel> Não </AlertDialogCancel>
            <AlertDialogAction className="bg-destructive hover:bg-destructive"><Button variant={'destructive'} onClick={(e) => {
              e.preventDefault()
              // deleteClient()
            }}> Sim, Eliminar <Trash className="h-5 w-5 mx-2" /></Button></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
