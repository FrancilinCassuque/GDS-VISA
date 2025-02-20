'use client'

// import { AutorizacaoCheck, IconBriefcase, IconHeart, IconMapPin, } from "@/app/_components"
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
    <div className="h-[80dvh]">
      {/* <AutorizacaoCheck /> */}

      <h1 className="text-xl font-bold tracking-tight sm:text-4xl">Gota D' Sol - Agentes</h1>

      <Separator className="my-4" />

      {/* <div className="grid gap-2">
        <Button variant={'outline'}> <Link href={`/auth/dashboard/settings/vencimento/${0}`}><span className="text-sm text-muted-foreground flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          Colaboradores
        </span></Link> </Button>

        <Button variant={'outline'}> <Link href={`/auth/dashboard/settings/vencimento/${0}`}><span className="text-sm text-muted-foreground flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-muted-foreground" />
          Novo Colaborador
        </span></Link> </Button>

        <Button variant={'outline'}> <Link href={`/auth/dashboard/settings/vencimento/${0}`}><span className="text-sm text-muted-foreground flex items-center gap-2">
          <IconMapPin className="w-4 h-4 text-muted-foreground" />
          Gota D` Sol
        </span></Link> </Button>
      </div> */}

      <div className="max-h-[52dvh] flex flex-col items-center justify-center overflow-auto">

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
      </div>
    </div>
  )
}