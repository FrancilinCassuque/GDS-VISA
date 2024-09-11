import { Metadata } from "next"
import { Login } from "../_components"

export const metadata: Metadata = {
  title: "Gota D' Sol Visa - Entrar",
  description: "Gota D' Sol Agencia",
}


export default function AuthLogin(){

  return (
    <Login/>
  )
} 