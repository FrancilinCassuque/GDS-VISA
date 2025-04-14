'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CountryCard({ country }: { country: any }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={country.image}
          alt={country.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{country.name}</h3>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">TIPOS DE VISTO</h4>
          <div className="flex flex-wrap gap-2">
            {country.visas.map((visa: any, index: number) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {visa.icon}
                <span>{visa.type}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <Link
          href={`/servicos#${country.name.toLowerCase()}`}
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          Saiba mais
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}