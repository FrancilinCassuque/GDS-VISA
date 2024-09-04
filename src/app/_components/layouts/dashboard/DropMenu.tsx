'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { authStore } from "@/store"
import { signOut } from "next-auth/react"
import Link from "next/link"
import Image from 'next/image'


export const DropMenu: React.FC = () => {
  const userAuth = authStore.getState().userauth


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
          <Image
            src={userAuth?.image ? userAuth.image : "/placeholder.svg"}
            width={40}
            height={40}
            alt="Avatar do Usuario"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
        {userAuth?.id && (
          <>
            <DropdownMenuItem>
              <Link href={`/auth/dashboard/`}>{userAuth.name ? userAuth.name : 'Perfil'}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/auth/dashboard/settings`}>Definições</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}