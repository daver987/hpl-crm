export interface NavigationItem {
  name: string
  to: string
  id: number
  icon?: string
}

export const navigation = <NavigationItem[]>[
  {
    name: 'My Office',
    to: '/',
    icon: 'inbox',
    id: 0,
  },
  {
    name: 'Contacts',
    to: '/contacts',
    icon: 'group',
    id: 1,
  },
  {
    name: 'Accounts',
    to: '/accounts',
    icon: 'account_circle',
    id: 2,
  },
  {
    name: 'Quotes',
    to: '/quotes',
    icon: 'request_quote',
    id: 3,
  },
  {
    name: 'Reservations',
    to: '/reservations',
    icon: 'calendar_month',
    id: 4,
  },
  {
    name: 'Dispatch',
    to: '/dispatch',
    icon: 'directions_car',
    id: 5,
  },
  {
    name: 'Messaging',
    to: '/messaging',
    icon: 'message',
    id: 6,
  },
  {
    name: 'Schedule',
    to: '/schedule',
    icon: 'schedule',
    id: 7,
  },
  {
    name: 'Invoicing',
    to: '/invoicing',
    icon: 'receipt',
    id: 8,
  },
  {
    name: 'My Profile',
    to: '/profile',
    icon: 'person_outline',
    id: 9,
  },
  {
    name: 'Settings',
    to: '/settings',
    icon: 'settings',
    id: 10,
  },
]
