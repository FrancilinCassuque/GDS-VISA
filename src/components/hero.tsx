'use client'

import { motion } from 'framer-motion'
import { Globe, ArrowRight, BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
// import {}

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.jpg')] bg-cover bg-center brightness-75" />

      <div className="container mx-auto px-4 relative z-10 text-white text-center my-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Globe className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Consultoria de Vistos Internacionais</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            {/* Conectando teu destino ao mundo. */}
            O mundo começa com o teu <span className="text-primary">visto</span> .
          </h1>

          <p className="text-lg md:text-xl mb-8">
            {/* A Gota D' Sol oferece consultoria especializada para obtenção de vistos em diversos países, com atendimento personalizado e alta taxa de aprovação. */}
            Consultoria especializada em vistos internacionais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
              Fazer pedido de visto
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-primary border-primary hover:bg-primary hover:text-white"
            >
              Teste de aptidão para vistos
            </Button>
          </div>

        </motion.div>
      </div>
    </section>
  )
}