'use client'

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { authStore } from "@/store"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Check, ChevronsUpDown, FileWarning, HandHelpingIcon, Loader2, Newspaper, Trash } from "lucide-react"
import Link from "next/link"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { IClient, IProcesso, IProcessoStore } from "@/types"
import { processoDelete, processoUpdate, storeProcesso } from "@/db"
import { IconChevronDown } from "@/app/_components"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

const clientForm = z.object({
  preco: z.string(),
  estado: z.string(),
  clientId: z.string(),
  tipo: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(4, 'Contacto Pequeno de mais').max(50, 'Contacto Grande de mais'),
  nomecompleto: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'Nome muito curto!!').max(25, 'Atingiu o Limite de caracter apenas 50'),
  descricao: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'muito curto!!').max(225, 'Atingiu o Limite de caracter apenas 50'),
  passaport: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(5, 'Muito curto').max(15, 'Muito longo apenas 15 caracteres'),
})

interface ICreateProps {
  processo?: IProcesso
  clientes?: IClient[]
}

export const estadosDeProcessos = [
  "Pendente a Pagamento",
  "Pendente a Passaporte",
  "Activo",
  "Recusado",
  "Aceite"
]

export const CreateProcess: React.FC<ICreateProps> = ({ processo, clientes }) => {
  if (!clientes) {
    clientes = []
  }

  const form = useForm<z.infer<typeof clientForm>>({
    resolver: zodResolver(clientForm),
  })

  const [loading, setLoading] = useState(false)
  const [eliminar, SetEliminar] = useState(false)
  const [editar, setEditar] = useState(true)
  const AUTH = authStore()
  const route = useRouter()
  const { status } = useSession()

  async function submitForm(body: z.infer<typeof clientForm>) {
    try {
      setLoading(true)
      const user = AUTH.userauth


      if (user?.pessoa?.id) {
        const processo: IProcessoStore = {
          tipo: body.tipo,
          preco: Number.parseInt(body.preco),
          estado: body.estado,
          descricao: body.descricao,
          nomecompleto: body.nomecompleto,
          passaport: body.passaport,
          profileId: user.pessoa.id,
          clientId: body.clientId,
          anexos: []
        }

        const novoProcesso = await storeProcesso(processo)

        if (novoProcesso instanceof Error) {
          setLoading(false)
          return toast({
            title: 'Error!',
            description: <pre><code> Erro ao Registrar Processo </code></pre>,
            variant: 'destructive'
          })
        }

        toast({
          title: 'Success',
          description:
            <pre>
              <HandHelpingIcon />
              <code>Processo Registrado com sucesso.</code>
            </pre>
        })

        cancelar()

        form.setFocus('nomecompleto')
      }

    } catch (error) {
      toast({
        title: 'Error!',
        description: <pre><code>Erro ao Registrar novo Processo</code></pre>,
        variant: 'destructive'
      })
      setLoading(false)
    }
  }

  const cancelar = () => {
    if (processo) {
      form.setValue('tipo', processo.tipo)
      form.setValue('descricao', processo.descricao)
      form.setValue('nomecompleto', processo.nomecompleto)
      form.setValue('estado', processo.estado)
      form.setValue('preco', JSON.stringify(processo.preco))
      form.setValue('passaport', processo.passaport)
      form.setValue('clientId', processo.clientId)
      setEditar(true)
    } else {
      form.setValue('tipo', '')
      form.setValue('descricao', '')
      form.setValue('nomecompleto', '')
      form.setValue('estado', 'Pendente')
      form.setValue('preco', '')
      form.setValue('passaport', '')
      form.setValue('clientId', '')
      setEditar(false)
    }

    setLoading(false)

  }

  const salvar = async () => {
    try {
      const formValue = form.getValues()
      setLoading(true)

      if (processo) {
        const processoDate: IProcessoStore = {
          tipo: formValue.tipo,
          preco: Number.parseInt(formValue.preco),
          estado: formValue.estado,
          descricao: formValue.descricao,
          nomecompleto: formValue.nomecompleto,
          passaport: formValue.passaport,
          profileId: processo.profileId,
          clientId: formValue.clientId,
          anexos: []
        }

        const novoProcesso = await processoUpdate(processo.id, processoDate, processo.preco)

        if (novoProcesso instanceof Error) {
          setLoading(false)
          return toast({
            title: 'Error!',
            description: <pre><code> Erro ao Actualizar Processo </code></pre>,
            variant: 'destructive'
          })
        }

        toast({
          title: 'Success',
          description:
            <pre>
              <HandHelpingIcon />
              <code>Processo Actualizado com sucesso.</code>
            </pre>
        })

        processo.nomecompleto = novoProcesso.nomecompleto
        processo.descricao = novoProcesso.descricao
        processo.passaport = novoProcesso.passaport
        processo.clientId = novoProcesso.clientId
        processo.estado = novoProcesso.estado
        processo.preco = novoProcesso.preco
        processo.tipo = novoProcesso.tipo

        cancelar()
      }
    } catch (error) {
      toast({
        title: 'Error!',
        description: <pre><code>Erro ao Actualizar Processo</code></pre>,
        variant: 'destructive'
      })
      setLoading(false)
    }


  }

  const deletarProcesso = async () => {
    try {
      if (processo) {
        setLoading(true)

        const response = await processoDelete(processo.id)

        if (response instanceof Error) {
          setLoading(false)
          return toast({
            title: 'Error!',
            description: <pre><code> Erro ao Eliminar Processo </code></pre>,
            variant: 'destructive'
          })
        }

        route.push('/auth/home')
        toast({
          title: 'Success',
          description: <pre><code>Processo Eliminado com sucesso.</code></pre>
        })
      }
    } catch (error) {
      setLoading(false)

      toast({
        title: 'Error!',
        description: <pre><code>Erro ao Eliminar Processo</code></pre>,
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    if (!processo) {
      setEditar(false)
    }

  }, [setEditar, processo,])

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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">{processo?.id ? 'Actualize as Definiçoes do Processo' : 'Registre Novo Processo'}</h1>
        <p className="text-muted-foreground md:text-lg">{processo?.id ? 'Configura facilmente o Processo.' : 'Registra facilmente um novo Processo.'}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mt-10 space-y-8">
            <Collapsible open={true} className="border rounded-lg overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="font-medium">Detalhes da Processo</div>
                  <div className="text-muted-foreground text-sm">Forneça detalhes sobre o Processo a ser Registrado</div>
                </div>
                <IconChevronDown className="h-5 w-5 transition-transform" />
              </CollapsibleTrigger>

              <CollapsibleContent className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <FormField
                      name="nomecompleto"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <Input {...field} type="text" placeholder="Fulano de Tal" defaultValue={processo?.nomecompleto || ''} readOnly={editar} />
                          <FormDescription>Primeiro e o Ultimo nome Do Cliente</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      name="passaport"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passaport</FormLabel>
                          <Input type="text" {...field} placeholder="N0000001" defaultValue={processo?.passaport || ''} readOnly={editar} />
                          <FormDescription>Nº Passaporte do Cliente.</FormDescription>
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
                          <FormLabel>Categoria</FormLabel>
                          <Input {...field} type="text" placeholder="Visto de Turismo" defaultValue={processo?.tipo || ''} readOnly={editar} />
                          <FormDescription>Informa a categoria do Serviço</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                  <div className="space-y-2 my-4">
                    <FormField
                      name="estado"
                      control={form.control}
                      defaultValue={processo?.estado || ''}
                      render={({ field: { value, onChange } }) =>
                        <FormItem>
                          <FormLabel>Estado do Processo</FormLabel>
                          <Select onValueChange={onChange} value={value} required open={editar ? false : undefined}
                          // defaultValue={auth.userauth?.pessoa?.identidade?.tipo || ''}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona o Estado" />
                            </SelectTrigger>
                            <SelectContent>
                              {estadosDeProcessos.map((estado, index) => (
                                <SelectItem value={estado} key={index}>{estado}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>Informa Em qual estado se encontra o processo, selecione pendente em caso de ñ pagamento.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      } />
                  </div>

                  <div className="space-y-2 my-4">
                    <FormField
                      name="clientId"
                      control={form.control}
                      defaultValue={processo?.clientId || ''}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Cliente Responsavél pelo Processo</FormLabel>
                          <Popover open={editar ? false : undefined} >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-auto justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? clientes.find(
                                      (client) => client.id === field.value
                                    )?.nomecompleto : "Qual é o Cliente"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Pesquisar..." />
                                <CommandList>
                                  <CommandEmpty>
                                    Cliente não Encontrado. <br />
                                    <Link href={'/auth/client/create'}>Registrar novo Cliente</Link>
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {/* <span className="m-4">  Clientes Disponíveis </span> */}

                                    {clientes.map((client) => (
                                      <CommandItem
                                        value={client.id}
                                        key={client.id}
                                        onSelect={() => {
                                          form.setValue("clientId", client.id)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            client.id === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {client.nomecompleto}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormDescription>Seleciona o cliente responsavél pelo Processo.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2 my-4">
                    <FormField
                      name="preco"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço do Processo</FormLabel>
                          <Input {...field} type="number" placeholder="100000" defaultValue={processo?.preco || ''} readOnly={editar} />
                          <FormDescription>Informa o Preço do Serviço</FormDescription>
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
                          <Textarea {...field} placeholder="Descreva o Cliente" defaultValue={processo?.descricao || ''} readOnly={editar} />
                          <FormDescription>Decricao do Cliente</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                </div>


              </CollapsibleContent>
            </Collapsible>

            <div className="flex items-center justify-center w-full">
              {!processo && (
                <Button disabled={loading} className="w-6/12" >{loading ? <Loader2 className="animate-spin" /> : 'Registar processo'}</Button>
              )}
            </div>
          </div>
        </form>
      </Form>


      {processo && (
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
                }} >{loading ? <Loader2 className="animate-spin" /> : 'Configuar Processo'}</Button>

                <Button variant='destructive' className="mx-4 px-6" disabled={loading}
                  onClick={(e) => {
                    e.preventDefault()
                    SetEliminar(true)
                  }}>{loading ? <Loader2 className="animate-spin" /> : 'Eliminar Processo'} </Button>
              </div>
            )}

            <AlertDialog open={eliminar} onOpenChange={SetEliminar}>
              <AlertDialogContent className="w-full mx-auto">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex flew-col col-end-2 justify-center"><FileWarning /> Eliminar Processo!</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>Tem certeza que pretende Eliminar este Processo?</AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel> Não </AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive"><Button variant={'destructive'} onClick={(e) => {
                    e.preventDefault()
                    deletarProcesso()
                  }}> Sim, Eliminar <Trash className="h-5 w-5 mx-2" /></Button></AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </div>
  )
}
