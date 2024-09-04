'use client'

import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { IconHome, IconLogIn, IconLogOut, IconMenu, IconMountain, IconPlus, IconSettings, IconUsers } from "../icons"
import { ConfigButton, ConfigButtonPC } from "./config"

export const AppBar: React.FC = () => {
  const buttonClass = "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"

  const { data: session } = useSession()

  return (
    <header className="flex h-16 items-center justify-between bg-background px-4 shadow-sm sm:px-6">
      <Link href={"/"} className="flex items-center gap-2" prefetch={false}>
        <IconMountain className="h-6 w-6" />
        <span className="text-lg font-semibold">S A R A - {session?.user?.email}</span>
      </Link>

      <nav className="flex items-center gap-4 text-sm font-medium lg:flex">
        {session && (
          <>
            <Link href={'/home'} className="rounded-md px-3 py-2 hover:bg-muted hover:text-foreground" prefetch={false}>
              Home
            </Link>

            <Link href={'/dashboard'} className="rounded-md px-3 py-2 hover:bg-muted hover:text-foreground" prefetch={false}>
              Profile
            </Link>
            <Link href={'/home/create'} className="rounded-md px-3 py-2 hover:bg-muted hover:text-foreground" prefetch={false}>
              New Home
            </Link>
            {/* <Link href="#" className="rounded-md px-3 py-2 hover:bg-muted hover:text-foreground" prefetch={false}>
              Settings
            </Link> */}

            <ConfigButtonPC/>

            <Link href="#" onClick={() => signOut()} className="rounded-md px-3 py-2 hover:bg-muted hover:text-foreground" prefetch={false}>
              Exit
            </Link>
          </>
        )}

        {!session && (
          <Link href="/userauth" className="rounded-md px-3 py-2 hover:bg-muted hover:text-foreground" prefetch={false}>
            Enter
          </Link>
        )}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full lg:hidden">
            <IconMenu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[300px]">
          <div className="flex h-16 items-center justify-between px-4 shadow-sm">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <IconMountain className="h-6 w-6" />
              <span className="text-lg font-semibold">S A R A</span>
            </Link>
            {/* <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <XIcon className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetClose> */}
          </div>

          <nav className="grid gap-2 px-4 py-6">
            {session && (
              <>
                <Link
                  href={'/home'}
                  className={buttonClass}
                  prefetch={false}
                >
                  <IconHome className="h-4 w-4" />
                  Home
                </Link>

                <Link
                  href={'/dashboard'}
                  className={buttonClass}
                  prefetch={false}
                >
                  <IconUsers className="h-4 w-4" />
                  Profile
                </Link>

                <Link
                  href="/home/create"
                  className={buttonClass}
                  prefetch={false}
                >
                  <IconPlus className="h-4 w-4" />
                  New Home
                </Link>
                
                <ConfigButton />

                <Link
                  href="#"
                  onClick={() => signOut()}
                  className={buttonClass}
                  prefetch={false}
                >
                  <IconLogOut className="h-4 w-4" />
                  Exit
                </Link>
              </>
            )}

            {!session && (
              <Link
                href="/userauth"
                className={buttonClass}
                prefetch={false}
              >
                <IconLogIn className="h-4 w-4" />
                Enter
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}