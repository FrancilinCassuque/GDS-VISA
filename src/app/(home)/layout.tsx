import { Header } from "@/components/header"
import { Footer, } from "../_components"

export default function Component({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <>
      <Header />
      <div className="">
        {children}
      </div>
      <Footer />
    </>
  )
}