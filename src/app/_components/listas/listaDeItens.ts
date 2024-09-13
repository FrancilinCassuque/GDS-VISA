import { IconPackage2, IconHome, IconShoppingCart, IconPackage, IconUsers, IconLineChart, IconSettings, IconPlus, IconUserPlus } from ".."

export const listItem = [
  {
    text: 'Dashboard',
    icon: IconPackage2,
    path: '/auth/dashboard',
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
    text: 'Registrar Cliente',
    icon: IconUserPlus,
    path: '/auth/processo/create',
  },

  // {
  //   text: 'Registrar Casa',
  //   icon: IconPlus,
  //   path: '/auth/home/create',
  // },

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
    text: 'Settings',
    icon: IconSettings,
    path: '#',
  }
]