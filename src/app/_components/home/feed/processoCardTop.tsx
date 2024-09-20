import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Newspaper } from "lucide-react"
import { IProcesso } from "@/types"
import { CardActionTop } from "../.."

interface ICardProps {
  processos: IProcesso[]
}

export const CardProcessoHomeTop: React.FC<ICardProps> = async ({ processos }) => {

  if (processos instanceof Error) return

  const abertos = processos.filter(pro => pro.estado == 'Activo')
  const abertoPerc = (abertos.length / processos.length) * 100

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
      <CardActionTop
        textoDoTitle="Processos"
        iconDoBotao={<Newspaper />}
        textoDoBotao="Novo Processo "
        textoDaDescricao="Abra Processos. para poder Gerar Facturas."
        linkDoBotao={'/auth/processo/create'}
      />

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

            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Total de Processos Activos</CardDescription>
                <CardTitle className="text-4xl text-center">{abertos.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">{`${abertoPerc.toFixed()}% com a primeira parcela Paga`}</div>
              </CardContent>
              <CardFooter>
                <Progress value={abertoPerc} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </>
        )
      }
    </>
  )
}