import { UserData } from "@/app/_components"
import { auth } from "@/db"

export default async function SettingsID({ params }: { params: { userEmail: string } }) {
  const email = decodeURIComponent(params.userEmail)
  const userauth = await auth(email)
  
  if (userauth instanceof Error) return


  return (
    <div className="w-full max-w-max mx-auto py-12 md:py-16 lg:py-20">
      <div className="space-y-4 text-center mb-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Definições & Privacidades</h1>
        <p className="md:text-lg text-foreground">Informações detalhadas de {userauth.name}.</p>
      </div>

      <UserData userAuth={userauth} />
    </div>
  )
}
