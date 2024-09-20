"use client"

import {
  ColumnDef,
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { IProcesso } from "@/types"
import { IconListFilter } from "../../icons/dashboard"
import { useEffect, useState } from "react"
import { TabelaProcessos } from "./tableProcessos"

interface IDataTableProps {
  listaDeProcessos: IProcesso[]
  dataProcessos?: (data: IProcesso[]) => void
  dataOnly?: boolean
}

export const columnsProcesso: ColumnDef<IProcesso>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar Tudo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar Linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nomecompleto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const preco = row.getValue("preco") as number
      const precoFormat = preco.toLocaleString('AO', { style: 'currency', currency: 'AOA' })

      return (
        <>
          <div className="capitalize">{row.getValue('nomecompleto')}</div>
          <div className="text-sm text-muted-foreground md:inline">{precoFormat} </div>
        </>
      )
    },
  },
  {
    accessorKey: "passaport",
    header: "Passaport",
    cell: ({ row }) => <div className="uppercase text-center">{row.getValue("passaport")}</div>,
  },

  {
    accessorKey: "tipo",
    header: () => <div className="invisible sm:visible">Categória</div>,
    cell: ({ row }) => <div className="invisible sm:visible uppercase text-center">{row.getValue("tipo")}</div>,
  },


  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => <div className="uppercase text-center">{row.getValue("estado")}</div>,
  },

  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">Data</div>,
    cell: ({ row }) => {

      const date = new Date(row.getValue('updatedAt')).toLocaleDateString()

      return <div className="text-right font-medium">{date}</div>
    },
  },

  {
    accessorKey: "preco",
    header: () => <div className="sr-only hidden">Preço</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium sr-only hidden">{row.getValue('preco')}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abri menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acçoes</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


export const DataTableProcessos: React.FC<IDataTableProps> = ({ listaDeProcessos, dataProcessos, dataOnly }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [clientSelection, setClientSelection] = useState<IProcesso[]>([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: listaDeProcessos,
    columns: columnsProcesso,
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
    const arreyCli: IProcesso[] = []

    selectedValues.map(linha => {
      const cli = table.getRow(linha).original
      arreyCli.push(cli)
    })

    setClientSelection(arreyCli)

    if (dataProcessos) {
      dataProcessos(arreyCli)
    }
  }, [rowSelection, setClientSelection])

  return (
    <div className="w-full">

      {dataOnly ? (
        <div className="text-center text-primary">
          <h1>Processo do Cliente</h1>
          <h3 className="text-muted-foreground">Selecione os Processos da Factura</h3>
        </div>
      ) : (
        <div className="text-center">
          <h1>Processo</h1>
          <h3 className="text-muted-foreground">Lista de Processos</h3>
        </div >
      )}

      {/* Div do Input de filtro e a dropdown do filtro de comlunas */}
      <div className="flex items-center w-full py-4">
        <Input
          placeholder="Filtrar Por Nome..."
          value={(table.getColumn("nomecompleto")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nomecompleto")?.setFilterValue(event.target.value)
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

            <TabelaProcessos processos={clientSelection} printOnly={true} />
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
                  colSpan={columnsProcesso.length}
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
