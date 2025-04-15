'use client'

import { motion } from "framer-motion";


export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <motion.h1
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-9xl font-bold text-primary mb-4"
      >
        404 🕵🏼‍♀️
      </motion.h1>

      <p className="text-2xl mb-4">Página não encontrada</p>
      <p className="text-muted-foreground mb-8">
        O conteúdo que você busca não existe ou foi removido.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Voltar à página inicial
      </a>
    </motion.div>
  );
}