'use client'

import { ReactNode } from "react"
import { SessionProvider } from 'next-auth/react'

interface ISessionProvider {
  children: ReactNode
}

const MySessionProvider: React.FC<ISessionProvider> = ({ children }) => {
  return < SessionProvider> {children} </ SessionProvider>
}

export default MySessionProvider