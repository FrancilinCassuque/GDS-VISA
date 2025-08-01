'use client'

// app/page.tsx
import { Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <main className="relative min-h-[calc(100vh-70px)] overflow-hidden flex items-center justify-center">
      {/* Background com imagem */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fundo-gotadsol.jpg" // Adicione esta imagem na pasta public/
          alt="Background viagem Gota D'Sol"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-[.9] contrast-105"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      {/* Conteúdo em cima da imagem */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-20">
          <Globe className="w-5 h-5" />
          <span className="text-sm font-medium">O mundo começa com o teu <span className="text-primary">visto</span> .</span>
        </div>

        <h1 className="text-3xl md:text-6xl font-bold text-neutral-800 dark:text-white">
          Abrimos as portas do mundo para ti.
        </h1>

        <p className="mt-10 text-lg md:text-xl text-neutral-600 dark:text-muted-foreground">
          Consultoria especializada em vistos para <strong>Portugal, França, Espanha, Alemanha, Brasil, África do Sul</strong> e mais.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/service" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
            Ver Serviços
          </Link>
          <Link href="/about" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition">
            Sobre a Gota D'Sol
          </Link>
        </div>
      </motion.div>
    </main>
  )
}