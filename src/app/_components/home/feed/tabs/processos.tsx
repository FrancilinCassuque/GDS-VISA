'use client'

import { columnsProcesso, TabelaDeDados, TabelaProcessos } from "@/app/_components"
import { IProcesso } from "@/types"
import { useState } from "react"

interface ITabProps {
  processos: IProcesso[]
  free?: boolean
}

export const TabProcessos: React.FC<ITabProps> = ({ processos, free }) => {

  const [selectedProcessos, setselectedProcessos] = useState<IProcesso[]>()
  function setSelectedPro(lista: any[]) {
    setselectedProcessos(lista)
  }


  return (
    <TabelaDeDados
      colunaModel={columnsProcesso}
      listaDeDados={processos} dataProcessos={setSelectedPro}
      // listaDe="Processos"
      listaPrint={<TabelaProcessos processos={selectedProcessos ? selectedProcessos : []} free={free} printOnly />}
    />
  )
}