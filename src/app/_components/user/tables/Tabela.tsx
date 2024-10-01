"use client"

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconListFilter } from "../../icons/dashboard"
import { useEffect, useState } from "react"
import { useMediaQuery } from 'usehooks-ts'

interface IDataTableProps {
  colunaModel: any
  listaDeDados: any[]
  listaPrint?: React.ReactNode
  dataProcessos?: (data: any[]) => void
  dataOnly?: boolean
  filtrarColunaPor?: string
  listaDe?: string
}

export const TabelaDeDados: React.FC<IDataTableProps> = ({ listaDeDados, dataProcessos, dataOnly, listaPrint, colunaModel, filtrarColunaPor, listaDe }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [clientSelection, setClientSelection] = useState<any[]>([])
  const [rowSelection, setRowSelection] = useState({})
  const mediaMobile = useMediaQuery('(min-width:768px)')

  const table = useReactTable({
    data: listaDeDados,
    columns: colunaModel,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  useEffect(() => {
    const selectedValues = Object.keys(rowSelection)
    const arreyCli: any[] = []

    selectedValues.map(linha => {
      const cli = table.getRow(linha).original
      arreyCli.push(cli)
    })

    setClientSelection(arreyCli)

    if (dataProcessos) {
      dataProcessos(arreyCli)
    }
  }, [rowSelection, setClientSelection])

  useEffect(() => {
    if (mediaMobile) {
      table
        .getAllColumns()
        .filter((column) => column.getCanHide())
        .map((column) => {
          column.toggleVisibility(true)
        })
    } else {
      table
        .getAllColumns()
        .filter((column) => column.getCanHide())
        .map((column) => {
          if (column.id == 'nomecompleto') {
            column.toggleVisibility(true)
          } else if (column.id == 'nome') {
            column.toggleVisibility(true)
          }else{
            column.toggleVisibility(false)
          }

        })
    }
  }, [mediaMobile])

  return (
    <div className="w-full">

      {dataOnly ? (
        <div className="text-center text-primary">
          <h1> {listaDe? `${listaDe} do Cliente`: null} </h1>
          <h3 className="text-muted-foreground">{listaDe? `Selecione ${listaDe}`: null}</h3>
        </div>
      ) : (
        <div className="text-center">
          <h1>{listaDe}</h1>
          <h3 className="text-muted-foreground">{listaDe? `Lista de ${listaDe}`: null}</h3>
        </div >
      )}

      {/* Div do Input de filtro e a dropdown do filtro de comlunas */}
      <div className="flex items-center w-full py-4">
        <Input
          placeholder="Filtrar..."
          value={(table.getColumn(filtrarColunaPor ? filtrarColunaPor : "nomecompleto")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filtrarColunaPor ? filtrarColunaPor : "nomecompleto")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-10"
        />

        {!dataOnly && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1 text-sm ml-auto">
                  <IconListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filtrar</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="mx-2">
              {listaPrint}
            </div>
          </>
        )}

      </div>

      {/* Search */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={colunaModel.length}
                  className="h-24 text-center"
                >
                  Sem Resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer table */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} Linha(s) Selecionada.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Voltar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Proximo
          </Button>
        </div>
      </div>
    </div >
  )
}
