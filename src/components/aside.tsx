'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, LogOut, Mail, Menu, Settings, User, X } from 'lucide-react';

const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const navItems = [
    { icon: <Home size={20} />, label: 'Início', href: '/' },
    { icon: <User size={20} />, label: 'Perfil', href: '/profile' },
    { icon: <Mail size={20} />, label: 'Mensagens', href: '/messages' },
    { icon: <Settings size={20} />, label: 'Configurações', href: '/settings' },
  ];

  return (
    <div className='mb-16'>
      {/* Botão de Toggle */}
      <button 
        onClick={toggleDrawer}
        className="fixed z-50 top-4 left-4 p-2 rounded-lg bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleDrawer}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-xl"
          >
            <div className="flex flex-col h-full p-4">
              {/* Cabeçalho */}
              <div className="flex items-center justify-between mb-8 p-2">
                <h2 className="text-xl font-bold text-indigo-600">Menu</h2>
                <button 
                  onClick={toggleDrawer}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Itens de Navegação */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <a
                        href={item.href}
                        className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.label}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Rodapé */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <button className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <LogOut size={20} className="mr-3" />
                  Sair
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SideDrawer