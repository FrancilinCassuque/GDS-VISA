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
import { listaDeOcupacoes } from "@/app/_components/listas/listaDeOcupacoes"
import { Input } from "@/components/ui/input"
import { ocupacaoCreate } from "@/db"
import { authStore } from "@/store"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { redirect, useRouter } from "next/navigation"
import { ListaDeCargos } from "@/app/_components/listas/cargos"


const FormSchema = z.object({
  funcao: z.string({ required_error: "Por favor Selecciona a ocupacao..", }),
})

export function FormOcupacao() {
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
      const ocupacao = await ocupacaoCreate({ ...data, profileId: authUser.userauth?.pessoa?.id || '' })

      if (ocupacao instanceof Error) {
        setErro(true)
        setLoading(false)
        return
      }

      setLoading(false)
      toast({
        title: "sucesso!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Ocupacao registrada com sucesso!</code>
          </pre>
        ),
      })
      route.refresh()
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
            control={form.control}
            name="funcao"
            render={({ field }) => (
              <FormItem className="flex flex-col mx-6 w-full">
                <FormLabel>Ocupacao Actual</FormLabel>
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
                          ? ListaDeCargos.superLista.find(
                            (ocupacao) => ocupacao === field.value
                          ) : "Select ocupacao"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Pesquisar..." />
                      <CommandList>
                        <CommandEmpty>Funçao nao Encontrada.</CommandEmpty>
                        <CommandGroup>
                          <span className="m-4">  Cargos de Suporte Administrativo </span>

                          {ListaDeCargos.Administrativo.map((funcao) => (
                            <CommandItem
                              value={funcao}
                              key={funcao}
                              onSelect={() => {
                                form.setValue("funcao", funcao)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  funcao === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {funcao}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />

                        <CommandGroup>
                          <span className="m-4">Cargos de Tecnologia da Informação (TI)</span>
                          {ListaDeCargos.TI.map((funcao) => (
                            <CommandItem
                              value={funcao}
                              key={funcao}
                              onSelect={() => {
                                form.setValue("funcao", funcao)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  funcao === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {funcao}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />

                        <CommandGroup>
                          <span className="m-4">Cargos de Contabilidade e Finanças</span>
                          {ListaDeCargos.financas.map((funcao) => (
                            <CommandItem
                              value={funcao}
                              key={funcao}
                              onSelect={() => {
                                form.setValue("funcao", funcao)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  funcao === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {funcao}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />

                        <CommandGroup>
                          <span className="m-4">Cargos de Gestão</span>
                          {ListaDeCargos.gestao.map((funcao) => (
                            <CommandItem
                              value={funcao}
                              key={funcao}
                              onSelect={() => {
                                form.setValue("funcao", funcao)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  funcao === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {funcao}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator />
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
