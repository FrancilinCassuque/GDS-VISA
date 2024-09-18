'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IconFile, IconListFilter } from ".."
import { useReactToPrint } from 'react-to-print'
import { useRef, useState } from "react"
import { IClient } from "@/types"
import Image from "next/image"

interface ITableProps {
  clientes: IClient[],
  printOnly?: boolean
}

export const TabelaClientes: React.FC<ITableProps> = ({ clientes, printOnly }) => {
  const tableRef = useRef(null)

  const printTable = useReactToPrint({
    content: () => tableRef.current,
    removeAfterPrint: true
  })

  return (
    <>
      {printOnly && (
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm" onClick={printTable}>
            <IconFile className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Imprimir</span>
          </Button>
        </div>
      )}

      <Card x-chunk="dashboard-05-chunk-3" className={printOnly ? "sr-only" : ''} >
        <CardHeader className="px-7">
          <div className="ml-auto flex items-center gap-2">

            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm" onClick={printTable}>
              <IconFile className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Imprimir</span>
            </Button>
          </div>

          <CardTitle>Total de Clientes</CardTitle>
          <CardDescription>Clientes Registrados Recentimente.</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden sm:table-cell">Telefone</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
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
                  <TableCell className="hidden md:table-cell">{client.updatedAt.toLocaleDateString()}</TableCell>
                  {/* <TableCell className="text-right">{client.updatedAt.toLocaleDateString()}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {/* Div invisivel para fazer um print perfeito dos Clientes */}
        <div className="sr-only">
          <CardContent ref={tableRef}>
            <Table>
              <TableHeader>

                <TableRow>
                  <TableCell colSpan={4} className="border-none">
                    <div className='flex flex-col items-center my-10 justify-center'>
                      <Image width={175} height={175} src={'/placeholder.png'} alt="Logotipo da Gota De Sol" />
                      <CardTitle>GOTA D' SOL - CLIENTES</CardTitle>
                      <CardDescription>A Luz que Falta em Tua Direcção.</CardDescription>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden sm:table-cell">Telefone</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  {/* <TableHead className="text-right">Amount</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientes.map((client) => (
                  <TableRow className="bg-accent" key={client.id}>
                    <TableCell>
                      <div className="font-medium">{client.nomecompleto}</div>
                      <div className="hidden text-sm text-muted-foreground sm:inline">{client.descricao}</div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Badge className="text-xs" variant="secondary">
                        {client.telefone}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{client.updatedAt.toLocaleDateString()}</TableCell>
                    {/* <TableCell className="text-right">{client.updatedAt.toLocaleDateString()}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
              <br />
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>
                    <div className="flex flex-col items-start my-4">
                      <p className="text-muted-foreground"> <strong>NIF:</strong> 5001292218</p>
                      <p className="text-muted-foreground"> Destrito urbano do sambizanga casa 109 zona 16</p>
                      <p className="text-muted-foreground"> <strong>Email:</strong> gotadesol01@gmail.com</p>
                      <p className="text-muted-foreground"> <strong>Tell:</strong> 935 823 482 | 949143902</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>

            </Table>
          </CardContent>
        </div>
      </Card>
    </>
  )
}