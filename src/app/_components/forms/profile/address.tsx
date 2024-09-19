'use client'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { IconChevronDown } from "../../icons"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IEnderecoStore } from "@/types"
import { useCallback, useState } from "react"
import { authStore } from "@/store"
import { Loader, Newspaper } from "lucide-react"
import { EnderecoStore } from "@/db"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"


export const EnderecoForm: React.FC = () => {
  const [editar, setEditar] = useState(true)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(false)

  const form = useForm<IEnderecoStore>()
  const auth = authStore()
  const rote = useRouter()

  const submitAddressForm = form.handleSubmit(async (data: IEnderecoStore) => {
    try {
      setLoading(true)

      if (auth.userauth?.id) {
        const address = await EnderecoStore(data, auth.userauth.pessoa?.id)

        if (address instanceof Error) {
          return setErro(true)
        }
        const upAuth = auth.userauth
        if (upAuth) {
          upAuth.pessoa.address.rua = address.rua
          upAuth.pessoa.address.bairro = address.bairro
          upAuth.pessoa.address.comuna = address.comuna
          upAuth.pessoa.address.municipio = address.municipio
          upAuth.pessoa.address.provincia = address.provincia
          upAuth.pessoa.address.pais = address.pais

          auth.startAuth(upAuth)


          toast({
            title: "sucesso!",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">Perfil Actualizado com sucesso!</code>
              </pre>
            ),
          })
        }
      }

      setEditar(true)
      setLoading(false)
      setErro(false)
      rote.push('/auth/user')

    } catch (error) {
      setEditar(true)
      setLoading(false)
    }
  })

  const cancelar = useCallback(() => {
    form.setValue('rua', auth.userauth?.pessoa?.address.rua || '')
    form.setValue('bairro', auth.userauth?.pessoa?.address.bairro || '')
    form.setValue('comuna', auth.userauth?.pessoa?.address.comuna || '')
    form.setValue('municipio', auth.userauth?.pessoa?.address.municipio || '')
    form.setValue('provincia', auth.userauth?.pessoa?.address.provincia || '')
    form.setValue('pais', auth.userauth?.pessoa?.address.pais || '')

    setEditar(true)
  }, [form])

  return (
    <div className="grid grid-cols-1 gap-2 mx-auto mb-14">

      {(!auth.userauth?.pessoa?.address.id && editar) ? (
        <div>
          <Alert variant='destructive'>
            <ExclamationTriangleIcon />
            <AlertTitle>Registro em falta!</AlertTitle>
            <AlertDescription className="flex flex-col text-center">
              <p>
                Clica em adicionar novo Endereço.
              </p>
              <br /><br />

              <Button variant='secondary' onClick={() => setEditar(false)}>
                <Newspaper /> <span className="p-4">Adicionar Endereço.</span>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <form className="mx-2" onSubmit={submitAddressForm}>
          <Collapsible className="rounded-lg overflow-hidden" open={true}>
            <CollapsibleTrigger className="flex items-center justify-between bg-muted px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="font-medium">informações Endereço</div>
                <div className="text-muted-foreground text-sm">Fornecer informações sobre o Endereço</div>
              </div>
              <IconChevronDown className="h-5 w-5 transition-transform" />
            </CollapsibleTrigger>

            <CollapsibleContent className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rua">Rua & Nº.</Label>
                  <Input {...form.register('rua')} id="rua" readOnly={editar} placeholder="Fapa - 12"
                    defaultValue={auth.userauth?.pessoa?.address.rua || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro / Quarteirão</Label>
                  <Input {...form.register('bairro')} id="bairro" readOnly={editar} placeholder="Bairro da Paz"
                    defaultValue={auth.userauth?.pessoa?.address.bairro || ''} />

                </div>

                <div className="space-y-2">
                  <Label htmlFor="comuna">Distrito / Comuna</Label>
                  <Input {...form.register('comuna')} id="comuna" readOnly={editar} placeholder="Ngola-Kiluange"
                    defaultValue={auth.userauth?.pessoa?.address.comuna || ''} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-3">
                <div className="space-y-2">
                  <Label htmlFor="municipio">Município</Label>
                  <Input {...form.register('municipio')} id="municipio" readOnly={editar} placeholder="Sambizanga"
                    defaultValue={auth.userauth?.pessoa?.address.municipio || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provincia">Província</Label>
                  <Input {...form.register('provincia')} id="provincia" readOnly={editar} placeholder="Luanda"
                    defaultValue={auth.userauth?.pessoa?.address.provincia || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pais">Pais</Label>
                  <Input {...form.register('pais')} id="pais" placeholder="Angola" readOnly={editar}
                    defaultValue={auth.userauth?.pessoa?.address.pais || 'Angola'} />
                </div>
              </div>

              <div className="flex flex-row items-end justify-end mt-4 mb-3">
                {!editar ? (
                  <>
                    <Button className="mx-2 px-6" disabled={loading} variant='secondary'>
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
                  }}>Editar</Button>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator />
        </form>
      )}
    </div>
  )
}