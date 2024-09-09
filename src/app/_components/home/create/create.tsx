'use client'

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { IconLeft, IconRight } from "react-day-picker"
import { Controller, useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useCallback, useState } from "react"
import { Input } from "@/components/ui/input"
import { IconChevronDown } from "../../icons"
import { useSession } from "next-auth/react"
import { CasaStore } from "@/db/client/homeService"
import { useRouter } from "next/navigation"
import { authStore } from "@/store"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { FileWarning, Newspaper } from "lucide-react"
import Link from "next/link"

interface ICasaProps {
  id?: string
  name?: string
  quarto?: string
  sala?: string
  casadebanho?: string
  cozinha?: string
  quintal?: string
  tipo?: string

  userEmail?: string
  descricao?: string

  rua?: string
  bairro?: string
  comuna?: string
  municipio?: string
  provincia?: string
  pais?: string
  casaId?: string
}

export const CreateHome: React.FC = () => {
  const { register, handleSubmit, control } = useForm()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)
  const user = authStore.getState()
  const route = useRouter()
  const { status } = useSession()

  const submitForm = handleSubmit(async (casa: ICasaProps) => {
    try {
      setLoading(true)
      next()
      casa.userEmail = user.userauth?.email || ''

      const casaNova = await CasaStore({
        casadebanho: casa.casadebanho,
        quintal: casa.quintal,
        cozinha: casa.cozinha,
        userEmail: casa.userEmail,
        quarto: casa.quarto,
        sala: casa.sala,
        tipo: casa.tipo,
        name: casa.name,
        rua: casa.rua,
        bairro: casa.bairro,
        comuna: casa.comuna,
        municipio: casa.municipio,
        provincia: casa.provincia,
        pais: casa.pais,
        descricao: casa.descricao
      })

      if (casaNova instanceof Error) {
        setLoading(false)
        toast({
          title: 'Error!',
          description: <pre><code> {casaNova.message} </code></pre>,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Success',
          description: <pre><code>Residência Registrada com sucesso.</code></pre>
        })

        setLoading(false)
        route.push(`/auth/dashboard/${user.userauth?.id}`)
      }

    } catch (error) {
      toast({
        title: 'Error!',
        description: <pre><code>Erro ao Registrar nova Residencia</code></pre>,
        variant: 'destructive'
      })
      setLoading(false)
      next()
    }
  })

  const next = useCallback(() => {
    if (step >= 3) { return setStep(0) }
    setStep(step + 1)

  }, [step])

  const prev = useCallback(() => {
    if (step < 0) { return setStep(0) }
    setStep(step - 1)
  }, [step])

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20">

      {status == 'authenticated' && (
        <AlertDialog open={user.userauth?.pessoa?.identidade?.id ? false : true}>
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
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Registre a sua casa</h1>
        <p className="text-muted-foreground md:text-lg">Adicione facilmente o seu imóvel ao nosso sistema de gestão de residência.</p>
      </div>

      <form onSubmit={submitForm}>
        <div className="mt-10 space-y-8">
          <Collapsible open={step == 0} className="border rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="font-medium">Endereço</div>
                <div className="text-muted-foreground text-sm">Forneça Endereço da Propriedade</div>
              </div>
              <IconChevronDown className="h-5 w-5 transition-transform" />
            </CollapsibleTrigger>

            <CollapsibleContent className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rua">Rua & Nº.</Label>
                  <Input {...register('rua')} id="rua" placeholder="Fapa - 12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro / Quarteirão</Label>
                  <Input {...register('bairro')} id="bairro" placeholder="Bairro da Paz" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comuna">Distrito / Comuna</Label>
                  <Input {...register('comuna')} id="comuna" placeholder="Ngalo-Kiluanje" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="municipio">Município</Label>
                  <Input {...register('municipio')} id="municipio" placeholder="Sambizanga" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provincia">Província</Label>
                  <Input {...register('provincia')} id="provincia" placeholder="Luanda" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pais">Pais</Label>
                  <Input {...register('pais')} id="pais" placeholder="Angola" defaultValue="Angola" readOnly={true} />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={step == 1} className="border rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="font-medium">Detalhes da Propriedade</div>
                <div className="text-muted-foreground text-sm">Forneça detalhes sobre a propriedade</div>
              </div>
              <IconChevronDown className="h-5 w-5 transition-transform" />
            </CollapsibleTrigger>

            <CollapsibleContent className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Quarto">Quarto</Label>
                  <Controller
                    name='quarto'
                    control={control}
                    render={({ field: { onChange, value } }) =>
                      <Select required onValueChange={onChange} value={value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>

                    } />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sala">Sala</Label>
                  <Controller
                    name='sala'
                    control={control}
                    render={({ field: { onChange, value } }) =>
                      <Select required value={value} onValueChange={onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sem">Sem Sala</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    } />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Casa de banho">Casa de banho</Label>
                  <Controller
                    name='casadebanho'
                    control={control}
                    render={({ field: { onChange, value } }) =>
                      <Select onValueChange={onChange} value={value} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sem">Sem Casa de Banho</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    } />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quintal">Quintal</Label>
                  <Controller
                    name='quintal'
                    control={control}
                    render={({ field: { onChange, value } }) =>
                      <Select value={value} onValueChange={onChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Particular">Particular</SelectItem>
                          <SelectItem value="Compartilhado">Compartilhado</SelectItem>
                          <SelectItem value="Sem">Sem Quintal</SelectItem>
                        </SelectContent>
                      </Select>
                    } />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cozinha">Cozinha</Label>
                  <Controller
                    name='cozinha'
                    control={control}
                    render={({ field: { onChange, value } }) =>
                      <Select value={value} onValueChange={onChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sem">Sem Cozinha</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                        </SelectContent>
                      </Select>
                    } />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input {...register('name')} id='name' placeholder='Give a name for the home' />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="property-type">Tipo de Propriedade</Label>
                <Controller
                  name='tipo'
                  control={control}
                  render={({ field: { onChange, value } }) =>
                    <Select onValueChange={onChange} value={value} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-family">Single-Family Home</SelectItem>
                        <SelectItem value="condo">Condominium</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="multi-family">Multi-Family</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  } />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={step == 2} className="border rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="font-medium">Detalhes Adicionais</div>
                <div className="text-muted-foreground text-sm">Forneça quaisquer detalhes adicionais sobre sua propriedade</div>
              </div>
              <IconChevronDown className="h-5 w-5 transition-transform" />
            </CollapsibleTrigger>

            <CollapsibleContent className="px-6 py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição do imóvel</Label>
                <Textarea id="descricao" {...register('descricao')} rows={5} placeholder="Descreva a Propriedade..." />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex justify-end">
            <div className="flex items-center gap-4">
              <div className="text-muted-foreground">Step {step + 1} of 3</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${step == 0 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-2 h-2 rounded-full ${step == 1 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-2 h-2 rounded-full ${step == 2 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-2 h-2 rounded-full ${step == 3 ? 'bg-primary' : 'bg-muted'}`} />
              </div>

              {step > 0 && (
                <Button disabled={loading} onClick={(e) => {
                  e.preventDefault()
                  prev()
                }}><IconLeft /> Prev</Button>
              )}
              {step < 2 && (
                <Button disabled={loading} onClick={(e) => {
                  e.preventDefault()
                  next()
                }}>Next <IconRight /></Button>
              )}
              {step >= 2 && (
                <Button disabled={loading} >Create</Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
