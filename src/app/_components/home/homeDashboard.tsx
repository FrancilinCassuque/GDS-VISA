import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DataTableClientes, IconUserPlus, TabelaClientes } from ".."
import { Newspaper } from "lucide-react"
import { ClientIndex, processoIndex } from "@/db"
import { CardClientsHomeTop } from "./feed/clientCardTop"
import { CardProcessoHomeTop } from "./feed/processoCardTop"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tabelaprocessos } from "../user/tableProcessos"

export const HomeDashboard: React.FC = async () => {
  const clientes = await ClientIndex()
  const processos = await processoIndex()

  if (clientes instanceof Error) return
  if (processos instanceof Error) return

  const clientesAtivos = clientes.filter(cli => cli.processos.length > 0)

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

          <CardProcessoHomeTop processos={processos} />
        </div>


        <Tabs defaultValue="totalClientes">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="totalClientes">Total de Clientes</TabsTrigger>
              <TabsTrigger value="clientesActivos">Clentes Ativos</TabsTrigger>
              <TabsTrigger value="processos">Processos</TabsTrigger>
            </TabsList>

          </div>
          <TabsContent value="totalClientes">
            <DataTableClientes listaDeClientes={clientes} />
          </TabsContent>

          <TabsContent value="clientesActivos">
            <DataTableClientes listaDeClientes={clientesAtivos} />
          </TabsContent>

          <TabsContent value="processos">
            <Tabelaprocessos processos={processos} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}