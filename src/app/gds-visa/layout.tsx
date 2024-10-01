import { Footer, } from "../_components"

export default function Component({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <div className="bg-gradient-to-r from-blue-100">
      <div className="mb-6">
        {children}
      </div>

      <Footer />
    </div>
  )
}