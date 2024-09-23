'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import Image from 'next/image'

const formSchema = z.object({
  nome: z.string().min(8, {
    message: "O nome deve ter pelo menos 8 caracteres.",
  }),
  whatsapp: z.string().min(9, {
    message: "Por favor, insira um endereço de whatsapp válido.",
  }),
  menssagem: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      whatsapp: "",
      menssagem: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato com você o mais breve possível.",
      })
      form.reset()
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4">
      <Image src="/placeholder.svg" alt="Gota D' Sol Logo" width={350} height={350} className="mx-auto" />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Contacte-nos</CardTitle>
          <CardDescription>Preencha o formulário abaixo para entrar em contato conosco.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Teu nome" {...field} />
                    </FormControl>
                    <FormDescription>
                      Por favor insira seu nome completo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="+244 900 000 123" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nunca compartilharemos seu contacto com mais ninguém.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="menssagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Como podemos ajudá-lo?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Forneça o máximo de detalhes possível.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}