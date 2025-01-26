import { IconPackage2, IconHome, IconShoppingCart, IconPackage, IconUsers, IconLineChart, IconSettings, IconPlus, IconUserPlus, IconNewInf, IconFactura, IconTema, IconNewFactura, IconNewInf2, IconNewInf3, IconNewInf4 } from ".."

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

  
  // {
  //   text: 'Nova Factura',
  //   icon: IconNewFactura,
  //   path: '/auth/dashboard/contas/create',
  // },

  {
    text: 'Processos',
    icon: IconNewInf2,
    path: '/auth/processo/',
  },

  {
    text: 'Novo Processo',
    icon: IconNewInf,
    path: '/auth/processo/create',
  },

  {
    text: 'Serviços',
    icon: IconNewInf4,
    path: '/auth/dashboard/service',
  },
  
  {
    text: 'Novo Serviço',
    icon: IconNewInf3,
    path: '/auth/dashboard/service/new',
  },

  {
    text: 'Finanças',
    icon: IconFactura,
    path: '/auth/dashboard/contas',
  },

  {
    text: 'Recursos Humanos',
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