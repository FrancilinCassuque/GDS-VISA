'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { listItem, subListItem } from "../../listas/listaDeItensDoMenuBar"
import { ConfigButton } from "../config"
import { Bell, CalendarArrowUp, Check, Eye, MessageCircleWarning } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { INotificacao } from "@/types"
import { AlertDialogHeader, AlertDialogTrigger, AlertDialog, AlertDialogTitle, AlertDialogContent, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"
import Image from "next/image"

interface IAsideProps {
  notificacoes?: INotificacao[]
}

export const AsideBar: React.FC<IAsideProps> = ({ notificacoes }) => {
  const classLink = 'flex h-9 w-9 rounded-lg text-muted-foreground transition-colors hover:text-foreground md:w-full'
  const [abrir, setAbrir] = useState(false)

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-52 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col  gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Link
            href={listItem[0].path}
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-16 md:w-16 md:text-base"
            prefetch={false}
          >
            {/* {listItem[0].icon({ className: "h-10 w-10 transition-all group-hover:scale-110" })}
            <span className="sr-only">{listItem[0].text}</span> */}
            <Image src={'/placeholder.svg'} alt="Logo da Gota de Sol" width={350} height={350} className="w-96 h-96" />
          </Link>

          {listItem.map((link, index) => (
            <div key={index}>
              {(index != 0) && (
                <Tooltip >
                  <TooltipTrigger asChild>
                    <Link
                      href={link.path}
                      className={`${classLink}`}
                      prefetch={false}
                    >

                      <span className="flex"><strong className="mx-1 p-1 text-primary">{link.icon({ className: `h-8 w-8` })}</strong> <strong className="mx-1 p-2">{link.text}</strong></span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.text}</TooltipContent>
                </Tooltip>
              )}
            </div>
          ))}

        </TooltipProvider>
      </nav>

      {/* Sub Lista */}
      <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5">
        <TooltipProvider>

          <AlertDialog open={abrir} onOpenChange={setAbrir}>
            <AlertDialogTrigger>
              <Link href={'#'} className={"flex text-muted-foreground transition-colors hover:text-foreground"} onClick={(e) => {
                e.preventDefault()
                setAbrir(!abrir)
              }}>
                <Bell className="h-8 w-8 mx-2" color={"#f77902"} />Notificações
                {(notificacoes && notificacoes.length > 0) && (
                  <Badge className="ml-auto flex h-6 w-4 shrink-0 items-center justify-center rounded-full bg-primary">{notificacoes.length ? notificacoes.length : ''}</Badge>
                )}

              </Link>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-full w-screen h-screen p-0 m-0">
              <AlertDialogHeader>
                <AlertDialogTitle>Notificações</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="w-full flex items-center justify-start flex-col">
                {notificacoes?.map(not => (
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

          {subListItem.map((link, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={link.path}
                  className={`${classLink}`}
                  prefetch={false}
                >
                  <span className="text-primary">{link.icon({ className: `h-8 w-8 mx-2` })}</span>
                  <span className="">{link.text}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{link.text}</TooltipContent>
            </Tooltip>
          ))}

          <Tooltip>
            <TooltipTrigger asChild>
              <ConfigButton text="Mudar Tema" />
            </TooltipTrigger>
            <TooltipContent side="right">Tema</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside >
  )
} 