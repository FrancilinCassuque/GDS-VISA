import { Metadata } from 'next'
import { Hero } from '@/components/hero'

const metadata: Metadata = {
  title: "GOTA D' SOL - VISA",
}


export default function PaginaInicial() {
  return (
    <Hero />
  )
}