'use client'

import { columnsService, TabelaDeDados } from "@/app/_components"
import { IService } from "@/types"
import { useState } from "react"

interface ITabProps {
  servicos: IService[]
  free?: boolean
}

export const TabService: React.FC<ITabProps> = ({ servicos, free }) => {

  const [selectedProcessos, setselectedProcessos] = useState<IService[]>()
  function setSelectedPro(lista: any[]) {
    setselectedProcessos(lista)
  }


  return (
    <TabelaDeDados
      colunaModel={columnsService}
      listaDeDados={servicos} dataProcessos={setSelectedPro}
      filtrarColunaPor="nome"
    // listaDe="Processos"
    // listaPrint={<TabelaProcessos processos={selectedProcessos ? selectedProcessos : []} free={free} printOnly />}
    />
  )
}