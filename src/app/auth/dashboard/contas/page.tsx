import { CardAction, columnsFactura, TabelaDeDados, TabFacturas } from "@/app/_components"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FacturaIndex } from "@/db"
import { ReceiptText } from "lucide-react"


export default async function Contas() {
  const facturas = await FacturaIndex()

  if (facturas instanceof Error) return

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 sm:mb-64">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <CardAction
            textoDoTitle="Fazer Facturas"
            iconDoBotao={<ReceiptText />}
            textoDoBotao="Nova Factura"
            textoDaDescricao="Registra para poder fazer Contas."
            linkDoBotao={'/auth/dashboard/contas/create'}
          />


          <div>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription className="text-center">Facturas</CardDescription>
                <CardTitle className="text-4xl text-center">{facturas.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">{`Total de Facturas Registradas`}</div>
              </CardContent>
              <CardFooter>
                {/* <Progress value={EssaSemanaPorcento} aria-label="25% increase" /> */}
              </CardFooter>
            </Card>
          </div>
        </div>

        <div>
          <TabFacturas facturas={facturas} />
        </div>

      </div>
    </main>
  )
}