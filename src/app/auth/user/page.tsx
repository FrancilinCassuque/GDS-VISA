'use client'

import { AutorizacaoCheck, } from "@/app/_components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deletUser, userIndex } from "@/db"
import { userStore } from "@/store"
import { IUser } from "@/types"
import { ClipboardPlus, Loader2, MoreHorizontal, Trash2 } from "lucide-react"
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
    <div className="min-h-[81dvh] flex flex-col items-center justify-center">
      <AutorizacaoCheck />

      <h1 className="text-xl font-bold tracking-tight sm:text-4xl">Usuarios.</h1>

      <ul className="overflow-auto max-h-96 border-b border-primary/15">
        {users.map((user: IUser) => (
          <li key={user.id} className="flex justify-center items-center hover:bg-primary/10 rounded-full my-5 border-l border-r border-b  border-primary/15">
            <Link href={`/auth/dashboard/${user.id}`} className="flex justify-center items-center">
              <Avatar className="mx-3 px-0">
                <AvatarImage src={user.image || ''} alt={user.name || ''} />
                <AvatarFallback>{user?.name ? `${user.name[0].toUpperCase()}${user.name[user.name.length - 1]}` : 'MC'}</AvatarFallback>
              </Avatar>

              <span className="text-foreground">{user.name}</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="mx-5">
                  <span className="sr-only">Abri menu</span>
                  {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <MoreHorizontal className="h-6 w-6 " />}

                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Menu de Opções</DropdownMenuLabel>
                <Link href={`/auth/dashboard/settings/${user.email}`}>
                  <DropdownMenuItem className="text-blue-400">
                    <ClipboardPlus className="w-4 h-4" />
                    Editar
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem className="text-red-700"
                  onClick={() => {
                    setLoading(true)
                    deletUser(user.id).then(res => {
                      if (!(res instanceof Error)) {
                        setLoading(false)
                        window.location.reload()

                      }
                    })
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}

      </ul>

      <p className="m-4 text-lg"><strong>Total = {total} </strong></p>
    </div>
  )
}