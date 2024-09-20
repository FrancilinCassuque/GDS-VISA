'use client'

import { columnsCliente, columnsProcesso, TabelaClientes, TabelaDeDados,  } from "@/app/_components"
import { IClient } from "@/types"
import { useState } from "react"

interface ITabProps {
  clientes: IClient[]
}

export const TabClientes: React.FC<ITabProps> = ({ clientes }) => {

  const [selectedclientes, setselectedclientes] = useState<IClient[]>()
  function setSelectedPro(lista: any[]) {
    setselectedclientes(lista)
  }


  return (
    <TabelaDeDados
      colunaModel={columnsCliente}
      listaDeDados={clientes} dataProcessos={setSelectedPro}
      listaDe="Clientes"
      listaPrint={<TabelaClientes clientes={selectedclientes ? selectedclientes : []} printOnly={true} />}
    />
  )
}