'use client'

import { DIFFERENCIAIS } from '@/lib/constantes'
import { motion } from 'framer-motion'
import { Award, CheckCircle, ShieldCheck } from 'lucide-react'

const iconComponents = {
  Award,
  CheckCircle,
  ShieldCheck,
  // Adicionar outros ícones conforme necessário
}

export const DiferenciaisSection: React.FC = () => {
  return (
    <section id="diferenciais" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que escolher a Gota D' Sol?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça os diferenciais que nos tornam referência em consultoria de vistos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DIFFERENCIAIS.map((diferencial, index) => {
            const IconComponent = iconComponents[diferencial.icon as keyof typeof iconComponents]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-xl border shadow-sm text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <IconComponent className="w-8 h-8" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{diferencial.title}</h3>
                <p className="text-muted-foreground">{diferencial.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}