'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { listItem, subListItem } from "../../listas/listaDeItensDoMenuBar"
import { ConfigButton } from "../config"
import { Bell, Eye, MessageCircleWarning } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { INotificacao } from "@/types"
import { AlertDialogHeader, AlertDialogTrigger, AlertDialog, AlertDialogTitle, AlertDialogContent, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AvatarIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"

interface IAsideProps {
  notificacoes?: INotificacao[]
}

export const AsideBar: React.FC<IAsideProps> = ({ notificacoes }) => {
  const classLink = 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
  const [abrir, setAbrir] = useState(false)

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Link
            href={listItem[0].path}
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            prefetch={false}
          >
            {listItem[0].icon({ className: "h-4 w-4 transition-all group-hover:scale-110" })}
            <span className="sr-only">{listItem[0].text}</span>
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
                      {link.icon({ className: `h-5 w-5` })}
                      <span className="sr-only">{link.text}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.text}</TooltipContent>
                </Tooltip>
              )}
            </div>
          ))}

        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>



          <Tooltip>
            <TooltipTrigger>

              <AlertDialog open={abrir} onOpenChange={setAbrir}>
                <AlertDialogTrigger>
                  <Link href={'#'} className={notificacoes?.length ? "grid grid-cols-2" : "grid grid-cols-1"} onClick={(e) => {
                    e.preventDefault()
                    setAbrir(!abrir)
                  }}>
                    <Bell className="h-5 w-5" />
                    {(notificacoes && notificacoes.length > 0) && (
                      <Badge className="ml-auto flex h-6 w-4 shrink-0 items-center justify-center rounded-full bg-primary">{notificacoes.length ? notificacoes.length : ''}</Badge>
                    )}
                  </Link>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Notificações</AlertDialogTitle>
                    <div className="w-full flex items-center justify-start">
                      {notificacoes?.map(not => (
                        <>
                          {/* <Card className="w-[350px]">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
                                <AvatarFallback>UN</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">{not.tipo}</h4>
                                <p className="text-sm text-muted-foreground">{not.mensagem}</p>
                              </div>
                            </CardHeader>
                            <CardContent>
                            <p className="text-sm">
                              Hey there! I just wanted to check in and see how you're doing with the project. Let me know if you need any help!
                            </p>
                          </CardContent>
                            <CardFooter className="flex justify-between">
                              <Button variant="outline">Dismiss</Button>
                              <Button>Reply</Button>
                            </CardFooter>
                          </Card> */}

                          <div className="flex items-center space-x-4 rounded-full p-1 shadow-md bg-black/5">
                            <Avatar className="h-12 w-12">
                              {/* <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User avatar" /> */}
                              {not.tipo == 'contacto' ? (
                                <MessageCircleWarning className="w-10 h-10 m-2" />
                              ) : null}

                            </Avatar>
                            <div className="flex-grow">
                              <p className="text-sm font-medium">{'Notificação'}</p>
                              <p className="text-xs text-muted-foreground">{not.mensagem}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="icon" variant="ghost">
                                <Bell className="h-4 w-4 text-primary" />
                                <span className="sr-only">Vier notificação</span>
                              </Button>
                              <Button size="sm" variant="ghost" className="">
                                <Eye className="h-4 w-4 text-primary" />
                                <span className="sr-only">Marcar como lida</span>
                              </Button>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogCancel className="my-4">Fechar</AlertDialogCancel>
                </AlertDialogContent>

                <AlertDialogFooter>
                </AlertDialogFooter>
              </AlertDialog>


            </TooltipTrigger>
            <TooltipContent>Notificações</TooltipContent>
          </Tooltip>

          {subListItem.map((link, index) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={link.path}
                  className={`${classLink}`}
                  prefetch={false}
                >
                  {link.icon({ className: `h-5 w-5` })}
                  <span className="sr-only">{link.text}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{link.text}</TooltipContent>
            </Tooltip>
          ))}

          <Tooltip>
            <TooltipTrigger asChild>
              <ConfigButton />
            </TooltipTrigger>
            <TooltipContent side="right">Tema</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
} 