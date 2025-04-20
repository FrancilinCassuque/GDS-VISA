'use client'

import { MapPin, UserPlus, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { AutorizacaoCheck } from "@/app/_components"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store"
import { useEffect } from "react"
import Link from "next/link"

export default function UserList() {
  const { fetchUsers, users, loading, deleteUser } = useUserStore()
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])


  return (
    <div className="h-[80dvh] overflow-auto">
      <AutorizacaoCheck />

      <h1 className="text-xl font-bold tracking-tight sm:text-4xl my-8">Gota D' Sol - Porta do R.H</h1>

      <Separator className="my-4" />

      <div className="grid gap-2">
        <Button variant={'outline'}> <Link href={`/auth/user/agentes`}><span className="text-sm text-muted-foreground flex items-center gap-2">
          <Users className="w-6 h-6 text-muted-foreground" />
          Colaboradores
        </span></Link> </Button>

        <Button variant={'outline'}> <Link href={`/auth/user/agentes/create`}><span className="text-sm text-muted-foreground flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-muted-foreground" />
          Novo Colaborador
        </span></Link> </Button>

        <Button variant={'outline'}> <Link href={`#`}><span className="text-sm text-muted-foreground flex items-center gap-2">
          <MapPin className="w-6 h-6 text-muted-foreground" />
          Gota D` Sol
        </span></Link> </Button>
      </div>

      <div className="flex items-center mt-32 gap-2">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs text-center">
          <p className="text-xl font-semibold mb-2 flex ">
            Agentes
            <UserPlus className="w-5 h-5 text-muted-foreground m-2" />
          </p>
          <p className="text-gray-600">
            Temos <strong>{users.length} 🐱‍👤</strong> Agentes Disponíveis na Gota D' Sol até o momento.
          </p>

          <Button className="sr-only px-6 py-3  my-4 rounded-lg">
            <Link href={'#'}>
              Saber Mais...
            </Link>
          </Button>
        </div>

        {/* <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs text-center mx-4">
          <p className="text-xl font-semibold mb-2">
            Suporte Completo
          </p>
          <p className="text-gray-600">
            {JSON.stringify(users)}
          </p>

          <Button className="sr-only px-6 py-3  my-4 rounded-lg">
            <Link href={'#'}>
              Saber Mais...
            </Link>
          </Button>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs text-center">
          <p className="text-xl font-semibold mb-2">
            Suporte Completo
          </p>
          <p className="text-gray-600">
            Acompanhamento contínuo durante o processo de visto e viagem, garantindo a tranquilidade de nossos clientes.
          </p>

          <Button className="sr-only px-6 py-3  my-4 rounded-lg">
            <Link href={'#'}>
              Saber Mais...
            </Link>
          </Button>
        </div> */}
      </div>
    </div>
  )
}