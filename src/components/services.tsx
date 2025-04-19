'use client'

import { motion } from 'framer-motion'
import { SERVICES_BY_COUNTRY } from '@/lib/constantes'
import { Briefcase, BriefcaseBusiness, GraduationCap, BookType, MapPinPlus, ArrowRight, Feather } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

const iconComponents = {
  Briefcase,
  GraduationCap,
  BriefcaseBusiness,
  BookType,
  MapPinPlus
  // Adicionar outros ícones conforme necessário
}

interface IServiceProps {
  isPage?: boolean
}

export const ServicesSection: React.FC<IServiceProps> = ({ isPage }) => {
  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Serviços por País
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções especializadas para cada destino.
          </p>
        </motion.div>

        <div className="space-y-12">
          {SERVICES_BY_COUNTRY.map((country, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl border shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{country.flag}</span>
                  <h3 className="text-2xl font-bold text-foreground">{country.country}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {country.services.map((service, serviceIndex) => {
                    const IconComponent = iconComponents[service.icon as keyof typeof iconComponents]

                    if (serviceIndex >= 2 && !isPage) return

                    return (
                      <motion.div
                        key={serviceIndex}
                        whileHover={{ y: -5 }}
                        className="bg-background p-5 rounded-lg border"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-foreground">{service.title}</h4>
                        </div>
                        <p className="text-muted-foreground text-sm">{service.description}</p>

                        {isPage && (
                          <Link href={'/contato'} className='flex w-fit'>
                            <Button variant={'outline'} className='flex bg-secondary hover:bg-green-700 hover:text-white mt-10 justify-end items-end'>
                              Seguir Processo
                              <Feather className='w-5 h-5 mx-1' />
                            </Button>
                          </Link>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {!isPage && (
          <Button className='flex w-full justify-center items-center mt-2'>
            <Link href={'/service'} className='flex w-fit'>
              Todos os Serviços
              <ArrowRight className='w-5 h-5 mx-1' />
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}