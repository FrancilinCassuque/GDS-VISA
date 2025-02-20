'use client'

import { AutorizacaoCheck, IconBriefcase, IconHeart, IconMapPin, } from "@/app/_components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { deletUser, userIndex } from "@/db"
import { userStore } from "@/store"
import { IUser } from "@/types"
import { ClipboardPlus, Loader2, MoreHorizontal, Trash2, UserPlus, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function UserList() {
  const [users, setUsers] = useState<IUser[]>(userStore.getState().users)
  const [total, setTotal] = useState(userStore.getState().total)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (userStore.getState().users.length == 0) {
      userIndex().then((res) => {
        if (res instanceof Error) return

        if (res.length > 0) {
          setUsers(res)
          setTotal(res.length)
          userStore.getState().start(res)
        }
      })
    }
  }, [setUsers, setTotal])

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

        <Button variant={'outline'}> <Link href={`/auth/dashboard/settings/vencimento/${0}`}><span className="text-sm text-muted-foreground flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-muted-foreground" />
          Novo Colaborador
        </span></Link> </Button>

        <Button variant={'outline'}> <Link href={`/auth/dashboard/settings/vencimento/${0}`}><span className="text-sm text-muted-foreground flex items-center gap-2">
          <IconMapPin className="w-6 h-6 text-muted-foreground" />
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