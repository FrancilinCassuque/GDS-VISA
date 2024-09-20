import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { IClient } from "@/types"
import { CardAction, IconUserPlus } from "../.."

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
  const clientesAtivos = clientes.filter(cli => cli.processos.length > 0)
  const ativosPerc = (clientesAtivos.length / clientes.length) * 100


  return (
    <>
      <CardAction
        textoDoTitle="Clientes"
        iconDoBotao={<IconUserPlus />}
        textoDoBotao="Registrar novo "
        textoDaDescricao="Registra o Cliente para poder Abrir um Processo."
        linkDoBotao={'/auth/client/create'}
      />

      {
        clientes.length > 0 && (
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

            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Clientes Activos</CardDescription>
                <CardTitle className="text-4xl">{clientesAtivos.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">{`+${ativosPerc.toFixed()}% com processos Activos`}</div>
              </CardContent>
              <CardFooter>
                <Progress value={ativosPerc} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </>
        )
      }
    </>
  )
}