import { SignUp } from "@/app/_components";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Gota D' Sol Visa - Registrar Funcionario",
  description: "Gota D' Sol Agencia",
}


export default function CreateUser() {
  return (
    <SignUp />
  )
}