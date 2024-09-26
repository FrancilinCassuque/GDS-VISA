import { CardProcessoHomeTop, TabProcessos } from "@/app/_components"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { processoIndex } from "@/db"
import Link from "next/link"




export default async function Page() {
  const processos = await processoIndex()
  if (processos instanceof Error) return

  return (
    <>
      <Breadcrumb className="hidden md:flex">
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
            </TabsContent>


            <TabsContent value="clientesActivos">
            </TabsContent>

            <TabsContent value="processos">
              <TabProcessos processos={processos} />
            </TabsContent>
          </Tabs>

        </div>
      </main>
    </>
  )
}