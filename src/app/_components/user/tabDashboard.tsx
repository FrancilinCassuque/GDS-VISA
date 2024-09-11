'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IconFile, IconListFilter } from ".."
import { useReactToPrint } from 'react-to-print'
import { useRef } from "react"
import { IClient } from "@/types"

interface ITableProps {
  clientes: IClient[]
}

export const TabDashboard: React.FC<ITableProps> = ({ clientes }) => {
  const tableRef = useRef(null)


  const printTable = useReactToPrint({
    content: () => tableRef.current,
  })
  
  return (

    <Tabs defaultValue="totalClientes">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="totalClientes">Total de Clientes</TabsTrigger>
          <TabsTrigger value="clientes">Clentes</TabsTrigger>
          <TabsTrigger value="processos">Processos</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <IconListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filtrar</span>
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
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm" onClick={printTable}>
            <IconFile className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Imprimir</span>
          </Button>
        </div>
      </div>
      <TabsContent value="totalClientes">
        <Card x-chunk="dashboard-05-chunk-3" ref={tableRef}>
          <CardHeader className="px-7">
            <CardTitle>Total de Clientes</CardTitle>
            <CardDescription>Clientes Registrados Recentimente.</CardDescription>
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
                {clientes.map((client) => (
                  <TableRow className="bg-accent" key={client.id}>
                    <TableCell>
                      <div className="font-medium">{client.nomecompleto}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">{client.descricao}</div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Badge className="text-xs" variant="secondary">
                        {client.telefone}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        {client.passaport}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{client.updatedAt.toLocaleDateString()}</TableCell>
                    {/* <TableCell className="text-right">{client.updatedAt.toLocaleDateString()}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}