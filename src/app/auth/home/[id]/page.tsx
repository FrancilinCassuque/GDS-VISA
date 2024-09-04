import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { IconCasaBath, IconCasaBed, IconCasaFlame, IconCasaLandPlot, IconCasaLocate, IconCasaRuler, IconCasaWifi } from "../../../_components/icons/home"
import { IconMountain } from "../../../_components/icons"
import { CasaShow } from "@/db"
import { redirect } from "next/navigation"
import Image from "next/image"
import ReactMarkdown from 'react-markdown'
import { CarouselImage } from "@/app/_components"

interface Props {
  params: { id: string }
}

export default async function Component({ params }: Props) {
  const id = params?.id

  const casa = await CasaShow(id).then(res => {
    if (res instanceof Error) {
      return redirect('/home')
    }

    return res
  })

  casa.images.push(casa.user.image)

  return (
    <div className="flex flex-col w-full">
      <section className="relative h-[500px] w-full overflow-hidden">
        <Image
          src="/placeholder.svg"
          alt="Home Hero"
          width={1820}
          height={1080}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">{casa.name}</h1>
          <p className="mt-4 text-lg sm:text-xl text-white">
            <IconCasaLocate className="w-4 h-4 inline-block mr-1" />
            {`
              Rua de ${casa.address[0].rua}, 
              Bairro/Quarteirão de ${casa.address[0].bairro},
              Comuna/Destrito de ${casa.address[0].comuna},
              Município de ${casa.address[0].municipio},
              Província de ${casa.address[0].provincia},
              ${casa.address[0].pais}
              `}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg">Confirmar</Button>
            <Button variant="outline" size="lg">
              Agendar um Tour
            </Button>
          </div>
        </div>
      </section>
      <section className="container mx-auto my-12 grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Detalhes da casa</h2>
          <div className="flex items-center gap-2">
            <IconCasaBed className="h-6 w-6 text-primary" />
            <span>{
              (Number(casa.quarto) && Number(casa.quarto) >= 2) ? Number(casa.quarto) + ' Quartos' : casa.quarto + ' Quarto'
            }</span>
          </div>
          <div className="flex items-center gap-2">
            <IconCasaRuler className="h-6 w-6 text-primary" />
            <span>{
              (Number(casa.sala) && Number(casa.sala) >= 2) ? Number(casa.sala) + ' Salas' : casa.sala + ' Sala'
            }</span>
          </div>
          <div className="flex items-center gap-2">
            <IconCasaBath className="h-6 w-6 text-primary" />
            <span>{
              (Number(casa.casadebanho) && Number(casa.casadebanho) >= 2) ? Number(casa.casadebanho) + ' Casa de Banhos' : casa.casadebanho + ' Casa de Banho'
            }</span>
          </div>
          <div className="flex items-center gap-2">
            <IconCasaLandPlot className="h-6 w-6 text-primary" />
            <span>{
              (Number(casa.cozinha) && Number(casa.cozinha) >= 2) ? Number(casa.cozinha) + ' Cozinhas' : casa.cozinha + ' Cozinha'
            }</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Detalhes da Propriedade</h2>
          <ReactMarkdown children={casa.descricao ? casa.descricao : ''} />

          {/* {
            descricoes ? descricoes.map((descricao, index) => (
              <p key={index} className="indent-5 text-justify">{descricao}</p>
            )) : ''
          } */}

        </div>

        {/* <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Comodidades</h2>
          <ul className="grid grid-cols-2 gap-2">
            <li className="flex items-center gap-2">
              <IconCasaWifi className="h-6 w-6 text-primary" />
              <span>High-Speed Wifi</span>
            </li>
            <li className="flex items-center gap-2">
              <IconCasaBath className="h-6 w-6 text-primary" />
              <span>Private Hot Tub</span>
            </li>
            <li className="flex items-center gap-2">
              <IconCasaFlame className="h-6 w-6 text-primary" />
              <span>Cozy Fireplace</span>
            </li>
            <li className="flex items-center gap-2">
              <IconMountain className="h-6 w-6 text-primary" />
              <span>Mountain Views</span>
            </li>
          </ul>
        </div> */}

      </section>
      <section className="container mx-auto my-12 px-4">
        <h2 className="mb-4 text-2xl font-bold">Photo Gallery</h2>

        <CarouselImage listaDeImgs={casa.images} />

        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Image
            src="/placeholder.svg"
            alt="Home Gallery 1"
            width={600}
            height={400}
            className="h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src="/placeholder.svg"
            alt="Home Gallery 2"
            width={600}
            height={400}
            className="h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src="/placeholder.svg"
            alt="Home Gallery 3"
            width={600}
            height={400}
            className="h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src="/placeholder.svg"
            alt="Home Gallery 4"
            width={600}
            height={400}
            className="h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src="/placeholder.svg"
            alt="Home Gallery 5"
            width={600}
            height={400}
            className="h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src="/placeholder.svg"
            alt="Home Gallery 6"
            width={600}
            height={400}
            className="h-full w-full rounded-lg object-cover object-center"
          />
        </div> */}

      </section>

      {/* <section className="container mx-auto my-12 px-4">
        <h2 className="mb-4 text-2xl font-bold">Agende um tour</h2>
        <Card className="max-w-lg">
          <CardContent>
            <form className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-col items-start w-full h-auto">
                        <span className="font-semibold uppercase text-[0.65rem]">Select Date</span>
                        <span className="font-normal">4/2/2024</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 max-w-[276px]">
                      <Calendar />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Select>
                    <SelectTrigger className="h-auto">
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="10am">10:00 AM</SelectItem>
                      <SelectItem value="11am">11:00 AM</SelectItem>
                      <SelectItem value="12pm">12:00 PM</SelectItem>
                      <SelectItem value="1pm">1:00 PM</SelectItem>
                      <SelectItem value="2pm">2:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={4} placeholder="Let us know if you have any questions!" />
              </div>
              <Button size="lg">Agendar</Button>
            </form>
          </CardContent>
        </Card>
      </section> */}
    </div>
  )
}