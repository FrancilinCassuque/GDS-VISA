'use client'

import { PerfilData, EnderecoForm, UserData } from "@/app/_components"

export default function Settings({ params }: { params: { userId: string } }) {

  return (
    <div className="w-full max-w-max mx-auto py-12 md:py-16 lg:py-20">
      <div className="space-y-4 text-center mb-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Definições & Privacidades</h1>
        <p className="md:text-lg text-foreground">Informações detalhadas do perfil.</p>
      </div>

      <UserData />
    </div>
  )
}
