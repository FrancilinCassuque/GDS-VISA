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
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { authStore, ClientStore } from "@/store"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Check, ChevronsUpDown, FileWarning, HandHelpingIcon, Loader2, Newspaper } from "lucide-react"
import Link from "next/link"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { IClient, IProcessoStore, TClientShow } from "@/types"
import { ClientIndex, storeProcesso } from "@/db"
import { IconChevronDown } from "@/app/_components"
import { error } from "console"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

const clientForm = z.object({
  preco: z.string(),
  estado: z.enum(['Pendente', 'Activo', 'Recusado', 'Aceite']),
  clientId: z.string(),
  tipo: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(4, 'Contacto Pequeno de mais').max(50, 'Contacto Grande de mais'),
  nomecompleto: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'Nome muito curto!!').max(25, 'Atingiu o Limite de caracter apenas 50'),
  descricao: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'muito curto!!').max(225, 'Atingiu o Limite de caracter apenas 50'),
  passaport: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(5, 'Muito curto').max(15, 'Muito longo apenas 15 caracteres'),
})

interface ICreateProps {
  client?: TClientShow
  clientes?: IClient[]
}

const estados = [
  "Pendente",
  "Activo",
  "Recusado",
  "Aceite"
]

export const CreateProcess: React.FC<ICreateProps> = ({ client, clientes }) => {
  if (!clientes) {
    clientes = []
  }

  const form = useForm<z.infer<typeof clientForm>>({
    resolver: zodResolver(clientForm),
  })

  const [loading, setLoading] = useState(false)
  const [editar, setEditar] = useState(true)
  const AUTH = authStore()
  // const route = useRouter()
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
            description: <pre><code> Erro ao Registrar Cliente </code></pre>,
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
    form.setValue('tipo', '')
    form.setValue('descricao', '')
    form.setValue('nomecompleto', '')
    form.setValue('estado', 'Pendente')
    form.setValue('preco', '')
    form.setValue('passaport', '')
    form.setValue('clientId', '')

    // setEditar(true)
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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">{client?.id ? 'Actualize As Definiçoes Do Processo' : 'Registre Novo Processo'}</h1>
        <p className="text-muted-foreground md:text-lg">{client?.id ? 'Configura facilmente um novo Processo.' : 'Registra facilmente um novo Processo.'}</p>
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
                      control={form.control}
                      name="nomecompleto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <Input {...field} type="text" placeholder="Fulano de Tal" />
                          <FormDescription>Primeiro e o Ultimo nome Do Cliente</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="passaport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passaport</FormLabel>
                          <Input type="text" {...field} placeholder="N0000001" />
                          <FormDescription>Nº Passaporte do Cliente.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="tipo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Input {...field} type="text" placeholder="Visto de Turismo" />
                          <FormDescription>Informa a categoria do Serviço</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                  <div className="space-y-2 my-4">
                    <FormField
                      name="estado"
                      control={form.control}
                      render={({ field: { value, onChange } }) =>
                        <FormItem>
                          <FormLabel>Estado do Processo</FormLabel>
                          <Select onValueChange={onChange} value={value} required
                            disabled={editar}
                          // defaultValue={auth.userauth?.pessoa?.identidade?.tipo || ''}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleciona o Estado" />
                            </SelectTrigger>
                            <SelectContent>
                              {estados.map((estado, index) => (
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
                      control={form.control}
                      name="clientId"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Cliente Responsavél pelo Processo</FormLabel>
                          <Popover>
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
                      control={form.control}
                      name="preco"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço do Processo</FormLabel>
                          <Input {...field} type="number" placeholder="100000" />
                          <FormDescription>Informa o Preço do Serviço</FormDescription>
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
