// app/service/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Service = {
  slug: string
  titulo: string
  descricao: string
  pais: string
  tiposVisto: string[]
  imagemUrl: string
}

const mockServices: Service[] = [
  {
    slug: 'portugal-trabalho',
    titulo: 'Visto de Trabalho para Portugal',
    descricao:
      'Obtenha assistência completa para o seu processo de visto de trabalho para Portugal, com orientação passo a passo e suporte personalizado.',
    pais: 'Portugal',
    tiposVisto: ['Trabalho'],
    imagemUrl:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80'
  },
  {
    slug: 'franca-estudante',
    titulo: 'Visto de Estudante para França',
    descricao:
      'Facilitamos seu sonho de estudar na França. Orientamos desde a escolha do curso até o agendamento da entrevista no consulado.',
    pais: 'França',
    tiposVisto: ['Estudante'],
    imagemUrl:
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=80'
  }
  // ... mais serviços
]

export async function generateStaticParams() {
  return mockServices.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = mockServices.find((s) => s.slug === params.slug)
  if (!service) return {}

  return {
    title: `${service.titulo} | Gota D' Sol`,
    description: service.descricao
  }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = mockServices.find((s) => s.slug === params.slug)

  if (!service) return notFound()

  return (
    <main className="min-h-screen flex flex-col">
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={service.imagemUrl}
          alt={service.titulo}
          layout="fill"
          objectFit="cover"
          className="brightness-[.4]"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
            {service.titulo}
          </h1>
          <p className="max-w-2xl text-lg drop-shadow-sm">{service.descricao}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">País:</h2>
          <p>{service.pais}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-2">Tipo de Visto:</h2>
          <ul className="list-disc list-inside">
            {service.tiposVisto.map((tipo) => (
              <li key={tipo}>{tipo}</li>
            ))}
          </ul>
        </div>

        <Button className="mt-8">Solicitar Consultoria</Button>
      </section>
    </main>
  )
}
