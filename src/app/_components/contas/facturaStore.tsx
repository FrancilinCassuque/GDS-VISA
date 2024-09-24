'use client'

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select"
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
import { Check, ChevronsUpDown, FileWarning, HandHelpingIcon, Loader2, Newspaper } from "lucide-react"
import Link from "next/link"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { IClient, IFactura, IFacturaStore, IProcesso, TClientShow } from "@/types"
import { columnsCliente, columnsProcesso, IconChevronDown, TabelaClientes, TabelaDeDados, TabelaProcessos } from "@/app/_components"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { facturaStoreService } from "@/db"

export const estados = [
  '1ª Parcela Pendente',
  '2ª Parcela Pendente',
  '1ª Pago',
  '2ª Pago',
  'Cancelado',
  'Aguardando Reembolso',
  'Reembolsado',
  'Total Pago'
]

const facturaForm = z.object({
  desconto: z.string(),
  total: z.string(),
  valorApagar: z.string(),
  valorEmFalta: z.string(),
  estado: z.string(),
  clientId: z.string(),
  descricao: z.string({ required_error: "Campo de Preechimento Obrigatorio!" }).min(3, 'muito curto!!').max(225, 'Atingiu o Limite de caracter apenas 50'),
})

interface IFacturaProps {
  factura?: IFactura
  clientes?: IClient[]
  processos?: IProcesso[]
}


