'use client'

import { motion } from 'framer-motion'
import { Globe, ArrowRight, BadgeCheck } from 'lucide-react'
import Link from 'next/link'

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

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Realize seu sonho de morar no exterior
          </h1>

          <p className="text-lg md:text-xl mb-8 opacity-90">
            A Gota D' Sol oferece consultoria especializada para obtenção de vistos em diversos países, com atendimento personalizado e alta taxa de aprovação.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/service"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Conheça nossos serviços
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/contato"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-colors border border-white/20"
            >
              Fale conosco
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <BadgeCheck className="w-5 h-5 text-accent" />
            <span>Alta taxa de aprovação</span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <BadgeCheck className="w-5 h-5 text-accent" />
            <span>Atendimento personalizado</span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <BadgeCheck className="w-5 h-5 text-accent" />
            <span>Consultores especializados</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}