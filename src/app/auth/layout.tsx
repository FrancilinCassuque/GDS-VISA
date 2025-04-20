'use client'

import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { NotificacaoIndex } from "@/db"
import { Loader2 } from "lucide-react"
import { INotificacao } from "@/types"
import SideDrawer from "@/components/aside"
import { FooterAdmin } from "@/components"
import { useUserStore } from "@/store"

export default function Component({ children }: Readonly<{ children: React.ReactNode }>) {
  const { status } = useSession()
  const { authenticateUser, loading } = useUserStore()


  useEffect(() => {
    authenticateUser()
  }, [authenticateUser])

  return (
    <div className="">
      <SideDrawer />

      <div className="flex flex-col min-h-96 justify-center items-center m-1">
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