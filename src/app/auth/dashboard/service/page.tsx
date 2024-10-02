
import { TabService } from "@/app/_components"
import { ServicoIndex } from "@/db"

export default async function ServicePage() {
  const servicos = await ServicoIndex()

  if(servicos instanceof Error) return

  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-lg font-mono font-semibold bg-slate-300/25 my-10 w-full">Serviços Disponíveis</p>
      <TabService servicos={servicos} />
    </div>
  )
}