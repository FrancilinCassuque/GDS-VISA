'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ConfigButton, IconPanelLeft, listItem, subListItem } from "../.."
import Link from "next/link"
import { useState } from "react"

export const TooggleMenu: React.FC = () => {
  const classBaseLink = 'flex items-center gap-4 px-2.5'
  const classLinkHome = 'group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <IconPanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="sm:max-w-xs h-full overflow-auto">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href={listItem[0].path}
            onClick={() => setOpen(!open)}
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
                  onClick={() => setOpen(!open)}
                  prefetch={false}
                >
                  {link.icon({ className: "h-5 w-5" })}
                  {link.text}
                </Link>
              )}
            </div>
          ))}

          {subListItem.map((link, index) => (
            <Link
              href={link.path}
              className={`${classBaseLink} text-muted-foreground hover:text-foreground`}
              onClick={() => setOpen(!open)}
              prefetch={false}
            >
              {link.icon({ className: `h-5 w-5` })}
              {link.text}
            </Link>
          ))}

          <ConfigButton text={'Tema'} />
        </nav>
      </SheetContent>
    </Sheet>
  )
}