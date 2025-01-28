import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { IClient, IFacturaList } from "@/types"
import { CardAction, IconUserPlus } from "../.."
import { Newspaper, ReceiptText } from "lucide-react"

interface ICardProps {
  facturas: IFacturaList[]
}

export const CardFacturasHomeTop: React.FC<ICardProps> = async ({ facturas }) => {

  if (facturas instanceof Error) return

  const totalPago = facturas.filter(tPago => tPago.estado == 'Total Pago')
  const primeiraCobrar = facturas.filter(tPago => tPago.estado == '1ª Parcela Pendente')
  const primeiraPaga = facturas.filter(tPago => tPago.estado == '1ª Parcela Paga')
  const segundaCobrar = facturas.filter(tPago => tPago.estado == '2ª Parcela Pendente')

  let valorTotalPagoKwanza = 0
  let valorPrimeiraCobrarKwanza = 0
  let valorPrimeiraPagaKwanza = 0
  let valorSegundaCobrarKwanza = 0
  let valorTotalKwanza = 0

  facturas.map(factura => {
    valorTotalKwanza += factura.total

    if (factura.estado == 'Total Pago') {
      valorTotalPagoKwanza += factura.total
    } else if (factura.estado == '1ª Parcela Pendente') {
      valorPrimeiraCobrarKwanza += factura.total
    } else if (factura.estado == '1ª Parcela Paga') {
      valorPrimeiraPagaKwanza += factura.total
    } else if (factura.estado == '2ª Parcela Pendente') {
      valorSegundaCobrarKwanza += factura.total
    }
  })

  const semanaCliActual = facturas.filter(cli => {
    if ((cli.updatedAt.getFullYear() == new Date().getFullYear()) &&
      (cli.updatedAt.getMonth() == new Date().getMonth()) &&
      (cli.updatedAt.getDate() >= new Date().getDate() - 7) &&
      (cli.updatedAt.getDate() <= new Date().getDate())) {
      return cli
    }
  })

  const semanaCliPassada = facturas.filter(cli => {
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
      <div className="">
        <CardAction
          textoDoTitle="Facturas"
          iconDoBotao={<ReceiptText />}
          textoDoBotao="Nova"
          textoDaDescricao="Facturas registradas no sistema."
          linkDoBotao={'/auth/dashboard/contas/create'}

          iconDoBotao2={<Newspaper />}
          textoDoBotao2="Ver Facturas"
          linkDoBotao2="#"
        />
      </div>

      <div className="">
        <CardAction
          textoDoTitle="Relatório"
          iconDoBotao={<ReceiptText />}
          textoDoBotao="Nova"
          textoDaDescricao="Fazer relatório das Facturas."
          linkDoBotao={'/auth/dashboard/contas/create'}

          iconDoBotao2={<Newspaper />}
          textoDoBotao2="Ver Relatórios"
          linkDoBotao2="#"
        />
      </div>
      <div className="">
        <CardAction
          textoDoTitle="Relatório"
          iconDoBotao={<ReceiptText />}
          textoDoBotao="Nova"
          textoDaDescricao="Fazer relatório das Facturas."
          linkDoBotao={'/auth/dashboard/contas/create'}

          iconDoBotao2={<Newspaper />}
          textoDoBotao2="Ver Relatórios"
          linkDoBotao2="#"
        />
      </div>

      {
        facturas.length > 0 && (
          <>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription className="text-center">Facturas</CardDescription>
                <CardTitle className="text-4xl text-center">{facturas.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  <p>
                    {`Total de Facturas Registradas. +${EssaSemanaPorcento.toFixed()}% de novas facturas nessa semana`}
                  </p>
                  <br />
                  <p>{`Possível Total em kwanzas ${valorTotalKwanza.toLocaleString('AOA', { currency: 'AOA', style: 'currency' })}`}</p>
                </div>
                <p>{``}</p>
              </CardContent>
              <CardFooter>
                <Progress value={facturas.length} aria-label={facturas.length.toFixed()} />
              </CardFooter>
            </Card>

            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription className="text-center">Factura Paga</CardDescription>
                <CardTitle className="text-4xl text-center">{totalPago.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  <p>
                    {`Total de Facturas 100% Pagas`}
                  </p>
                  <br />
                  <p>{`Possível Total em kwanzas ${valorTotalPagoKwanza.toLocaleString('AOA', { currency: 'AOA', style: 'currency' })}`}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={totalPago.length} aria-label={totalPago.length.toFixed()} />
              </CardFooter>
            </Card>

            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription className="text-center">Facturas / Primeira Paga</CardDescription>
                <CardTitle className="text-4xl text-center">{primeiraPaga.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  <p>
                    {`Total de Facturas com Primeira Parcela Paga`}
                  </p>
                  <br />
                  <p>{`Possível Total em kwanzas ${valorPrimeiraPagaKwanza.toLocaleString('AOA', { currency: 'AOA', style: 'currency' })}`}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={primeiraPaga.length} aria-label={primeiraPaga.length.toFixed()} />
              </CardFooter>
            </Card>

            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription className="text-center">Facturas / Primeira Pendente</CardDescription>
                <CardTitle className="text-4xl text-center">{primeiraCobrar.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  <p>
                    {`Total de Facturas com Primeira Parcela Pendente`}
                  </p>
                  <br />
                  <p>{`Possível Total em kwanzas ${valorPrimeiraCobrarKwanza.toLocaleString('AOA', { currency: 'AOA', style: 'currency' })}`}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={primeiraCobrar.length} aria-label={primeiraCobrar.length.toFixed()} />
              </CardFooter>
            </Card>

            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription className="text-center">Facturas / Segunda Pendente</CardDescription>
                <CardTitle className="text-4xl text-center">{segundaCobrar.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  <p>
                    {`Total de Facturas com Segunda Parcela Pendente`}
                  </p>
                  <br />
                  <p>{`Possível Total em kwanzas ${valorSegundaCobrarKwanza.toLocaleString('AOA', { currency: 'AOA', style: 'currency' })}`}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={segundaCobrar.length} aria-label={segundaCobrar.length.toFixed()} />
              </CardFooter>
            </Card>
          </>
        )
      }
    </>
  )
}