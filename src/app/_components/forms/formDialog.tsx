'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface IDrawerDialogProps {
  children: React.ReactNode
  textoDoBotao?: string
  textoDoTitulo?: string
  icon?: React.ReactNode
  descricao: string
  opened?: boolean
}

export const DrawerDialog: React.FC<IDrawerDialogProps> = ({ children, textoDoBotao, descricao,textoDoTitulo, icon, opened }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (opened) {
      setOpen(opened)
    }
  }, [opened])

  return (
    <Dialog open={open} onOpenChange={opened ? undefined : setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-none border-none max-w-min max-h-min">
          {icon}
          {textoDoBotao}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{textoDoTitulo}</DialogTitle>
          <DialogDescription>
            {descricao}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )

}
