'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { authStore } from "@/store"
import { signOut } from "next-auth/react"
import Link from "next/link"
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ConfigButton } from "../config"
import { Bell, CalendarArrowUp, Eye, LogIn, MessageCircleWarning, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { INotificacao } from "@/types"
import { AlertDialogHeader, AlertDialogTrigger, AlertDialog, AlertDialogTitle, AlertDialogContent, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"

interface ITooggleProps {
  notifys?: INotificacao[]
}

export const DropMenu: React.FC<ITooggleProps> = ({ notifys }) => {
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
        <DropdownMenuContent align="end">

          <DropdownMenuLabel>Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          {userAuth?.id && (
            <>
              <DropdownMenuItem>
                <Link href={`/auth/dashboard/`}>
                  <div className="flex">
                    <User className="w-4 h-4 mr-2" />
                    {userAuth.name ? userAuth.name : 'Perfil'}
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href={`/auth/dashboard/settings`}>Definições de usuário</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>

            </>
          )}

          {!userAuth?.id && (
            <Link href={'/user'}>
              <DropdownMenuItem>
                <LogIn className="w-4 h-4 mr-2" />
                Entrar
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}