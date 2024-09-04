import { IconPackage2, IconHome, IconShoppingCart, IconPackage, IconUsers, IconLineChart, IconSettings, IconPlus } from ".."

export const listItem = [
  {
    text: 'SARA',
    icon: IconPackage2,
    path: '/auth/home',
    linkClass: 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
  },
  {
    text: 'Dashboard',
    icon: IconHome,
    path: '/auth/dashboard',
    linkClass: 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
  },
  // {
  //   text: 'Orders',
  //   icon: IconShoppingCart,
  //   path: '#',
  // },
  {
    text: 'Products',
    icon: IconPackage,
    path: '/auth/home',
  },
  {
    text: 'Registrar Casa',
    icon: IconPlus,
    path: '/auth/home/create',
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
    text: 'Settings',
    icon: IconSettings,
    path: '#',
  }
]