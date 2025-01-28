import { CardClientsHomeTop, CardProcessoHomeTop, TabProcessos, TabClientes } from ".."
import { ClientIndex, processoIndex } from "@/db"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const HomeDashboard: React.FC = async () => {
  const clientes = await ClientIndex()
  const processos = await processoIndex()

  if (clientes instanceof Error) return
  if (processos instanceof Error) return

  const clientesAtivos = clientes.filter(cli => cli.processos.length > 0)


  return (
    <main className="sm:mb-32">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <CardClientsHomeTop clientes={clientes} />

          <CardProcessoHomeTop processos={processos} />
        </div>


        <Tabs defaultValue="totalClientes">
          <div className="flex items-center">
            <TabsList>
              {clientes.length > 0 && (
                <>
                  <TabsTrigger value="totalClientes">Total de Clientes</TabsTrigger>
                  <TabsTrigger value="clientesActivos">Clentes Ativos</TabsTrigger>
                </>
              )}

              {processos.length > 0 && (
                <TabsTrigger value="processos">Processos</TabsTrigger>
              )}
            </TabsList>

          </div>

          {clientes.length > 0 && (
            <TabsContent value="totalClientes">
              <TabClientes clientes={clientes} />
            </TabsContent>
          )}


          {clientesAtivos.length > 0 && (
            <TabsContent value="clientesActivos">
              <TabClientes clientes={clientesAtivos} />
            </TabsContent>
          )}

          {processos.length > 0 && (
            <TabsContent value="processos">
                <TabProcessos processos={processos} />
            </TabsContent>
          )}
        </Tabs>

      </div>
    </main>
  )
}