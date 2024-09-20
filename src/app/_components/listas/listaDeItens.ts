import { IconPackage2, IconHome, IconShoppingCart, IconPackage, IconUsers, IconLineChart, IconSettings, IconPlus, IconUserPlus, IconNewInf, IconFactura, IconTema } from ".."

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
  // {
  //   text: 'Products',
  //   icon: IconPackage,
  //   path: '/auth/home',
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