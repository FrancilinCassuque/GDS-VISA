'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { authStore } from "@/store"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { LogIn, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"


export const DropMenu: React.FC = () => {
  const [abrir, setAbrir] = useState(false)
  const userAuth = authStore.getState().userauth


  return (
    <div className="flex items-center gap-4">
      {/* Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={userAuth?.image ? userAuth.image : "/placeholder.svg"} alt="AvatarLogo" />
              <AvatarFallback>GDS</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background">

          <DropdownMenuLabel>Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          {userAuth?.id && (
            <>
              <DropdownMenuItem className="hover:bg-primary-foreground hover:text-primary">
                <Link href={`/auth/dashboard/`}>
                  <div className="flex">
                    <User className="w-4 h-4 mr-2" />
                    {userAuth.name ? userAuth.name : 'Perfil'}
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href={`/auth/dashboard/settings`} className="hover:bg-primary-foreground hover:text-primary">Definições de usuário</Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}