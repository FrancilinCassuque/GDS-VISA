'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userIndex } from "@/db"
import { userStore } from "@/store"
import { IUser } from "@/types"
import { Separator } from "@radix-ui/react-select"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function UserList() {
  const [users, setUsers] = useState<IUser[]>(userStore.getState().users)
  const [total, setTotal] = useState(userStore.getState().total)


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
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl my-10">Lista de Usuarios.</h1>

      <ul>
        {users.map((user: IUser) => (
          <div key={user.id}>
            <div>
              <li>
                <Link href={`/auth/dashboard/${user.id}`} className="grid grid-cols-2 my-3">
                  <Avatar className="mx-0 px-0">
                    <AvatarImage src={user.image || ''} alt={user.name || ''} />
                    <AvatarFallback>{user?.name ? `${user.name[0].toUpperCase()}${user.name[user.name.length - 1]}` : 'MC'}</AvatarFallback>
                  </Avatar>

                  <span className="text-foreground">{user.email}</span>
                </Link>
              </li>
            </div>
            <Separator />
          </div>
        ))}

        <p><strong>Total = {total} </strong></p>
      </ul>
    </div>
  )
}