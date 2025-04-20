'use client'

import { motion } from 'framer-motion'
import { Moon, Sun, SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { navItems } from './header'


interface IThemeProps {
  isMobile?: boolean
}


export const Tema: React.FC<IThemeProps> = ({ isMobile }) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
    >
      <Link
        href={'#'}
        onClick={(e) => {
          e.preventDefault()
          toggleTheme()
        }}
        className="text-muted-foreground hover:text-primary transition-colors font-medium"
      >
        {theme === 'light' ? (
          <span className='flex'>
            <Moon className="w-6 h-6 mr-2" />
            {isMobile && ('Tema Escuro')}
          </span>
        ) : (
          <span className='flex'>
            <Sun className="w-6 h-6 mr-2" />
            {isMobile && ('Tema Claro')}
          </span>
        )}
      </Link>
    </motion.div>
  )
}