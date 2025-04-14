'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Heart, Users, Home, Plane } from 'lucide-react'
import CountryCard from './coutryCard'

const countries = [
  {
    name: 'Portugal',
    image: '/images/portugal.jpg',
    visas: [
      { type: 'Trabalho', icon: <Briefcase /> },
      { type: 'Estudo', icon: <GraduationCap /> },
      { type: 'Família', icon: <Users /> },
      { type: 'Residência', icon: <Home /> },
    ],
  },
  {
    name: 'Espanha',
    image: '/images/spain.jpg',
    visas: [
      { type: 'Trabalho', icon: <Briefcase /> },
      { type: 'Estudo', icon: <GraduationCap /> },
      { type: 'Turismo', icon: <Plane /> },
    ],
  },
  // Adicione os outros países aqui...
]

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos consultoria especializada para diversos tipos de vistos nos seguintes países:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CountryCard country={country} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}