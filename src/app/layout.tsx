import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import MySessionProvider from "@/provider/session"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "next-themes"
import { cn } from "@/lib/utils"

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
  title: "Gota D' Sol Visa",
  description: "Gota D' Sol Agencia",
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <MySessionProvider>
          <ThemeProvider
            defaultTheme="light"
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
