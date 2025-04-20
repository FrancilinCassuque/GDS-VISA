'use client'

import { columnsFactura, TabelaDeDados } from "@/app/_components"
import { IFacturaList } from "@/types"
import { useState } from "react"

interface ITabProps {
  facturas: IFacturaList[]
}

export const TabFacturas: React.FC<ITabProps> = ({ facturas }) => {

  const [selectedfacturas, setselectedfacturas] = useState<IFacturaList[]>()
  function setSelectedPro(lista: any[]) {
    setselectedfacturas(lista)
  }


  return (
    <TabelaDeDados
      colunaModel={columnsFactura}
      listaDeDados={facturas} dataProcessos={setSelectedPro}
      listaDe="Facturas"
      filtrarColunaPor="nome"
    // listaPrint={<Tabelafacturas facturas={selectedfacturas ? selectedfacturas : []} printOnly={true} />}
    />
  )
}