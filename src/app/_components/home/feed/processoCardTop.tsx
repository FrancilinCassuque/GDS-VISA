import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Newspaper } from "lucide-react"
import { IProcesso } from "@/types"

interface ICardProps {
  processos: IProcesso[]
}

export const CardProcessoHomeTop: React.FC<ICardProps> = async ({ processos }) => {

  if (processos instanceof Error) return

  const semanaCliActual = processos.filter(cli => {
    if ((cli.updatedAt.getFullYear() == new Date().getFullYear()) &&
      (cli.updatedAt.getMonth() == new Date().getMonth()) &&
      (cli.updatedAt.getDate() >= new Date().getDate() - 7) &&
      (cli.updatedAt.getDate() <= new Date().getDate())) {
      return cli
    }
  })

  const semanaCliPassada = processos.filter(cli => {
    if ((cli.updatedAt.getFullYear() == new Date().getFullYear()) &&
      (cli.updatedAt.getMonth() == new Date().getMonth()) &&
      (cli.updatedAt.getDate() >= new Date().getDate() - 14) &&
      (cli.updatedAt.getDate() <= new Date().getDate() + 7)) {
      return cli
    }
  })

  const EssaSemanaPorcento = (semanaCliActual.length / semanaCliPassada.length) * 100

  return (
    <>
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Processos</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Abrir um Processo.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={'/auth/processo/create'}>
            <Button>
              <Newspaper /> <span className="px-4">Novo Processo </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {
        processos.length > 0 && (
          <>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Total de processos</CardDescription>
                <CardTitle className="text-4xl text-center">{processos.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">{`+${EssaSemanaPorcento}% Essa semana`}</div>
              </CardContent>
              <CardFooter>
                <Progress value={EssaSemanaPorcento} aria-label="25% increase" />
              </CardFooter>
            </Card>

            {/* <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">+10% from last month</div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card> */}
          </>
        )
      }
    </>
  )
}