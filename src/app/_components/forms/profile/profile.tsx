'use client'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lista } from "../../../../lib/listadepaises"
import { useCallback, useState } from "react"
import { IUserAuth } from "@/types"
import { updateProfile } from "@/db"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { ChevronDown, Loader } from "lucide-react"
import { Separator } from "@/components/ui/separator"

import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import z from 'zod'

const pessoa = z.object({
  apelido: z.string().min(3),
  genero: z.string().min(3),
  nome: z.string().min(3),
  pais: z.string().min(3),
  telefone: z.string().min(3),
  numero: z.string().min(3),
  tipo: z.string().min(3),
})

interface IProfileProps {
  authUser: IUserAuth
}

export const PerfilData: React.FC<IProfileProps> = ({ authUser }) => {
  const [editar, setEditar] = useState(true)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(false)
  const rote = useRouter()

  const form = useForm<z.infer<typeof pessoa>>({
    resolver: zodResolver(pessoa),
  })

  const submitProfileForm = form.handleSubmit(async (data: z.infer<typeof pessoa>) => {
    try {
      setLoading(true)

      if (authUser?.id) {
        const userData = data

        if (userData) {
          if (authUser.pessoa?.id) {
            const perfil = await updateProfile(userData, authUser.pessoa.id, authUser.pessoa.identidade?.id)

            if (perfil instanceof Error) {
              return setErro(true)
            }

            rote.refresh()
            toast.success("Perfil Actualizado com sucesso!")

          } else {
            return setErro(true)
          }
        }

        setEditar(true)
        setLoading(false)
        setErro(false)
      }
    } catch (error) {
      setEditar(true)
      setLoading(false)
    }
  })

  const cancelar = useCallback(() => {
    form.setValue('apelido', authUser?.pessoa?.Apelido || '')
    form.setValue('genero', authUser?.pessoa?.genero || '')
    form.setValue('nome', authUser?.pessoa?.nome || '')
    form.setValue('pais', authUser?.pessoa?.pais || '')
    form.setValue('telefone', authUser?.pessoa?.telefone || '')
    form.setValue('numero', authUser?.pessoa?.identidade?.numero || '')
    form.setValue('tipo', authUser?.pessoa?.identidade?.tipo || '')

    setEditar(true)
  }, [form])


  return (
    <div className="grid grid-cols-1 gap-2 mx-auto">
      <Collapsible className="rounded-lg overflow-hidden" open={true}>
        <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="font-medium">informações Pessoas</div>
            <div className="text-muted-foreground text-sm">detalhes Pessoas</div>
          </div>
          <ChevronDown className="h-5 w-5 transition-transform" />
        </CollapsibleTrigger>

        {erro && (
          <div>
            <Alert variant='destructive'>
              <ExclamationTriangleIcon />
              <AlertTitle>Erro!</AlertTitle>
              <AlertDescription className="flex flex-col">
                <p>
                  Erro ao Registrar Pessoa.
                </p>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <CollapsibleContent className="px-6 py-4 space-y-4">
          <Form {...form} >
            <form className="mx-2 mb-20" onSubmit={submitProfileForm}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="space-y-2 my-2">
                  <FormField name='pais'
                    control={form.control}
                    render={({ field: { onChange, value } }) =>
                      <FormItem>
                        <FormLabel>Nacionalidade</FormLabel>
                        <Select onValueChange={onChange} value={value} required defaultValue={authUser?.pessoa?.pais || ''}
                          disabled={editar}>
                          <SelectTrigger>
                            <SelectValue placeholder="País" />
                          </SelectTrigger>
                          <SelectContent>
                            {Lista.Africa.map((pais, index) => (
                              <SelectItem key={index} value={pais.toUpperCase()}>{pais.toUpperCase()}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Pais de Origem</FormDescription>
                        <FormMessage />
                      </FormItem>
                    } />
                </div>

                {/* <div className="space-y-2 my-2">
                <Label htmlFor="Tipo">Tipo de Pessoa</Label>
                <Controller
                  name='pessoatipo'
                  control={form.control}
                  render={({ field: { onChange, value } }) =>
                    <Select required onValueChange={(e) => {
                      onChange(e)
                      setTipo(e.toUpperCase())
                    }
                    } value={value} defaultValue={authUser?.pessoa?.pessoatipo || ''} disabled={editar}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pessoa Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pessoa Fisíca">Pessoa Fisíca</SelectItem>
                        <SelectItem value="Pessoa Juridíca">Pessoa Juridíca</SelectItem>
                      </SelectContent>
                    </Select>

                  } />
              </div> */}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 my-2">
                  <FormField
                    name="nome"
                    control={form.control}
                    render={({ field }) =>
                      <FormItem>
                        <FormLabel>Nomes Proprio</FormLabel>
                        <Input
                          autoComplete="nome"
                          type="text" {...field}
                          placeholder={'Fulano Beutrano Cicrano'}
                          defaultValue={authUser?.pessoa?.nome || ''} readOnly={editar} />
                        <FormDescription>Todos os nomes Excepto o Apelido</FormDescription>
                        <FormMessage />
                      </FormItem>

                    }
                  />
                </div>

                <div className="space-y-2 my-2">
                  <FormField
                    name="apelido"
                    control={form.control}
                    render={({ field }) =>
                      <FormItem>
                        <FormLabel>Nome de Familía</FormLabel>
                        <Input
                          autoComplete="apelido"
                          type="text" {...field}
                          placeholder={'Fulano Beutrano Cicrano'}
                          defaultValue={authUser?.pessoa?.Apelido || ''} readOnly={editar} />
                        <FormDescription>Ultimo Nome</FormDescription>
                        <FormMessage />
                      </FormItem>
                    } />
                </div>

                <div className="space-y-2 my-2">
                  <FormField
                    name="tipo"
                    control={form.control}
                    render={({ field: { value, onChange } }) =>
                      <FormItem>
                        <FormLabel>Tipo de Documento</FormLabel>
                        <Select onValueChange={onChange} value={value} required
                          disabled={editar}
                          defaultValue={authUser?.pessoa?.identidade?.tipo || ''}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleciona o Tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {Lista.docTypes.map((tipo, index) => (
                              <SelectItem value={tipo.toUpperCase()} key={index}>{tipo.toUpperCase()}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Documento de Identificaçõa</FormDescription>
                        <FormMessage />
                      </FormItem>
                    } />
                </div>

                <div className="space-y-2 my-2">
                  <FormField
                    name="numero"
                    control={form.control}
                    render={({ field }) =>
                      <FormItem>
                        <FormLabel>Número de Documento</FormLabel>
                        <Input {...field} placeholder='Nº do Documento'
                          // readOnly={editar}
                          defaultValue={authUser?.pessoa?.identidade?.numero || ''}
                          readOnly={editar}
                        />
                        <FormDescription>Número de Identificaçõa</FormDescription>
                        <FormMessage />
                      </FormItem>
                    } />
                </div>

                <div className="space-y-2 my-2">
                  <FormField
                    name="telefone"
                    control={form.control}
                    render={({ field }) =>
                      <FormItem>
                        <FormLabel>Número de Contacto</FormLabel>
                        <Input {...field} placeholder='Nº do Telefone'
                          // readOnly={editar}
                          defaultValue={authUser?.pessoa?.identidade?.numero || ''}
                          readOnly={editar}
                        />
                        <FormDescription>Número de Telefone</FormDescription>
                        <FormMessage />
                      </FormItem>
                    } />
                </div>

                <div className="space-y-2 my-2">
                  <FormField
                    name="genero"
                    control={form.control}
                    render={({ field: { value, onChange } }) =>
                      <FormItem>
                        <FormLabel>Genero</FormLabel>
                        <Select required value={value} onValueChange={onChange} defaultValue={authUser?.pessoa?.genero || ''} disabled={editar}>
                          <SelectTrigger>
                            <SelectValue placeholder="Genero" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Masculino">Masculino</SelectItem>
                            <SelectItem value="Femenino">Femenino</SelectItem>
                            <SelectItem value="Outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Genero, escolha outro no casa de Nao Binario!</FormDescription>
                        <FormMessage />
                      </FormItem>
                    } />
                </div>
              </div>

              <div className="flex flex-row items-end justify-end mt-4 mb-3">
                {!editar ? (
                  <>
                    <Button className="mx-2 px-6" disabled={loading} type="submit" variant='secondary'>
                      {loading ? <Loader className="animate-spin h-8 w-8" /> : 'Salvar'}
                    </Button>

                    <Button className="mx-2 px-6" disabled={loading} variant='destructive'
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
                  }}> {authUser?.pessoa?.id ? 'Editar' : 'Registrar'} </Button>
                )}
              </div>

              <Separator />
            </form>
          </Form>
        </CollapsibleContent>
      </Collapsible>
    </div >
  )
}