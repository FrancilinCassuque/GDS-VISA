'use client'

import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IconFile } from ".."
import { useReactToPrint } from 'react-to-print'
import { useRef } from "react"
import { IProcesso } from "@/types"
import Image from "next/image"

interface ITableProps {
  processos: IProcesso[]
}

export const Tabelaprocessos: React.FC<ITableProps> = ({ processos }) => {
  const tableProcessoRef = useRef(null)

  const printTable = useReactToPrint({
    content: () => tableProcessoRef.current,
    removeAfterPrint: true
  })

  return (
    <Card x-chunk="dashboard-05-chunk-3" >
      <CardHeader className="px-7">
        <div className="ml-auto flex items-center gap-2">
          {/* <DropdownMenu>
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
              </DropdownMenu> */}
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm" onClick={printTable}>
            <IconFile className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Imprimir</span>
          </Button>
        </div>

        <CardTitle>Total de processos</CardTitle>
        <CardDescription>processos Registrados Recentimente.</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="">Passaport</TableHead>
              <TableHead className="hidden sm:table-cell">Categória</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processos.map((processo) => (
              <TableRow className="bg-accent" key={processo.id}>
                <TableCell>
                  <div className="font-medium">{processo.nomecompleto}</div>
                  <div className="text-sm text-muted-foreground md:inline">{processo.preco.toLocaleString('AO', { style: 'currency', currency: 'AOA' })}</div>
                </TableCell>
                <TableCell className="font-medium"> <Badge className="text-xs" variant="secondary">{processo.passaport} </Badge> </TableCell>
                <TableCell className="font-medium hidden md:table-cell"> <Badge className="text-xs" variant="secondary">{processo.tipo} </Badge> </TableCell>
                <TableCell className="font-medium"> <Badge className="text-xs" variant="secondary">{processo.estado} </Badge> </TableCell>
                <TableCell className="hidden md:table-cell">{processo.updatedAt.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Div invisivel para fazer um print perfeito dos processos */}
      <div className="sr-only">
        <CardContent ref={tableProcessoRef}>
          <Table>
            <TableHeader>

              <TableRow>
                <TableCell colSpan={4} className="border-none">
                  <div className='flex flex-col items-center my-10 justify-center'>
                    <Image width={175} height={175} src={'/placeholder.png'} alt="Logotipo da Gota De Sol" />
                    <CardTitle>GOTA D' SOL - processos</CardTitle>
                    <CardDescription>A Luz que Falta em Tua Direcção.</CardDescription>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="">Passaport</TableHead>
                <TableHead className=" sm:table-cell">Categória</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className=" md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processos.map((processo) => (
                <TableRow className="bg-accent" key={processo.id}>
                  <TableCell>
                    <div className="font-medium">{processo.nomecompleto}</div>
                    <div className="text-sm text-muted-foreground md:inline">{processo.preco.toLocaleString('AO', { style: 'currency', currency: 'AOA' })}</div>
                  </TableCell>
                  <TableCell className="font-medium"> <Badge className="text-xs" variant="secondary">{processo.passaport} </Badge> </TableCell>
                  <TableCell className="font-medium  md:table-cell"> <Badge className="text-xs" variant="secondary">{processo.tipo} </Badge> </TableCell>
                  <TableCell className="font-medium"> <Badge className="text-xs" variant="secondary">{processo.estado} </Badge> </TableCell>
                  <TableCell className=" md:table-cell">{processo.updatedAt.toLocaleDateString()}</TableCell>
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
  )
}