"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, Loader2, } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { authStore } from "@/store"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { LIST_CODE } from "@/lib/constantes"


const FormSchema = z.object({
  autirizationCode: z.string({ required_error: "Por favor Selecciona a ocupacao..", }).min(8, 'Autorização Muito curta!'),
})

export const AutorizacaoCheck: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(false)
  const authUser = authStore()
  const [showPass, setShowPass] = useState(false)
  const [open, setOpen] = useState(true)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)

      const code = LIST_CODE.find(code => code.authCode == data.autirizationCode)
      if (code) {
        setOpen(false)
        setLoading(false)

        toast({
          title: "sucesso!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Autorizado com sucesso✔!</code>
            </pre>
          ),
        })
      } else {
        form.setError('autirizationCode', { type: 'max', message: 'Código Não autorizado!❌' })
        // setErro(true)
        setLoading(false)

        toast({
          title: "Recusa!",
          variant: 'destructive',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Código Recuzado❌!</code>
            </pre>
          ),
        })
      }
    } catch (error) {
      setErro(true)
      setLoading(false)
      return
    }
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        {/* <Button variant="outline" className="bg-none border-none max-w-min max-h-min">
          {icon}
          {textoDoBotao}
        </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"Autorização para Nivél Superior🐱‍👤"}</DialogTitle>
          <DialogDescription>
            {"É necessário autorição de nivél superior para aceder a está página!"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center w-full mt-2">

            {erro && (
              <div>
                <Alert variant='destructive'>
                  <ExclamationTriangleIcon />
                  <AlertTitle>Erro!</AlertTitle>
                  <AlertDescription className="flex flex-col text-center">
                    <p>
                      Erro de Autorização!.
                    </p>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="flex flex-col items-center justify-center w-full">
              <FormField
                control={form.control}
                name="autirizationCode"
                render={({ field }) => (
                  <FormItem className="flex flex-col mx-6 w-full">
                    <div className="relative">
                      <FormLabel>Autorização</FormLabel>

                      <div className="mt-1">
                        <Input
                          {...field}
                          type={showPass ? "text" : "password"}
                          required
                          placeholder="Código de Autorização"
                          className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                        />
                        <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 h-7 w-7" onClick={(e) => {
                          e.preventDefault()
                          setShowPass(!showPass)
                        }}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">botão para mostrar palavra passe</span>
                        </Button>
                      </div>
                    </div>
                    <FormDescription>
                      Insira o teu código de autorização para poder acessar está página!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <Button className="w-6/12 mx-2" disabled={loading} variant={'ghost'} onClick={(e) => {
                e.preventDefault()
                window.history.back()
              }}> {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Voltar'}</Button>
              <Button type="submit" className="w-6/12 mx-2" disabled={loading}> {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enviar'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  )
}

