'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ServicoDelete } from "@/db"
import { IClient, IFacturaList, IProcesso, IService } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ClipboardPlus, MoreHorizontal, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
          <div className="text-md text-muted-foreground md:inline">{precoFormat} </div>
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
    header: () => <div className="text-center">Categória</div>,
    cell: ({ row }) => <div className="uppercase text-center">{row.getValue("tipo")}</div>,
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
    header: () => <div className="sr-only">Preço</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium sr-only">{row.getValue('preco')}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const processo = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-2 w-4 p-0">
              <span className="sr-only">Abri menu</span>
              <MoreHorizontal className="h-4 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acçoes</DropdownMenuLabel>
            <Link href={`/auth/processo/${processo.id}`}>
              <DropdownMenuItem
              // onClick={() => navigator.clipboard.writeText(processo.id)}
              >
                Ver
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const columnsCliente: ColumnDef<IClient>[] = [
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
    cell: ({ row }) => (
      <>
        <div className="capitalize">{row.getValue('nomecompleto')}</div>
        <div className="text-sm text-muted-foreground md:inline">{row.getValue("descricao")} </div>
      </>
    ),
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
    cell: ({ row }) => <div className="lowercase">{row.getValue("telefone")}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right ">Data</div>,
    cell: ({ row }) => {

      const date = new Date(row.getValue('updatedAt')).toLocaleDateString()

      return <div className="text-right  font-medium">{date}</div>
    },
  },

  {
    accessorKey: "descricao",
    header: () => <div className="sr-only">Descrição</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium sr-only">{row.getValue('descricao')}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const cliente = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-2 w-4 p-0">
              <span className="sr-only">Abri menu</span>
              <MoreHorizontal className="h-4 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acçoes</DropdownMenuLabel>
            <Link href={`/auth/client/${cliente.id}`}>
              <DropdownMenuItem
              // onClick={() => navigator.clipboard.writeText(processo.id)}
              >
                Ver
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const columnsFactura: ColumnDef<IFacturaList>[] = [
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
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <>
        <div className="capitalize">{row.getValue('nome')}</div>
        <div className="text-sm text-muted-foreground md:inline">{row.getValue("descricao")} </div>
      </>
    ),
  },
  // Total Processos
  {
    accessorKey: "totalProcessos",
    header: () => <div className=" text-center">Nº de Processos</div>,
    cell: ({ row }) => <div className=" text-center">{row.getValue("totalProcessos")}</div>,
  },
  // Estado
  {
    accessorKey: "estado",
    header: () => <div className="text-center">Estado</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("estado")}</div>,
  },

  // Valor em Falta e a Pagar
  {
    accessorKey: "valorApagar",
    header: () => <div className="text-center ">valor A pagar</div>,
    cell: ({ row }) => {
      const valor = row.getValue("valorApagar") as number
      const valorFormat = valor.toLocaleString('AO', { style: 'currency', currency: 'AOA' })
      return (
        <div className="">{valorFormat}</div>
      )
    },
  },

  {
    accessorKey: "valorEmFalta",
    header: () => <div className="text-center ">valor Em Falta</div>,
    cell: ({ row }) => {
      const valor = row.getValue("valorEmFalta") as number
      const valorFormat = valor.toLocaleString('AO', { style: 'currency', currency: 'AOA' })
      return (
        <div className="">{valorFormat}</div>
      )
    },
  },

  // Total
  {
    accessorKey: "total",
    header: () => <div className="text-center ">Valor da Factura</div>,
    cell: ({ row }) => {
      const valor = row.getValue("total") as number
      const valorFormat = valor.toLocaleString('AO', { style: 'currency', currency: 'AOA' })
      return (
        <div className=" ">{valorFormat}</div>
      )
    },
  },

  // data
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right ">Actualizado Em</div>,
    cell: ({ row }) => {

      const date = new Date(row.getValue('updatedAt')).toLocaleDateString()

      return <div className="text-right font-medium ">{date}</div>
    },
  },
  // descrição
  {
    accessorKey: "descricao",
    header: () => <div className="sr-only">Descrição</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium sr-only">{row.getValue('descricao')}</div>
    },
  },


  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const factura = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-2 w-4 p-0">
              <span className="sr-only">Abri menu</span>
              <MoreHorizontal className="h-4 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acçoes</DropdownMenuLabel>
            <Link href={`/auth/dashboard/contas/factura/${factura.id}`}>
              <DropdownMenuItem
              // onClick={() => navigator.clipboard.writeText(processo.id)}
              >
                Ver
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const columnsService: ColumnDef<IService>[] = [
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
    accessorKey: "nome",
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
    cell: ({ row }) => (
      <>
        <div className="capitalize">{row.getValue('nome')}</div>
        <div className="text-sm text-muted-foreground md:inline sr-only sm:not-sr-only">{row.getValue("descricao")} </div>
      </>
    ),
  },
  {
    accessorKey: "preco",
    header: "Preço",
    cell: ({ row }) => {
      const preco = row.getValue("preco") as number
      const precoFormat = preco.toLocaleString('AO', { style: 'currency', currency: 'AOA' })
      return (
        <div className="">{precoFormat}</div>
      )
    },
  },
  {
    accessorKey: "tipo",
    header: () => <div className="text-right ">Tipo</div>,
    cell: ({ row }) => {
      return <div className="text-right  font-medium">{row.getValue('tipo')}</div>
    },
  },

  {
    accessorKey: "descricao",
    header: () => <div className="sr-only">Descrição</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium sr-only">{row.getValue('descricao')}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const service = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-2 w-4 p-0">
              <span className="sr-only">Abri menu</span>
              <MoreHorizontal className="h-4 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acçoes</DropdownMenuLabel>
            <Link href={`#`}>
              <DropdownMenuItem className="text-blue-400"
              onClick={() => {
                alert('Aguardando implementação!🐱‍💻😎')
              }}
              >
                <ClipboardPlus className="w-4 h-4" />
                Editar
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem className="text-red-700"
              onClick={() => {
                ServicoDelete(service.id).then(res => {
                  if (!(res instanceof Error)) {
                    window.location.reload()
                  }
                })
              }}
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]