import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import MySessionProvider from "@/provider/session"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "next-themes"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Gota D\' Sol | Consultoria de Vistos Internacionais | Agendamento | Agendamento para Portugal',
  description: 'Consultoria especializada para obtenção de vistos para Portugal, Espanha, França, Bélgica, Brasil, Alemanha e África do Sul.',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7552816316876082"
          crossOrigin="anonymous"></script>
      </head>

      <body
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <MySessionProvider>
          <ThemeProvider
            enableSystem
            attribute="class"
          // disableTransitionOnChange
          >
            {children}

            <Toaster />
          </ThemeProvider>
        </MySessionProvider>
      </body>
    </html>
  )
}
