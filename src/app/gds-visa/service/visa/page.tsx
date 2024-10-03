import { ServicesPage } from "@/app/_components"
import { ServicoIndex } from "@/db"

export default async function Component() {
  const services = await ServicoIndex()
  if (services instanceof Error) return

  return (
    <ServicesPage servicos={services} />
  )
}