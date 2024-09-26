import { IconPackage2, IconHome, IconShoppingCart, IconPackage, IconUsers, IconLineChart, IconSettings, IconPlus, IconUserPlus, IconNewInf, IconFactura, IconTema, IconNewFactura } from ".."

export const listItem = [
  {
    text: 'GDS-VISA',
    icon: IconPackage2,
    path: '/',
    linkClass: 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
  },
  {
    text: 'Inicio',
    icon: IconHome,
    path: '/auth/home',
    linkClass: 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
  },
  // {
  //   text: 'Orders',
  //   icon: IconShoppingCart,
  //   path: '#',
  // },
  {
    text: 'Novo Cliente',
    icon: IconUserPlus,
    path: '/auth/client/create',
  },
  
  {
    text: 'Novo Processo',
    icon: IconNewInf,
    path: '/auth/processo/create',
  },
  
  {
    text: 'Processos',
    icon: IconPackage,
    path: '/auth/processo/',
  },
  
  {
    text: 'Nova Factura',
    icon: IconNewFactura,
    path: '/auth/dashboard/contas/create',
  },

  
  {
    text: 'Contas',
    icon: IconFactura,
    path: '/auth/dashboard/contas',
  },

  {
    text: 'Usuarios',
    icon: IconUsers,
    path: '/auth/user',
  },
  // {
  //   text: 'Analytics',
  //   icon: IconLineChart,
  //   path: '#',
  // },
]

export const subListItem = [
  {
    text: 'Configurações',
    icon: IconSettings,
    path: '/auth/dashboard/settings',
  }
]