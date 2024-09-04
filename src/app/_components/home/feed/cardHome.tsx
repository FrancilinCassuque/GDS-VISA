'use client'

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { IconCasaCalendar, IconCasaLocate, IconCasaStar } from "../../icons/home"
import Image from "next/image"
import { homeStore } from "@/store"
import { useEffect, useState } from "react"
import { ICasas } from "@/types"
import { CasaIndex } from "@/db"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Newspaper } from "lucide-react"

export default function HomeCardList() {
  const [casas, setCasas] = useState<ICasas[]>(homeStore.getState().casas)
  const { status } = useSession()

  useEffect(() => {
    CasaIndex().then((res) => {
      if (res instanceof Error) return

      if (res.tatal > 0) {
        setCasas(res.data)
        homeStore.getState().start(res.data)
        return
      }
    })
  }, [setCasas])

  return (
    <div className="flex flex-col items-center justify-center sm:grid-cols-2 lg:grid-cols-3">
      {((casas.length <= 0) && (status == 'authenticated')) ? (

        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Nenhuma Propriedade Registrada
          </h3>
          <p className="text-sm text-muted-foreground">
            Aproveita e Seja o Primeiro a registrar a tua Propriedade.
          </p>
          <Link href={'/auth/home/create'}><Button className="mt-4"><Newspaper/> <span className="p-4">Registrar Propriedade</span></Button></Link>
        </div>
      ) : (
        <>
          {
            casas.map(casa => (
              <Card key={casa.id} className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                <Image src="/placeholder.png" alt="Home Image" width={400} height={300} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="flex flex-col items-start mb-2">
                    <h3 className="text-2xl font-bold">{casa.name}</h3>
                    <div className="flex items-center gap-1 text-primary text-sm">
                      <IconCasaStar className="w-4 h-4 fill-current" />
                      <IconCasaStar className="w-4 h-4 fill-current" />
                      <IconCasaStar className="w-4 h-4 fill-current" />
                      <IconCasaStar className="w-4 h-4 fill-muted stroke-muted-foreground" />
                      <IconCasaStar className="w-4 h-4 fill-muted stroke-muted-foreground" />
                      <span className="text-muted-foreground">4.2</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {`${casa.quarto} quarto, ${casa.sala} Sala, ${casa.casadebanho} Casa de Banho, ${casa.cozinha} Cozinha e Quintal ${casa.quintal}`}
                  </p>
                  <div className="flex items-center justify-between">
                    {/* <span className="text-2xl font-bold text-primary">$99.99</span> */}
                    <Link
                      href={`/auth/home/${casa.id}`}
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      prefetch={false}
                    >
                      Saber mais
                    </Link>
                  </div>
                  <div className="mt-4 text-muted-foreground">
                    <p>
                      <IconCasaLocate className="w-4 h-4 inline-block mr-1" />
                      {`${casa.address[0].rua}, ${casa.address[0].bairro}, ${casa.address[0].comuna}, ${casa.address[0].municipio}, ${casa.address[0].provincia}, ${casa.address[0].pais}`}
                    </p>
                    <p className="mt-2">
                      <IconCasaCalendar className="w-4 h-4 inline-block mr-1" />
                      <span>{new Date(casa.updatedAt).toLocaleDateString('pt-Br', {
                        weekday: 'short',
                        year: '2-digit',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                      }</span>
                    </p>
                  </div>
                </div>
              </Card>
            ))
          }
        </>
      )}
    </div>
  )
}
