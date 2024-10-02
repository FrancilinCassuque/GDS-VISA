'use client'

import { DropMenu, Footer, AsideBar, TooggleMenu, } from "../_components"
import { useCallback, useEffect, useState } from "react"
import { authStore } from "@/store"
import { signOut, useSession } from "next-auth/react"
import { auth, NotificacaoIndex } from "@/db"
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Loader2, Search } from "lucide-react"
import { INotificacao } from "@/types"

export default function Component({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data, status } = useSession()
  const [loading, setLoading] = useState(false)
  const authUser = authStore()
  const [userMail, setUSerMail] = useState(data?.user?.email)

  const [notificacoes, SetNotificacoes] = useState<INotificacao[]>()

  const abastecerNotificacoes = useCallback(async () => {
    const notificacoesget = await NotificacaoIndex()
    if (!(notificacoesget instanceof Error)) {

      const naoLidas = notificacoesget.filter(notify => notify.visto == true)
      return SetNotificacoes(naoLidas)
    }
  }, [notificacoes])

  useEffect(() => {
    setLoading(true)
    setUSerMail(data?.user?.email)

    if ((status == 'authenticated') && userMail) {
      
      abastecerNotificacoes()
      
      if (!authUser.userauth?.id) {
        auth(userMail).then((res) => {
          if (res instanceof Error) return
          authStore.getState().startAuth(res)
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
      <AsideBar notificacoes={notificacoes} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <TooggleMenu />

          <div className="flex flex-1 items-center justify-between">
            <div className="w-full flex-1 m-2 md-m-auto ">
              {/* <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form> */}
              <p className="text-muted-foreground font-mono font-semibold text-lg">Gota D' Sol - Visa</p>
            </div>

            <DropMenu />
          </div>
        </header>

        <div className="flex flex-col min-h-96 justify-center items-center">
          {((status == 'loading') || loading) ? (
            <Loader2 className="animate-spin min-h-96 min-w-96" />
          ) : (
            <>
              {children}
            </>
          )}

        </div>

        <Footer />

      </div>
    </div>
  )
}