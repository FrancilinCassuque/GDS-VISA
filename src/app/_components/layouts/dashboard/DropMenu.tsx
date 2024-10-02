'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { authStore } from "@/store"
import { signOut } from "next-auth/react"
import Link from "next/link"
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { listItem, subListItem } from "../../listas/listaDeItensDoMenuBar"
import { ConfigButton } from "../config"
import { Bell, CalendarArrowUp, Eye, MessageCircleWarning } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { INotificacao } from "@/types"
import { AlertDialogHeader, AlertDialogTrigger, AlertDialog, AlertDialogTitle, AlertDialogContent, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Avatar } from "@/components/ui/avatar"
import { useState } from "react"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"

interface ITooggleProps {
  notifys?: INotificacao[]
}

export const DropMenu: React.FC<ITooggleProps> = ({ notifys }) => {
  const [abrir, setAbrir] = useState(false)
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

        <DropdownMenuItem className="sm:sr-only">
          <AlertDialog open={abrir} onOpenChange={setAbrir}>
            <AlertDialogTrigger>
              <Link href={'#'} className={notifys?.length ? "grid grid-cols-2" : "grid grid-cols-1"} onClick={(e) => {
                e.preventDefault()
                setAbrir(!abrir)
              }}>
                <Bell className="h-5 w-5" />
                {(notifys && notifys.length > 0) && (
                  <Badge className="ml-auto flex h-6 w-4 shrink-0 items-center justify-center rounded-full bg-primary">{notifys.length ? notifys.length : ''}</Badge>
                )}
              </Link>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Notificações</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="w-full flex items-center justify-start flex-col">
                {notifys?.map(not => (
                  <>
                    {/*  */}

                    <div className="flex items-center space-x-4 rounded-full p-1 shadow-md bg-black/5 max-w-sm mt-5" key={not.id}>
                      <Avatar className="h-12 w-12">
                        {/* <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User avatar" /> */}
                        {not.tipo == 'contacto' ? (
                          <MessageCircleWarning className="w-10 h-10 m-2" />
                        ) : (
                          <CalendarArrowUp className="w-10 h-10 m-2" />
                        )}

                      </Avatar>
                      <div className="flex-grow">
                        <p className="text-sm font-medium">{'Notificação'}</p>
                        <p className="text-xs text-muted-foreground">{not.mensagem}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="icon" variant="ghost" onClick={(e) => {
                          setAbrir(false)
                        }}>
                          <Link href={`/auth/dashboard/Contacto/${not.id}`} >
                            <Bell className="h-4 w-4 text-primary" />
                            <span className="sr-only">Vier notificação</span>
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost" className="">
                          <Link href={'#'}>
                            <Eye className="h-4 w-4 text-primary" />
                            <span className="sr-only">Marcar como lida</span>
                          </Link>
                        </Button>
                      </div>
                    </div >
                  </>
                ))}
              </div>
              <AlertDialogCancel className="my-4">Fechar</AlertDialogCancel>
            </AlertDialogContent>

            <AlertDialogFooter>
            </AlertDialogFooter>
          </AlertDialog>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}