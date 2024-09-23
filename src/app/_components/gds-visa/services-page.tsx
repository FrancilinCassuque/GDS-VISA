'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const services = [
  {
    category: "Web Development",
    items: [
      { name: "Custom Website Design", description: "Tailored websites for your brand", price: "$1000+", image: "/placeholder.svg?height=200&width=300" },
      { name: "E-commerce Solutions", description: "Online stores with secure payments", price: "$1500+", image: "/placeholder.svg?height=200&width=300" },
      { name: "Web App Development", description: "Interactive web applications", price: "$2000+", image: "/placeholder.svg?height=200&width=300" },
    ]
  },
  {
    category: "Digital Marketing",
    items: [
      { name: "SEO Optimization", description: "Improve your search engine rankings", price: "$500/month", image: "/placeholder.svg?height=200&width=300" },
      { name: "Social Media Management", description: "Engage your audience on social platforms", price: "$700/month", image: "/placeholder.svg?height=200&width=300" },
      { name: "Content Marketing", description: "Compelling content to attract customers", price: "$800/month", image: "/placeholder.svg?height=200&width=300" },
    ]
  },
  {
    category: "Graphic Design",
    items: [
      { name: "Logo Design", description: "Unique brand identity creation", price: "$300+", image: "/placeholder.svg?height=200&width=300" },
      { name: "Brochure Design", description: "Eye-catching marketing materials", price: "$200+", image: "/placeholder.svg?height=200&width=300" },
      { name: "UI/UX Design", description: "User-friendly interface designs", price: "$1000+", image: "/placeholder.svg?height=200&width=300" },
    ]
  }
]

export const ServicesPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <Image src="/placeholder.svg" alt="Gota D' Sol Logo" width={350} height={350} className="mx-auto" />

      <h1 className="text-3xl font-bold mb-8 text-center">Nossos serviços</h1>
      <Tabs defaultValue={services[0].category} className="w-full">
        <TabsList className="">
          {services.map((category) => (
            <TabsTrigger key={category.category} value={category.category}>
              {category.category}
            </TabsTrigger>
          ))}
        </TabsList>
        {services.map((category) => (
          <TabsContent key={category.category} value={category.category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <Card key={item.name} className="flex flex-col">
                  <div className="relative w-full pt-[56.25%]">
                    <Image
                      src={'/placeholder.png'}
                      alt={`Image representing ${item.name}`}
                      layout="fill"
                      // objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-2xl font-bold">{item.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Learn More</Button>
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