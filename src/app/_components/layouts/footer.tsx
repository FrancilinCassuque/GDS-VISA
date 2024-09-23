import Link from "next/link"

export const Footer: React.FC = () => {
  const ano = new Date().getFullYear()

  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">&copy; {ano} G O T A  D' S O L  -  V I S A . Todos os direitos reservados. por <i>Dev-Cute</i></p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="/gds-visa/terms-and-privacy/terms" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Termos de Serviço
        </Link>
        <Link href="/gds-visa/terms-and-privacy/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Privacidade
        </Link>
        <Link href="/user" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Agente Autorizado.
        </Link>
      </nav>
    </footer>
  )
}