import Head from 'next/head'
import Image from 'next/image'
import { Container } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Gota D' Sol - Agência de Consultoria de Vistos e Viagens</title>
        <meta name="description" content="Agência de consultoria especializada em vistos e viagens internacionais." />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-200 to-blue-500">
        <div>
          <div className="text-center">
            <Image src="/placeholder.png" alt="Gota D' Sol Logo" width={150} height={150} className="mx-auto mb-4" />
            <span className="text-5xl font-bold text-white mb-4">
              Bem-vindo à Gota D' Sol
            </span>
            <span className="text-2xl text-white mb-8">
              Consultoria Premium em Vistos e Viagens Internacionais
            </span>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg">
              Entre em contato
            </Button>
          </div>
        </div>
      </main>

      <section className="bg-white py-12">
        <div>
          <div className="text-center mb-8">
            <span className="text-3xl font-semibold mb-4">
              Nossos Serviços
            </span>
            <span className="text-lg text-gray-700">
              Oferecemos uma gama completa de serviços de consultoria para ajudar você a obter vistos e planejar suas viagens internacionais com facilidade e segurança.
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs text-center">
              <span className="text-xl font-semibold mb-2">
                Consultoria de Vistos
              </span>
              <span className="text-gray-600">
                Orientação completa para obtenção de vistos, incluindo análise de documentos e acompanhamento do processo.
              </span>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs text-center">
              <span className="text-xl font-semibold mb-2">
                Planejamento de Viagens
              </span>
              <span className="text-gray-600">
                Assistência na criação de itinerários personalizados e recomendações de viagens.
              </span>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs text-center">
              <span className="text-xl font-semibold mb-2">
                Suporte Completo
              </span>
              <span className="text-gray-600">
                Acompanhamento contínuo durante o processo de visto e viagem, garantindo a tranquilidade de nossos clientes.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
