import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CasaIndex } from "@/db"
import Link from "next/link"
import HomeCard from "./cardHome"
import Image from "next/image"


export const HomePosts: React.FC = async () => {
  const casas = await CasaIndex()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <HomeCard/>
      
      {/* {casas.data?.map(casa => ( */}

        {/* <Card key={casa.id}>
          <CardContent className="p-0">
            <Image
              src="/placeholder.svg"
              width={400}
              height={225}
              alt="Article Image"
              className="object-cover aspect-video"
            />
          </CardContent>
          <CardHeader className="p-4">
            <h3 className="text-lg font-semibold tracking-tight">{casa.name}</h3>
            <p className="text-sm text-muted-foreground">
              Exploring the latest trends and technologies shaping the web.
              {`${casa.quarto} quarto, ${casa.sala} Sala, ${casa.casadebanho} Casa de Banho, ${casa.cozinha} Cozinha e Quintal ${casa.quintal}`}
            </p>
          </CardHeader>
          <CardFooter className="p-4">
            <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
              Read More
            </Link>
          </CardFooter>
        </Card> */}
      {/* ))} */}


    </div>
  )
}