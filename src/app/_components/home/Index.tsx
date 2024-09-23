import Head from 'next/head'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Footer } from '..'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Loader2Icon } from 'lucide-react'

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
            <Image src="/placeholder.svg" alt="Gota D' Sol Logo" width={550} height={550} className="mx-auto mb-4" />
            <p className="text-5xl font-bold text-white mb-4">
              Bem-vindo à Gota D' Sol
            </p>
            <p className="text-2xl text-white mb-8">
              Consultoria Premium em Vistos e Viagens Internacionais
            </p>
            <Button className="px-6 py-3 rounded-lg">
              <Link href={'/gds-visa/contactos'}>
                Entre em contato
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <section className="bg-white py-12">
        <div>
          <div className="text-center mb-8">
            <p className="text-3xl font-semibold mb-4">
              Nossos Serviços
            </p>
            <p className="text-lg text-gray-700">
              Oferecemos uma gama completa de serviços de consultoria para ajudar você a obter vistos e planejar suas viagens internacionais com facilidade e segurança.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs text-center">
              <p className="text-xl font-semibold mb-2">
                Consultoria de Vistos
              </p>
              <p className="text-gray-600">
                Orientação completa para obtenção de vistos, incluindo análise de documentos e acompanhamento do processo.
              </p>

              <Button className="px-6 py-3  my-4 rounded-lg">
                <Link href={'#'}>
                  Saber Mais...
                </Link>
              </Button>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs text-center">
              <p className="text-xl font-semibold mb-2">
                Planejamento de Viagens
              </p>
              <p className="text-gray-600">
                Assistência na criação de itinerários personalizados e recomendações de viagens.
              </p>

              <Button className="px-6 py-3  my-4 rounded-lg">
                <Link href={'#'}>
                  Saber Mais...
                </Link>
              </Button>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-xs text-center">
              <p className="text-xl font-semibold mb-2">
                Suporte Completo
              </p>
              <p className="text-gray-600">
                Acompanhamento contínuo durante o processo de visto e viagem, garantindo a tranquilidade de nossos clientes.
              </p>

              <Button className="px-6 py-3  my-4 rounded-lg">
                <Link href={'#'}>
                  Saber Mais...
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* <AlertDialog open={false}>
          <AlertDialogContent className="w-full mx-auto border-red-600">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex flew-col col-end-2 justify-center text-red-500"><FileWarning /> Erro ao Registrar!</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="text-center">Codigo de Autorizacao Errodo. Por faver🙏, Entra em contacto com a Gota D` Sol ou tenta novamente.</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel> <Link href={'/'}>Voltar</Link> </AlertDialogCancel>
              <Button className="" variant={'destructive'} onClick={(e) => {
                e.preventDefault()
                // setFormError(false)
              }}><Loader2Icon className="h-6 w-6 mx-2" /> Tentar de Novo</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
    </div>
  )
}
