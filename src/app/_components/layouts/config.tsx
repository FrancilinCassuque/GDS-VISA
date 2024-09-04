'use client'

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import Link from "next/link"
import { IconSettings } from "../icons"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface IConfigProps{
  text?: string
}

export const ConfigButton: React.FC<IConfigProps> = ({text}) => {
  const { setTheme, theme } = useTheme()
  const [ tema, setTema ] = useState(theme)

  useEffect(() => {
    if(!tema){
      return
    }
    setTheme(tema)
  }, [tema, setTheme])


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
          prefetch={false}
        >
          <IconSettings className="h-5 w-5" />
          {text}
        </Link>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Configurações</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Ajusta as configurações do teu aplicativo.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4 w-full">
              <Label htmlFor="theme">Theme</Label>
              <Select onValueChange={(e) => { setTema(e) }} value={tema}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={tema} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="language">Language</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}


export const ConfigButtonPC: React.FC = () => {
  const { setTheme, theme } = useTheme()
  const [ tema, setTema ] = useState('')
  
  useEffect(() => {
    setTheme(tema)
  }, [tema, setTheme])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Link href="#">Settings</Link>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Adjust your application settings.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4 w-full">
              <Label htmlFor="theme">Theme</Label>
              <Select  onValueChange={(e) => { setTema(e) }} value={tema}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={tema} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="language">Language</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}