import { TabFacturas, AutorizacaoCheck } from "@/app/_components"
import { FacturaIndex } from "@/db"


export default async function FacturasShow() {
  const facturas = await FacturaIndex()

  if (facturas instanceof Error) return

  return (
    <main className="sm:mb-32">
      <AutorizacaoCheck />

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        {/* <CardFacturasHomeTop facturas={facturas} /> */}
      </div>

      <div>
        <TabFacturas facturas={facturas} />
      </div>

    </main>
  )
}