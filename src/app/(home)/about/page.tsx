'use client'

import { motion } from 'framer-motion'
import { Globe, Users, Award, Heart, Calendar, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const stats = [
    { value: "8+", label: "Anos de Experiência", icon: <Calendar className="w-8 h-8" /> },
    { value: "5.000+", label: "Clientes Atendidos", icon: <Users className="w-8 h-8" /> },
    { value: "93%", label: "Taxa de Aprovação", icon: <CheckCircle className="w-8 h-8" /> }
  ]

  const team = [
    {
      name: "Ana Silva",
      role: "Fundadora & Consultora Sênior",
      bio: "Especialista em vistos para Europa com 12 anos de experiência.",
      image: "/placeholder.jpg"
    },
    {
      name: "Carlos Mendes",
      role: "Consultor de Vistos",
      bio: "Focado em vistos de trabalho para Alemanha e Bélgica.",
      image: "/placeholder.jpg"
    }
    // Adicionar mais membros conforme necessário
  ]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-[url('/placeholder.jpg')] bg-cover bg-center brightness-75" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nossa História</h1>
            <p className="text-xl opacity-90">
              Conheça a jornada da Gota D' Sol e nossa paixão por conectar pessoas a novos horizontes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nossa Missão */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nossa Missão
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Na Gota D' Sol, acreditamos que cada jornada internacional começa com um bom planejamento. 
                Nossa missão é simplificar o complexo processo de obtenção de vistos, oferecendo consultoria 
                personalizada e suporte em cada etapa.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Fundada em 2013, começamos como uma pequena equipe e hoje somos referência no mercado, 
                ajudando milhares de clientes a realizarem o sonho de morar no exterior.
              </p>
              <Link
                href="/servicos"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Conheça nossos serviços
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="bg-primary/10 p-8 rounded-xl">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.jpg"
                    alt="Equipe Gota D' Sol"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-lg shadow-lg border">
                  <Globe className="w-12 h-12 text-primary" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-background p-8 rounded-xl border text-center shadow-sm"
              >
                <div className="flex justify-center mb-4 text-primary">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos Valores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam nosso trabalho diário
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-xl border shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Excelência</h3>
              </div>
              <p className="text-muted-foreground">
                Buscamos a perfeição em cada detalhe dos processos de visto, garantindo a melhor experiência para nossos clientes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-xl border shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Paixão</h3>
              </div>
              <p className="text-muted-foreground">
                Amamos o que fazemos e acreditamos no poder transformador de viver uma experiência internacional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-xl border shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Confiança</h3>
              </div>
              <p className="text-muted-foreground">
                Construímos relacionamentos baseados em transparência e honestidade, com comunicação clara em todas as etapas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Conheça Nossa Equipe
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profissionais especializados e dedicados ao seu sucesso
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl overflow-hidden shadow-sm border"
              >
                <div className="relative h-60">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para começar sua jornada?</h2>
            <p className="text-xl mb-8 opacity-90">
              Entre em contato e descubra como podemos ajudar você a realizar o sonho de morar no exterior.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center px-8 py-4 bg-background text-foreground rounded-lg font-bold hover:bg-background/90 transition-colors"
            >
              Fale Conosco
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}