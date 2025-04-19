'use client'

import { useCallback, useEffect, useState } from "react"
import { authStore } from "@/store"
import { signOut, useSession } from "next-auth/react"
import { auth, NotificacaoIndex } from "@/db"
import { Loader2 } from "lucide-react"
import { INotificacao } from "@/types"
import SideDrawer from "@/components/aside"
import { FooterAdmin } from "@/components"

export default function Component({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data, status } = useSession()
  const [loading, setLoading] = useState(false)
  const authUser = authStore()
  const [userMail, setUSerMail] = useState(data?.user?.email)

  const [notificacoes, SetNotificacoes] = useState<INotificacao[]>()

  const abastecerNotificacoes = useCallback(async () => {
    const notificacoesget = await NotificacaoIndex()
    if (!(notificacoesget instanceof Error)) {

      const naoLidas = notificacoesget.filter(notify => notify.visto == false)
      return SetNotificacoes(naoLidas)
    }
  }, [notificacoes])


  useEffect(() => {
    setLoading(true)
    setUSerMail(data?.user?.email)

    if ((status == 'authenticated') && userMail) {


      if (!authUser.userauth?.id) {
        auth(userMail).then(async (res) => {
          if (res instanceof Error) return
          authStore.getState().startAuth(res)

          await abastecerNotificacoes()
        })

        setLoading(false)
      } else {
        setLoading(false)
      }
    } else if (status == 'unauthenticated') {
      signOut()
    }

  }, [status, userMail, authUser, data?.user?.email, notificacoes])

  return (
    <div className="">
      <SideDrawer />
 
      <div className="flex flex-col min-h-96 justify-center items-center">
        {((status == 'loading') || loading) ? (
          <Loader2 className="animate-spin min-h-96 min-w-96" />
        ) : (
          <>
            {children}
          </>
        )}
      </div>

      <FooterAdmin />
    </div>
  )
}