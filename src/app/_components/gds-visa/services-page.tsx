'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IService } from '@/types'
import { useEffect, useState } from 'react'
import { set } from 'date-fns'
import Link from 'next/link'

interface IServiceProps {
  servicos?: IService[]
}

export const ServicesPage: React.FC<IServiceProps> = ({ servicos }) => {
  if (!servicos) {
    servicos = []
  }

  const removeDuplicates = (arr: string[]): string[] => {
    return arr.filter((item, index) => arr.indexOf(item) === index)
  }

  // Example
  // const arr = ['apple', 'banana', 'orange', 'apple', 'banana'];
  // const uniqueArr = removeDuplicates(arr);
  // console.log(uniqueArr); // Output: ['apple', 'banana', 'orange']


  const [tipos, setTipos] = useState<string[]>([])

  useEffect(() => {
    const t: string[] = []

    servicos.map(serv => {
      t.push(serv.tipo)
    })

    const fiter = removeDuplicates(t)
    setTipos(fiter)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <Image src="/placeholder.svg" alt="Gota D' Sol Logo" width={350} height={350} className="mx-auto" />

      <h1 className="text-xl font-bold mb-8 text-center bg-primary/10">serviços</h1>
      <Tabs defaultValue={tipos.length > 0 ? tipos[0] : 'VISTO'}>
        <TabsList className='w-full'>
          {tipos.map((service, i) => (
            <>
              <TabsTrigger key={i} value={service}>
                {service}
              </TabsTrigger>
            </>
          ))}
        </TabsList>

        {tipos.map((tipo) => (
          <TabsContent key={tipo} value={tipo}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">

              {servicos.filter(serv => serv.tipo == tipo).map((item) => (
                <Card key={item.id} className="flex flex-col">
                  <div className="relative w-full pt-[56.25%]">

                    {item.nome == 'Visto de Estada Temporária da CPLP' ? (
                      <Image
                        src={'/services/estadaTemporaria.jpg'}
                        alt={`Image representing ${item.nome}`}
                        layout="fill"
                        // objectFit="cover"
                        className="rounded-t-lg"
                      />
                    ) : item.nome == 'Visto de Saúde da CPLP' ? (
                      <Image
                        src={'/services/vitoSaude.jpg'}
                        alt={`Image representing ${item.nome}`}
                        layout="fill"
                        // objectFit="cover"
                        className="rounded-t-lg"
                      />
                    ) : item.nome == 'Promoção de Bilhetes de Passagens - AirFrances' ? (

                      <Image
                        src={'/services/airFrances.jpg'}
                        alt={`Image representing ${item.nome}`}
                        layout="fill"
                        // objectFit="cover"
                        className="rounded-t-lg"
                      />
                    ) : item.nome == 'Visto de Turismo' ? (

                      <Image
                        src={'/services/vistoDeTurismo.jpg'}
                        alt={`Image representing ${item.nome}`}
                        layout="fill"
                        // objectFit="cover"
                        className="rounded-t-lg"
                      />
                    ) : (
                      <Image
                        src={'/placeholder.png'}
                        alt={`Image representing ${item.nome}`}
                        layout="fill"
                        // objectFit="cover"
                        className="rounded-t-lg"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{item.nome}</CardTitle>
                    <CardDescription>
                      <div className="mt-5">
                        {item.descricao}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-xl font-semibold text-green-800">{item.preco.toLocaleString('AO', { style: 'currency', currency: 'AOA' })}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Link href={'/gds-visa/contactos'}>Agendar Serviço</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Button onClick={() => window.history.back()} variant={'secondary'} className='my-4 p-4'>Voltar</Button>
    </div>
  )
}