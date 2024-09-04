'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { listItem } from "../../listas/listaDeItens"
import { ConfigButton } from "../config"


export const AsideBar: React.FC = () => {
  const classLink = 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'

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
          {/* {subListItem.map((link, index) => ( */}
            <Tooltip>
              <TooltipTrigger asChild>
                <ConfigButton/>
              </TooltipTrigger>
              <TooltipContent side="right">definições</TooltipContent>
            </Tooltip>
          {/* ))} */}
        </TooltipProvider>
      </nav>
    </aside>
  )
} 