// app/service/page.tsx
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Contact } from 'lucide-react'
import Link from 'next/link'
import { ServicesSection } from '@/components'

export const metadata: Metadata = {
  title: 'Serviços | Gota D\'Sol',
  description: 'Veja todos os serviços de consultoria de vistos oferecidos por país.',
}

export default function ServicePage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero interna */}
      <section className="py-20 text-center bg-muted/30">
        <div className="container px-4 mx-auto">
          <h1 className="text-4xl font-bold mb-4">Todos os Serviços</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha o país e o tipo de visto ideal para o teu destino.
          </p>
        </div>
      </section>

      {/* Seção de serviços */}
      <ServicesSection isPage />

      {/* CTA final */}
      <section className="py-20 bg-primary/5 border-t border-border">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ainda com dúvidas?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Fale com um de nossos especialistas e receba orientação gratuita sobre o melhor caminho para o teu visto.
          </p>
          <Link href="/contato">
            <Button size="lg">
              Fale com um consultor
              <Contact className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
