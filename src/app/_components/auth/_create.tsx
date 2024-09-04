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
import { Loader2 } from "lucide-react"

interface IFormInputs {
  email: string
  password: string
}

export const SignUp = () => {
  const form = useForm<IFormInputs>()
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const route = useRouter()

  const submitForm = form.handleSubmit(async (user: IFormInputs) => {
    setIsLoading(true)

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
  })



  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
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
        <form className="space-y-6" onSubmit={submitForm}>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-foreground">
              <IconMail className="mr-2 inline-block h-4 w-4" />
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
                placeholder="Enter your email"
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div className="relative">
            <Label htmlFor="password" className="block text-sm font-medium text-foreground">
              <IconLock className="mr-2 inline-block h-4 w-4" />
              Password
            </Label>
            <div className="mt-1">
              <Input
                {...form.register('password')}
                minLength={8}
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              />
              <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 h-7 w-7" onClick={(e) => {
                e.preventDefault()
                setShowPass(!showPass)
              }}>
                <IconEye className="h-4 w-4" />
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
          </div>
          <div>
            <Button disabled={isLoading} type="submit" className="w-full">
              <IconUserPlus className="mr-2 inline-block h-4 w-4" />
              {isLoading ? <Loader2 className="animate-spin h-8 w-8"/>: 'Registrar' }
            </Button>
          </div>
        </form>
        <SocialAuth action={GoogleLogin} />
      </div>
    </div>
  )
}
