'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userIndex } from "@/db"
import { userStore } from "@/store"
import { IUser } from "@/types"
import { Separator } from "@radix-ui/react-select"
import Link from "next/link"
import { useEffect, useState } from "react"

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

// function stringAvatar(name: string) {
//   const nomes = name.split(' ')
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: nomes.length > 1 ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : `${name.split(' ')[0][0]}`,
//   };
// }

export default function Test() {
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
    <div className="min-h-[85dvh] flex flex-col items-center justify-center">
      <h1>User page</h1>
      <ul>
        {users.map((user: IUser) => (
          <div key={user.id}>
            <div className="grid grid-cols-2 my-3">
              <li>
                <Link href="#">
                  <Avatar className="mx-0 px-0">
                    <AvatarImage src={user.image || ''} alt={user.name || ''} />
                    <AvatarFallback>{user?.name ? `${user.name[0].toUpperCase()}${user.name[user.name.length - 1]}` : 'MC'}</AvatarFallback>
                  </Avatar>
                </Link>
              </li>
              <li> <Link href="#">{user.email}</Link></li>
            </div>
            <Separator />
          </div>
        ))}

        <p><strong>Total = </strong> <i> {total} </i></p>
      </ul>
    </div>
  )
}