export const FacturaStore: React.FC<IFacturaProps> = ({ factura, clientes, processos }) => {
  const form = useForm<z.infer<typeof facturaForm>>({
    resolver: zodResolver(facturaForm),
  })

  const [loading, setLoading] = useState(false)
  const [editar, setEditar] = useState(true)

  const AUTH = authStore()
  const rote = useRouter()
  const { status } = useSession()
  const [processosList, setProcessosList] = useState<IProcesso[]>([])
  const [escolhidos, setEscolhidos] = useState<IProcesso[]>([])
  const [selectedClient, setSelectedClient] = useState('')

  if (!clientes) {
    clientes = []
  }

  if (!processos) {
    processos = []
  }

  function listaDeSelecionados(lista: IProcesso[]) {
    return setEscolhidos(lista)
  }

  async function submitForm(body: z.infer<typeof facturaForm>) {
    try {
      setLoading(true)
      const user = AUTH.userauth


      if (user?.pessoa?.id) {

        const store: IFacturaStore = {
          desconto: Number.parseInt(body.desconto),
          estado: body.estado,
          descricao: body.descricao,
          profileId: user.pessoa.id,
          clientId: body.clientId,
        }

        const novaFactura = await facturaStoreService(store, escolhidos)

        if (novaFactura instanceof Error) {
          setLoading(false)
          return toast({
            title: 'Error!',
            description: <pre><code> Erro ao Registrar Cliente {JSON.stringify(novaFactura)} </code></pre>,
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

        form.setFocus('desconto')
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
    if (factura) {
      form.setValue('descricao', factura.descricao)
      form.setValue('estado', factura.estado)
      form.setValue('desconto', JSON.stringify(factura.desconto))
      form.setValue('clientId', factura.clientId)
    } else {
      form.setValue('descricao', '')
      form.setValue('estado', '1ª Parcela Pendente')
      form.setValue('desconto', '')
      form.setValue('clientId', '')
    }

    setEditar(true)
    setLoading(false)

  }

  const salvar = async () => {
    // const formValue = form.getValues()
    // console.log(formValue)
  }

  useEffect(() => {
    if (processos.length > 0) {
      const processosDoClient = processos.filter((processo, i) => {
        if (processo.clientId == selectedClient) {
          return processo
        }
      })

      setProcessosList(processosDoClient)
    }

  }, [selectedClient, setSelectedClient])


  useEffect(() => {
    if (!factura) {
      setEditar(false)
    }
  }, [setEditar, factura,])


  useEffect(() => {
    if (factura) {
      const processosDaFactura: IProcesso[] = []
      processos.filter(processo => {
        factura.processosId.map(id => {
          if (processo.id == id) {
            processosDaFactura.push(processo)
            return processo
          }
        })
      })

      setProcessosList(processosDaFactura)
    }
  }, [editar])

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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">{factura?.id ? 'Actualize A Factura' : 'Registre Nova Factura'}</h1>
        <p className="text-muted-foreground md:text-lg">{factura?.id ? 'Configura facilmente uma Factura.' : 'Registra facilmente uma nova Factura.'}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mt-10 space-y-8">
            <Collapsible open={true} className="border rounded-lg overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="font-medium">Detalhes da Factura</div>
                  <div className="text-muted-foreground text-sm">Forneça detalhes sobre a Factura a ser Registrada</div>
                </div>
                <IconChevronDown className="h-5 w-5 transition-transform" />
              </CollapsibleTrigger>

              <CollapsibleContent className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  <div className="space-y-2 my-4">
                    <FormField
                      name="clientId"
                      control={form.control}
                      defaultValue={factura?.clientId || ''}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Cliente Responsavél pela Factura</FormLabel>
                          <Popover open={editar ? false : undefined}>
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
                                          setSelectedClient(client.id)
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
                          <FormDescription>Seleciona o cliente responsavél pela Factura.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2 my-4">
                    <FormField
                      name="estado"
                      control={form.control}
                      defaultValue={factura?.estado}
                      render={({ field: { value, onChange } }) =>
                        <FormItem>
                          <FormLabel>Estado da Factura</FormLabel>
                          <Select onValueChange={onChange} value={value} required
                            open={editar ? false : undefined}
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
                          <FormDescription>Informa Em qual estado se encontra a Factura, selecione pendente em caso de ñ pagamento.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      } />
                  </div>

                  <div className="space-y-2 my-4">
                    <FormField
                      name="desconto"
                      defaultValue={JSON.stringify(factura?.desconto)}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor do Desconto Aplicado</FormLabel>
                          <Input {...field} type="number" placeholder="100000" readOnly={editar} />
                          <FormDescription>Informa o valor, zero no caso de não haver.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>

                  {factura && (
                    <>

                      <div className="space-y-2 my-4">
                        <FormField
                          name="valorApagar"
                          defaultValue={JSON.stringify(factura?.valorApagar)}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valor a Cobrar</FormLabel>
                              <Input {...field} type="number" placeholder="100000" readOnly={true} />
                              <FormDescription>Valor a pagar pela factura actual.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )} />
                      </div>

                      <div className="space-y-2 my-4">
                        <FormField
                          name="valorEmFalta"
                          defaultValue={JSON.stringify(factura?.valorEmFalta)}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valor em Falta</FormLabel>
                              <Input {...field} type="number" placeholder="100000" readOnly={true} />
                              <FormDescription>Valor a pagar na proxima factura.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )} />
                      </div>

                      <div className="space-y-2 my-4">
                        <FormField
                          name="total"
                          defaultValue={JSON.stringify(factura?.total)}
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valor Total da Factura</FormLabel>
                              <Input {...field} type="number" placeholder="100000" readOnly={true} />
                              <FormDescription>Valor total a pagar pela factura.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )} />
                      </div>
                    </>
                  )}

                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <FormField
                      name="descricao"
                      control={form.control}
                      defaultValue={factura?.descricao}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sobre</FormLabel>
                          <Textarea {...field} placeholder="Descreva o Cliente" readOnly={editar} />
                          <FormDescription>Descrição da Factura</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                </div>

                <div className="space-y-2 my-4 min-w-full">
                  <TabelaDeDados
                    colunaModel={columnsProcesso}
                    listaDeDados={processosList}
                    dataOnly={true}
                    dataProcessos={listaDeSelecionados}
                    listaDe="Processos"
                    listaPrint={<TabelaProcessos processos={escolhidos} printOnly={true} />}
                  />

                </div>

              </CollapsibleContent>
            </Collapsible>

            <div className="flex justify-end">
              <div className="flex items-center justify-center w-full">

                {!factura && (
                  <Button disabled={loading} className="w-6/12" >{loading ? <Loader2 className="animate-spin" /> : 'Registar Factura'}</Button>
                )}

              </div>
            </div>
          </div>
        </form>
      </Form>


      {factura && (
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
                }} >{loading ? <Loader2 className="animate-spin" /> : 'Editar Factura'}</Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}