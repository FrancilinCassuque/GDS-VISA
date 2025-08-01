'use client'

import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import { Eye, Loader2, LogIn, UserPlus } from "lucide-react"
import { useUserStore } from "@/store"

export const GoogleLogin = async () => {
  try {
    // const formMail = form.getValues()
    signIn('google')
    // toast({
    //   title: "Success!",
    //   description: "Check your Email for the magic Link to Login."
    // })
  } catch (error) {
    // form.setValue('email', '')
    // form.setValue('password', '')
    toast.error("An error ocurred, please try again.")
  }
}

export const Login: React.FC = () => {
  const form = useForm()
  const route = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const submitForm = form.handleSubmit((user) => {
    try {
      setLoading(true)
      signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          route.push('/auth/dashboard')
        } else {

          form.setValue('email', '')
          form.setValue('password', '')
          toast.error("Erro: Usuário não encontrado!❌😢") // Toast de erro
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      form.setValue('email', '')
      form.setValue('password', '')
      toast.error('Error ao Fazer Login')
    }
  })

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        {/* <Image src={'/placeholder.png'} alt="Logo da Gota de Sol" width={150} height={150} className="rounded-t-lg object-cover aspect-video" /> */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            <LogIn className="mr-2 inline-block h-6 w-6" />
            Loga na minha Conta
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <Link href={"/user/create"} className="font-medium text-primary hover:text-primary/80" prefetch={false}>
              <UserPlus className="mr-2 inline-block h-4 w-4" />
              Registra Agente🐱‍👤
            </Link>
          </p>
        </div>
        <div className="space-y-6">
          <form className="space-y-6" onSubmit={submitForm}>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                Email address
              </Label>
              <div className="mt-1">
                <Input
                  {...form.register('email')}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="exemplo@sara.ao"
                  className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
            <div className="relative">
              <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                Password
              </Label>
              <div className="mt-1">
                <Input
                  {...form.register('password')}
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Sanha"
                  className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                />
                <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 h-7 w-7" onClick={(e) => {
                  e.preventDefault()
                  setShowPass(!showPass)
                }}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              {/* <div className="flex items-center">
                <Checkbox id="remember-me" name="remember-me" className="h-4 w-4 text-primary focus:ring-primary" />
                <Label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                  Remember me
                </Label>
              </div> */}
              <div className="text-sm">
                <Link href="/" className="font-medium text-primary hover:text-primary/80" prefetch={false}>
                  Voltar ao Início.
                </Link>
              </div>
            </div>
            <Button disabled={loading} type="submit" className="w-full">
              <LogIn className="mr-2 inline-block h-4 w-4" />
              {loading ? <Loader2 className="animate-spin h-8 w-8" /> : 'Entrar'}
            </Button>
          </form>

          {/* <SocialAuth action={GoogleLogin} /> */}

        </div>
      </div>
    </div>
  )
}
