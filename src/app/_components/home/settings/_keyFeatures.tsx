import Image from "next/image"

export const KeyFacture: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Principais características</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simplifique seu registro de Residencia</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nossa plataforma agiliza o processo de registro residencial, economizando tempo e garantindo a conformidade.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Registro fácil</h3>
                  <p className="text-muted-foreground">
                    Nossa interface intuitiva orienta você através do processo de registro passo-a-passo.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Conformidade automatizada</h3>
                  <p className="text-muted-foreground">
                    Mantenha-se atualizado com os mais recentes regulamentos e requisitos.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Gestão de Propriedades</h3>
                  <p className="text-muted-foreground">
                    Gerencie facilmente os detalhes e a documentação da propriedade em um só lugar.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <Image
            src="/placeholder.svg"
            width="550"
            height="310"
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
        </div>
      </div>
    </section>
  )
}