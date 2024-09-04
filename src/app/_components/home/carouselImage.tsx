'use client'
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CarouselImgProps {
  listaDeImgs: string[]
}

export const CarouselImage: React.FC<CarouselImgProps> = ({ listaDeImgs }) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="mx-auto max-w-xs">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {listaDeImgs.map((img, index) => (
            <CarouselItem key={index}>
              <Link href={'#'} onClick={(e) => {
                e.preventDefault()
                alert('Teste de click em fotos')
              }}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image src={img} alt={'Imagem da casa'} width={1200} height={1200} />
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div >
  )
}
