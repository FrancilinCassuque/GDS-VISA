import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
interface ICardProps {
  textoDoTitle?: string
  textoDaDescricao?: string
  linkDoBotao?: string
  textoDoBotao?: string
  iconDoBotao?: React.ReactNode
}

export const CardActionTop: React.FC<ICardProps> = async ({ iconDoBotao, linkDoBotao, textoDaDescricao, textoDoBotao, textoDoTitle }) => {

  return (
    <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>{textoDoTitle}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {textoDaDescricao}
        </CardDescription>
      </CardHeader>
      <CardFooter>
      {/* '/auth/processo/create' */}
        <Link href={linkDoBotao || ''}>
          <Button>
            {iconDoBotao} <span className="px-4">{textoDoBotao} </span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}