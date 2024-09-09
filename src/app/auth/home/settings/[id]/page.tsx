import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { IconCasaBath, IconCasaBed, IconCasaFlame, IconCasaLandPlot, IconCasaLocate, IconCasaRuler, IconCasaWifi } from "../../../../_components/icons/home"
import { IconMountain } from "../../../../_components/icons"
import { ClientShow } from "@/db"
import { redirect } from "next/navigation"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'
import { CarouselImage, CreateClient } from "@/app/_components"

interface Props {
  params: { id: string }
}

export default async function Component({ params }: Props) {
  const id = params?.id

  const cliente = await ClientShow(id).then(res => {
    if (res instanceof Error) {
      return redirect('/home')
    }

    return res
  })

  return (
    <CreateClient client={cliente} />
  )
}