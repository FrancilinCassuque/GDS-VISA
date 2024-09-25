'use client'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IconFile } from "../../icons"
import { useReactToPrint } from 'react-to-print'
import { useRef } from "react"
import { IFacturaPrint, IProcesso } from "@/types"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

interface ITableProps {
  factura: IFacturaPrint
  printOnly?: boolean
}

export const TabelaFacturaPrint: React.FC<ITableProps> = ({ factura, printOnly }) => {
  const tableProcessoRef = useRef(null)

  const printTable = useReactToPrint({
    content: () => tableProcessoRef.current,
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
        {/* Div invisivel para fazer um print perfeito dos factura */}
        <div>
          <CardContent ref={tableProcessoRef} className="min-h-screen">
            <Table>
              <TableHeader>

                <TableRow>
                  <TableCell colSpan={5} className="border-none text-center">
                    <div className='flex flex-col items-center my-10 justify-center'>
                      <Image width={275} height={275} src={'/placeholder.png'} alt="Logotipo da Gota De Sol" />
                    </div>

                    <div className="flex w-full justify-between ">
                      <div className="text-start">
                        <p className="text-lg font-bold">Gota D' Sol Pretação de Serviço, LDA</p>
                        <p className="text-muted-foreground"> <strong>NIF:</strong> 5001292218</p>
                        <p className="text-muted-foreground"> <strong>Licença Nº: </strong> 2019-agt-58</p>
                        <p className="text-muted-foreground"> <strong>Factura Nº: </strong>{JSON.stringify(new Date().getFullYear())}/{factura.id}</p>
                        <p className="text-muted-foreground"> <strong>Cliente ID: </strong> {factura.cliente.id} </p>
                      </div>

                      <div className="text-end">
                        <p className="font-bold text-muted-foreground">{factura.cliente.nome}</p>
                        <p className="text-muted-foreground"> <strong>Contacto:</strong> {factura.cliente.telefone}</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>

                <br />

                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Passaport</TableHead>
                  <TableHead className=" sm:table-cell">Categória</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className=" md:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {factura.processos.map((processo) => (
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

                <TableRow className="border-none">
                  <TableCell colSpan={2}>
                    <p className="text-lg font-bold bg-slate-400/25 text-primary mt-10 text-center">Resumo</p>
                    <div className="flex w-full justify-center">
                      <div className="text-end">
                        <p className="text-muted-foreground my-2"> <strong>Total:</strong></p>
                        <p className="text-muted-foreground my-2"> <strong>Descontos: </strong></p>
                        <p className="text-muted-foreground my-2"> <strong>Valor a Cobrar: </strong></p>
                        <p className="text-muted-foreground my-2"> <strong>Valor Em Falta: </strong></p>
                      </div>

                      <Separator orientation="vertical" className="h-36 w-0.5 mx-1" />
                      <div className="text-start">
                        <p className="font-bold text-muted-foreground my-2"><span className="text-black">{factura.total.toLocaleString('AO', { style: 'currency', currency: 'AOA' })}</span></p>
                        <p className="font-bold text-muted-foreground my-2"><span className="text-black">{factura.desconto.toLocaleString('AO', { style: 'currency', currency: 'AOA' })}</span></p>
                        <p className="font-bold text-muted-foreground my-2"><span className="text-primary">{factura.valorApagar.toLocaleString('AO', { style: 'currency', currency: 'AOA' })}</span></p>
                        <p className="font-bold text-muted-foreground my-2"><span className="text-red-600">{factura.valorEmFalta.toLocaleString('AO', { style: 'currency', currency: 'AOA' })}</span></p>

                      </div>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={5}>
                    <p className="text-lg font-bold bg-slate-400/25 text-primary mt-10 text-center w-fit mx-auto px-44">Coordenadas Bancárias</p>
                    <div className="flex wfull- justify-center">
                      <div className="text-end">
                        <p className="text-muted-foreground my-2"> <strong>BCGA:</strong></p>
                        <p className="text-muted-foreground my-2"> <strong>BCI: </strong></p>
                        {/* <p className="text-muted-foreground my-2"> <strong>BCS: </strong></p> */}
                        {/* <p className="text-muted-foreground my-2"> <strong>Valor Em Falta: </strong></p> */}
                      </div>

                      <Separator orientation="vertical" className="h-16 w-0.5 mx-1" />
                      <div className="text-start">
                        <p className="font-bold text-muted-foreground my-2"><span className="text-black">AO06 0004 0000 1103 8911 1017 4</span></p>
                        <p className="font-bold text-muted-foreground my-2"><span className="text-black">AO06 0005 0000 8118 0659 1019 7</span></p>
                        {/* <p className="font-bold text-muted-foreground my-2"><span className="text-black">AO06 0004 0000 1103 8911 1017 4</span></p> */}

                      </div>
                    </div>

                    <p className="text-center mt-16"> <small>Documento Processado por computador</small></p>
                    <p className="text-center">Lembrete: <strong>Factura referente a primeira parcela dos valores</strong></p>
 
                  </TableCell>
                </TableRow>
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