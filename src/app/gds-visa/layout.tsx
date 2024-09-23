'use client'

import { DropMenu, Footer, AsideBar, TooggleMenu, } from "../_components"
import { useEffect, useState } from "react"
import { authStore } from "@/store"
import { signOut, useSession } from "next-auth/react"
import { auth } from "@/db"
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Loader2, Search } from "lucide-react"

export default function Component({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data, status } = useSession()
  const [loading, setLoading] = useState(false)
  const authUser = authStore()
  const [userMail, setUSerMail] = useState(data?.user?.email)

  useEffect(() => {
    setLoading(true)
    setUSerMail(data?.user?.email)

    if ((status == 'authenticated') && userMail) {

      if (!authUser.userauth?.id) {
        const user = auth(userMail).then((res) => {
          if (res instanceof Error) return
          authStore.getState().startAuth(res)
        })

        // console.log(user)
        setLoading(false)


      } else {
        setLoading(false)
      }
    } else if (status == 'unauthenticated') {
      signOut()
    }

  }, [status, userMail, authUser, data?.user?.email,])

  return (
    <div className="max-h-svh">
      <div className="mb-6">
        {children}
      </div>

      <Footer />
    </div>
  )
}