import { CardProcessoHomeTop, TabProcessos } from "@/app/_components"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { processoIndex } from "@/db"
import Link from "next/link"


export default async function Page() {
  const processos = await processoIndex()
  if (processos instanceof Error) return

  const activos = processos.filter(proc => proc.estado == 'Activo')
  const aceite = processos.filter(proc => proc.estado == 'Aceite')
  const recusado = processos.filter(proc => proc.estado == 'Recusado')
  const pagamento = processos.filter(proc => proc.estado == 'Pendente a Pagamento')
  const passaport = processos.filter(proc => proc.estado == 'Pendente a Passaporte')

  const nacional = activos.filter(proc => proc.tipo.toLowerCase() != 'visto de turismo')
  const turismo = activos.filter(proc => proc.tipo.toLowerCase() == 'visto de turismo')

  return (
    <>
      <Breadcrumb className="hidden md:flex m-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/auth/dashboard" prefetch={false}>
                Perfil
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Processos </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 sm:mb-64">

        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <CardProcessoHomeTop
              processos={processos}
              aceites={aceite.length ? aceite : undefined}
              pagamento={pagamento.length ? pagamento : undefined}
              passaport={passaport.length ? passaport : undefined}
              recusado={recusado.length ? recusado : undefined}
            />
          </div>


          <p className="text-center text-lg font-mono font-semibold bg-slate-300/25">Estado dos Processos</p>
          <Tabs defaultValue="activos">
            <div className="flex items-center">
              <TabsList>
                {processos.length && (
                  <TabsTrigger className="" value="total">Total</TabsTrigger>
                )}
                {activos.length && (
                  <TabsTrigger className="" value="activos">Ativos</TabsTrigger>
                )}

                {aceite.length && (
                  <TabsTrigger className="" value="aceites">Aceites</TabsTrigger>
                )}

                {pagamento.length && (
                  <TabsTrigger className="" value="Pagamentos">Pagamentos</TabsTrigger>
                )}

                {passaport.length && (
                  <div className="sr-only md:not-sr-only">
                    <TabsTrigger className="sr-only md:not-sr-only" value="Passaporte">Passaporte</TabsTrigger>
                  </div>
                )}

                {recusado.length && (
                  <div className="sr-only md:not-sr-only">
                    <TabsTrigger className="" value="Recusados">Recusados</TabsTrigger>
                  </div>
                )}
              </TabsList>

            </div>

            <TabsContent value="total">
              <TabProcessos processos={processos} />
            </TabsContent>


            <TabsContent value="activos">
              <TabProcessos processos={activos} />
            </TabsContent>

            <TabsContent value="aceites">
              <TabProcessos processos={aceite} />
            </TabsContent>

            <TabsContent value="Pagamentos">
              <TabProcessos processos={pagamento} free />
            </TabsContent>

            <TabsContent value="Passaporte">
              <TabProcessos processos={passaport} />
            </TabsContent>

            <TabsContent value="Recusados">
              <TabProcessos processos={recusado} />
            </TabsContent>
          </Tabs>

          <p className="text-center text-lg font-mono font-semibold bg-slate-300/25">Tipo de Processos</p>
          <Tabs defaultValue="Nacional">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="Nacional">Nacional</TabsTrigger>
                <TabsTrigger value="Schengen">Schengen</TabsTrigger>

              </TabsList>

            </div>

            <TabsContent value="Nacional">
              <TabProcessos processos={nacional} free />
            </TabsContent>


            <TabsContent value="Schengen">
              <TabProcessos processos={turismo} free />
            </TabsContent>
          </Tabs>

        </div>
      </main>
    </>
  )
}