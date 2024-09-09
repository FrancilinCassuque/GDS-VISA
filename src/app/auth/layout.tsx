'use client'

import { DropMenu, Footer, AsideBar, TooggleMenu, IconBell, IconCasaRuler } from "../_components"
import { useEffect, useState } from "react"
import { authStore } from "@/store"
import { IUser, IUserAuth } from "@/types"
import { signOut, useSession } from "next-auth/react"
import { auth } from "@/db"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { Loader2, LoaderPinwheel, Search } from "lucide-react"

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

        console.log(user)
        setLoading(false)


      } else {
        setLoading(false)
      }
    } else if (status == 'unauthenticated') {
      signOut()
    }

  }, [status, userMail, authUser, data?.user?.email,])

  return (
    <div className="">
      <AsideBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <TooggleMenu />

          <div className="flex flex-1 items-center justify-between">
            {/* <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#" prefetch={false}>
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}

            {/* {!authUser?.password && (
              <div className="mx-4">
                <Alert variant='destructive'>
                  <ExclamationTriangleIcon />
                  <AlertTitle>Perfil incompleto</AlertTitle>
                  <AlertDescription className="flex flex-col">
                    <Link href={`/auth/dashboard/settings`}>Crie uma Senha!</Link>

                  </AlertDescription>
                </Alert>
              </div>
            )} */}

            <div className="w-full flex-1 m-2 md-m-auto ">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
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