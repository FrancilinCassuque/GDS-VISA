import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { IconUserPlus, TabDashboard } from ".."
import { Newspaper } from "lucide-react"
import { ClientIndex, processoIndex } from "@/db"
import { CardClientsHomeTop } from "./feed/clientCardTop"
import { CardProcessoHomeTop } from "./feed/processoCardTop"
import { ClientStore } from "@/store"

export const HomeDashboard: React.FC = async () => {
  const clientes = await ClientIndex()
  const processo = await processoIndex()

  if (clientes instanceof Error) return
  if (processo instanceof Error) return
  
  ClientStore.getState().start(clientes)

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
          <CardClientsHomeTop clientes={clientes} />

          <CardProcessoHomeTop processos={processo} />
        </div>

        <TabDashboard clientes={clientes} />
      </div>
    </main>
  )
}