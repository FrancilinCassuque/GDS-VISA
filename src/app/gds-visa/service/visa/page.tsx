import { ServicesPage } from "@/app/_components";
import { ServicoIndex } from "@/db";
import { redirect } from "next/navigation";



export default async function Component() {
  const services = await ServicoIndex()
  if (services instanceof Error) {
    redirect('/')
  }

  return (
    <ServicesPage servicos={services} />
  )
}