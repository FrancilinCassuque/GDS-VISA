'use client'

import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconEye, IconLock, IconLogIn, IconMail, IconUser, IconUserPlus } from "../icons"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { SocialAuth } from "./socialAuth"
import { GoogleLogin } from "./_login"
import { signIn } from "next-auth/react"
import { userCreate } from "@/db"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileWarning, FormInput, Loader2, Loader2Icon } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

const IFormRegisterUser = z.object({
  email: z.string().email('E-mail Invalido!'),
  password: z.string().min(6, 'Senha muito curta'),
  code: z.string().min(4, 'Codigo muito curto!')
})

export const SignUp = () => {
  const form = useForm<z.infer<typeof IFormRegisterUser>>({
    resolver: zodResolver(IFormRegisterUser)
  })
  const [showPass, setShowPass] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [formError, setFormError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const route = useRouter()

  const submitForm = form.handleSubmit(async (user: z.infer<typeof IFormRegisterUser>) => {
    setIsLoading(true)

    const elias = user.code.toUpperCase() === 'G22/24-01'
    const jose = user.code.toUpperCase() === 'G22/24-02'
    const francis = user.code.toUpperCase() === 'G22/24-00'

    if (francis || elias || jose) {
      const newUser = await userCreate(user).then(res => {
        return res
      }).catch((err) => {
        return err
      })

      if (newUser instanceof Error) {
        const erro = newUser.message

        form.setValue('email', '')
        form.setValue('password', '')
        form.setFocus('email')
        setIsLoading(false)

        return toast({
          title: 'Error',
          description: <pre><code>Error ao registrar usuário</code></pre>,
          variant: "destructive"
        })
      }

      await signIn('email', { email: user.email, redirect: false })

      form.setValue('email', '')
      form.setValue('password', '')
      form.setFocus('email')

      setIsLoading(false)
      route.push('auth/home')

      return toast({
        title: 'Success',
        description: <pre><code>Check your Email Box for Loin</code></pre>
      })
    } else {
      setIsLoading(false)
      setFormError(true)
      form.setValue('code', '')
      form.setFocus('code')
    }
  })


  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">

      {formError && (
        <AlertDialog open={formError}>
          <AlertDialogContent className="w-full mx-auto border-red-600">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex flew-col col-end-2 justify-center text-red-500"><FileWarning /> Erro ao Registrar!</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="text-center">Codigo de Autorizacao Errodo. Por faver🙏, Entra em contacto com a Gota D` Sol ou tenta novamente.</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel> <Link href={'/'}>Voltar</Link> </AlertDialogCancel>
              <Button className="" variant={'destructive'} onClick={(e) => {
                e.preventDefault()
                setFormError(false)
              }}><Loader2Icon className="h-6 w-6 mx-2" /> Tentar de Novo</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            <IconUserPlus className="mr-2 inline-block h-6 w-6" />
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link href={"/userauth"} className="font-medium text-primary" prefetch={false}>
              <IconLogIn className="mr-2 inline-block h-4 w-4" />
              sign in to your account
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-foreground">
                      <IconMail className="mr-2 inline-block h-4 w-4" />
                      Email address
                    </FormLabel>

                    <div className="mt-1">
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="informa o teu email"
                        className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                      />
                      <FormMessage />
                      <FormDescription>informa o E-mail</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-foreground">
                      <IconLock className="mr-2 inline-block h-4 w-4" />
                      Palavra Passe
                    </FormLabel>

                    <div className="mt-1">
                      <FormMessage className="m-2" />
                      <Input
                        {...field}
                        type={showPass ? "text" : "password"}
                        // autoComplete="current-password"
                        required
                        placeholder="Fulano115@"
                        className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                      />
                      <Button variant="ghost" size="icon" className="absolute bottom-6 right-1 h-7 w-7" onClick={(e) => {
                        e.preventDefault()
                        setShowPass(!showPass)
                      }}>
                        <IconEye className="h-4 w-4" />
                        <span className="sr-only">Toggle password visibility</span>
                      </Button>
                      <FormDescription>cria uma palavra Passa forte com pelo menos 6 digitos</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="relative">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-foreground">
                      <IconLock className="mr-2 inline-block h-4 w-4" />
                      Nº de Funcionario.
                    </FormLabel>

                    <div className="mt-1">
                      <FormMessage className="m-2" />

                      <Input
                        {...field}
                        type={showCode ? "text" : "code"}
                        required
                        placeholder="Codigo de Agente"
                        className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                      />
                      <Button variant="ghost" size="icon" className="absolute bottom-6 right-1 h-7 w-7" onClick={(e) => {
                        e.preventDefault()
                        setShowCode(!showCode)
                      }}>
                        <IconEye className="h-4 w-4" />
                        <span className="sr-only">Toggle Code visibility</span>
                      </Button>
                      <FormDescription>Insira o Codigo de agente Fornecido pela Empresa.</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button disabled={isLoading} type="submit" className="w-full">
                <IconUserPlus className="mr-2 inline-block h-4 w-4" />
                {isLoading ? <Loader2 className="animate-spin h-8 w-8" /> : 'Registrar'}
              </Button>
            </div>
          </form>
        </Form>
        <SocialAuth action={GoogleLogin} />
      </div>
    </div>
  )
}
