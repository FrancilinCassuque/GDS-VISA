import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Newspaper } from "lucide-react"
import { ClientIndex } from "@/db"
import { IClient } from "@/types"
import { IconUserPlus, TabDashboard } from "../.."

interface ICardProps {
  clientes: IClient[]
}

export const CardClientsHomeTop: React.FC<ICardProps> = async ({ clientes }) => {

  if (clientes instanceof Error) return

  const semanaCliActual = clientes.filter(cli => {
    if ((cli.updatedAt.getFullYear() == new Date().getFullYear()) &&
      (cli.updatedAt.getMonth() == new Date().getMonth()) &&
      (cli.updatedAt.getDate() >= new Date().getDate() - 7) &&
      (cli.updatedAt.getDate() <= new Date().getDate())) {
      return cli
    }
  })

  const semanaCliPassada = clientes.filter(cli => {
    if ((cli.updatedAt.getFullYear() == new Date().getFullYear()) &&
      (cli.updatedAt.getMonth() == new Date().getMonth()) &&
      (cli.updatedAt.getDate() >= new Date().getDate() - 14) &&
      (cli.updatedAt.getDate() <= new Date().getDate() + 7)) {
      return cli
    }
  })

  const EssaSemanaPorcento = (semanaCliActual.length / semanaCliPassada.length) * 100

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 sm:mb-64">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Clientes</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Registra o Cliente para poder Abrir um Processo.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={'/auth/client/create'}>
                <Button>
                  <IconUserPlus /> <span className="px-4">Registrar novo </span>
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {clientes.length > 0 && (
            <>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>Total de Clientes</CardDescription>
                  <CardTitle className="text-4xl text-center">{clientes.length}</CardTitle>
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
          )}
        </div>
      </div>
    </main>
  )
}