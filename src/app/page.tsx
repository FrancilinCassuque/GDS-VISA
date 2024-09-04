import { Metadata } from 'next'
import { Home } from './_components/'

const metadata: Metadata = {
  title: "S A R A - Home",
}


export default function PaginaInicial(){
  return (
    <Home/>
  )
}