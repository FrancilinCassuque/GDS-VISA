'use client'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useReactToPrint } from 'react-to-print'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { File } from "lucide-react"
import { IProcesso } from "@/types"
import { useRef } from "react"
import Image from "next/image"

interface ITableProps {
  processos: IProcesso[]
  printOnly?: boolean
  free?: boolean
}

export const TabelaProcessos: React.FC<ITableProps> = ({ processos, printOnly, free }) => {
  const tableProcessoRef = useRef(null)

  const printTable = useReactToPrint({
    content: () => tableProcessoRef.current,
    removeAfterPrint: true
  })

  return (
    <>
      {printOnly && (
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm" onClick={(e) => {
            e.preventDefault()
            printTable()
          }}>
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Imprimir</span>
          </Button>
        </div>
      )}

      <Card x-chunk="dashboard-05-chunk-3" className={printOnly ? "sr-only" : ''} >
        <CardHeader className="px-7">
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm" onClick={(e) => {
              e.preventDefault()
              printTable()
            }}>
              <File className="h-3.5 w-3.5" />
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
                      <CardTitle>{free? 'Lista De Clientes': 'Lista de Processos'}</CardTitle>
                      <CardDescription>{free ? 'Clientes por agendar' : 'A Luz que Falta em Tua Direcção.'}</CardDescription>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableHead className="text-center">{free ? 'Nome & Apelido' : 'Nome'}</TableHead>
                  <TableHead className="text-center">Passaport</TableHead>
                  <TableHead className="sm:table-cell text-center">Categória</TableHead>
                  <TableHead className={free ? "sr-only" : 'text-center'}>Estado</TableHead>
                  <TableHead className={free ? "sr-only" : 'md:table-cell'}>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processos.map((processo) => (
                  <TableRow className="bg-accent" key={processo.id}>
                    <TableCell>
                      <div className="font-medium text-center">{processo.nomecompleto}</div>
                      <div className={free ? "sr-only" : 'text-sm text-muted-foreground md:inline'}>{processo.preco.toLocaleString('AO', { style: 'currency', currency: 'AOA' })}</div>
                    </TableCell>
                    <TableCell className="font-medium text-center"> <Badge className="text-xs" variant="secondary">{processo.passaport} </Badge> </TableCell>
                    <TableCell className="font-medium text-center  md:table-cell"> <Badge className="text-xs" variant="secondary">{(processo.tipo.toLowerCase() == 'visto de turismo') ? 'Visto Schengen' : 'Visto Nacional'} </Badge> </TableCell>
                    <TableCell className={free ? "sr-only" : 'font-medium'}> <Badge className="text-xs" variant="secondary">{processo.estado} </Badge> </TableCell>
                    <TableCell className={free ? "sr-only" : 'font-medium'}>{processo.updatedAt.toLocaleDateString()}</TableCell>
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