import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Newspaper } from "lucide-react"
import { IProcesso } from "@/types"
import { CardAction } from "../.."

interface ICardProps {
  processos: IProcesso[]
  aceites?: IProcesso[]
  recusado?: IProcesso[]
  pagamento?: IProcesso[]
  passaport?: IProcesso[]
}

export const CardProcessoHomeTop: React.FC<ICardProps> = async ({ processos, aceites, recusado, pagamento, passaport }) => {

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
      <CardAction
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
                <div className="text-xs text-muted-foreground">{`+${Number.parseInt(EssaSemanaPorcento.toPrecision(2))}% Registrados Essa semana`}</div>
              </CardContent>
              <CardFooter>
                <Progress value={EssaSemanaPorcento} aria-label="25% increase" />
              </CardFooter>
            </Card>

            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Processos Activos</CardDescription>
                <CardTitle className="text-4xl text-center">{abertos.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground text-center">{`${abertoPerc.toFixed()}% com a processos activos`}</div>
              </CardContent>
              <CardFooter>
                <Progress value={abertoPerc} aria-label="12% increase" />
              </CardFooter>
            </Card>

            {aceites && (
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="pb-2">
                  <CardDescription>Processos Aceites</CardDescription>
                  <CardTitle className="text-4xl text-center mb-2">{`${aceites?.length ? ((aceites.length / processos.length) * 100).toFixed() : 0}%`}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">{`${aceites.length} Processos que o Visto Saio.`}</div>
                </CardContent>
                <CardFooter>
                  <Progress value={((aceites.length / processos.length) * 100)} aria-label="12% increase" />
                </CardFooter>
              </Card>
            )}

            {pagamento && (
              <Card x-chunk="dashboard-05-chunk-4">
                <CardHeader className="pb-2">
                  <CardDescription>Pagamentos em Atraso.</CardDescription>
                  <CardTitle className="text-4xl text-center">{`${pagamento?.length ? ((pagamento.length / processos.length) * 100).toFixed() : 0}`}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">{`${pagamento?.length} Processos com a pagamentos em atraso`}</div>
                </CardContent>
                <CardFooter>
                  <Progress value={((pagamento.length / processos.length) * 100)} aria-label="12% increase" />
                </CardFooter>
              </Card>
            )}


            {passaport && (
              <Card x-chunk="dashboard-05-chunk-5">
                <CardHeader className="pb-2">
                  <CardDescription>Processos Pendentes a Passaporte</CardDescription>
                  <CardTitle className="text-4xl text-center">{passaport.length ? ((passaport.length / processos.length) * 100).toFixed() : 0}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">{`${passaport.length} Passaport por receber no centro`}</div>
                </CardContent>
                <CardFooter>
                  <Progress value={((passaport.length / processos.length) * 100)} aria-label="increase" />
                </CardFooter>
              </Card>
            )}

            {recusado && (
              <Card x-chunk="dashboard-05-chunk-6">
                <CardHeader className="pb-2">
                  <CardDescription>Processos Recusados</CardDescription>
                  <CardTitle className="text-4xl text-center">{recusado?.length ? ((recusado.length / processos.length) * 100).toFixed() : 0}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">{`${recusado.length} Processos Recusados`}</div>
                </CardContent>
                <CardFooter>
                  <Progress value={((recusado.length / processos.length) * 100)} aria-label="increase" />
                </CardFooter>
              </Card>
            )}
          </>
        )
      }
    </>
  )
}