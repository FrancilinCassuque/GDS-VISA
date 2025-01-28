import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"

interface ICardProps {
  textoDoTitle?: string
  textoDaDescricao?: string
  textoDoBotao?: string
  linkDoBotao?: string
  iconDoBotao?: React.ReactNode

  linkDoBotao2?: string
  iconDoBotao2?: React.ReactNode
  textoDoBotao2?: string
}

export const CardAction: React.FC<ICardProps> = async ({ iconDoBotao, linkDoBotao, iconDoBotao2, linkDoBotao2, textoDaDescricao, textoDoBotao, textoDoBotao2, textoDoTitle }) => {
  return (
    <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>{textoDoTitle}</CardTitle>
        <CardDescription className="w-fit max-w-lg text-balance leading-relaxed">
          {textoDaDescricao}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {/* '/auth/processo/create' */}

        {(textoDoBotao && linkDoBotao && iconDoBotao) && (
          <Link href={linkDoBotao || ''} className="">
            <Button>
              {iconDoBotao} <span className="px-2">{textoDoBotao} </span>
            </Button>
          </Link>
        )}

        {(textoDoBotao2 && linkDoBotao2 && iconDoBotao2) && (
          <Link href={linkDoBotao2 || ''} className="mx-2">
            <Button variant={'secondary'}>
              {iconDoBotao2} <span className="px-2">{textoDoBotao2} </span>
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}