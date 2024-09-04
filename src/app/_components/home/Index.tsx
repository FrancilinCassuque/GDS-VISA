'use client'


import { TopHome } from "./settings/_topHome"
import { KeyFacture } from "./settings/_keyFeatures"
import { Relatos } from "./settings/_relatos"

export const Home: React.FC = () => {
  
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <TopHome />

        <KeyFacture />

        <Relatos />
      </main>
    </div>
  )
}