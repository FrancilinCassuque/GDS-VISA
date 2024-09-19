import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Contas() {
  return (
    <>
      <h1>Contas</h1>
      <Button>
        <Link href={'/auth/dashboard/contas/create'}>Criar Factura!</Link>
      </Button>
    </>
  )
}