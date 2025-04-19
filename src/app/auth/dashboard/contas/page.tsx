import { AutorizacaoCheck, CardAction, CardFacturasHomeTop, columnsFactura, TabelaDeDados, TabFacturas } from "@/app/_components"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FacturaIndex } from "@/db"
import { ReceiptText } from "lucide-react"


export default async function Contas() {
  const facturas = await FacturaIndex()

  if (facturas instanceof Error) return

  return (
    <main className="sm:mb-32 m-2">
      <AutorizacaoCheck />
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <CardFacturasHomeTop facturas={facturas} />
      </div>

      <div>
        {/* <TabFacturas facturas={facturas} /> */}
      </div>

    </main>
  )
}