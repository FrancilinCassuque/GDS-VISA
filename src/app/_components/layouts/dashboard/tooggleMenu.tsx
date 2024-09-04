'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ConfigButton, IconPanelLeft, listItem, subListItem } from "../.."
import Link from "next/link"

export const TooggleMenu:React.FC = () => {
  const classBaseLink = 'flex items-center gap-4 px-2.5'
  const classLinkHome = 'group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <IconPanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href={listItem[0].path}
            className={classLinkHome}
            prefetch={false}
          >
            {listItem[0].icon({ className: 'h-5 w-5 transition-all group-hover:scale-110' })}
            <span className="sr-only">{listItem[0].text}</span>
          </Link>

          {listItem.map((link, index) => (
            <div key={index}>
              {(index != 0) && (
                <Link
                  href={link.path}
                  className={`${classBaseLink} text-muted-foreground hover:text-foreground`}
                  prefetch={false}
                >
                  {link.icon({ className: "h-5 w-5" })}
                  {link.text}
                </Link>
              )}
            </div>
          ))}

          <ConfigButton text={'Configurações'}/>
        </nav>
      </SheetContent>
    </Sheet>
  )
}