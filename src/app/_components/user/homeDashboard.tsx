import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IconFile, IconListFilter } from ".."
import { Newspaper } from "lucide-react"
import { ClientIndex } from "@/db"

export const HomeDashboard: React.FC = async () => {
  const clietes = await ClientIndex()

  if (clietes instanceof Error) return

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 sm:mb-64">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Clientes</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Registra o Cliente para poder Abrir um Processo.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={'/auth/home/create'}>
                <Button>
                  <Newspaper /> <span className="px-4">Registrar novo </span>
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">+25% from last week</div>
            </CardContent>
            <CardFooter>
              <Progress value={50} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-4xl">$5,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">+10% from last month</div>
            </CardContent>
            <CardFooter>
              <Progress value={12} aria-label="12% increase" />
            </CardFooter>
          </Card>
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                    <IconListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <IconFile className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>Recent orders from your store.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome Completo</TableHead>
                      <TableHead className="hidden sm:table-cell">Telefone</TableHead>
                      <TableHead className="hidden sm:table-cell">Passaporte</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      {/* <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clietes.map((client) => (
                      <TableRow className="bg-accent" key={client.id}>
                        <TableCell>
                          <div className="font-medium">{client.nomecompleto}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">{client.telefone}</div>
                        </TableCell>
                        {/* <TableCell className="hidden sm:table-cell">{client.passaport}</TableCell> */}
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            {client.passaport}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{client.updatedAt.toLocaleDateString()}</TableCell>
                        {/* <TableCell className="text-right">$250.00</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}