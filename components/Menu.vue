<script lang="ts" setup>
import { Component } from 'vue'
import { MenuOption, NIcon } from 'naive-ui'
import { NuxtLink, Icon } from '#components'

const SettingsIcon = h(Icon, { name: 'ic:outline-settings' })
const ScheduleIcon = h(Icon, { name: 'ic:outline-schedule' })
const InvoiceIcon = h(Icon, { name: 'ic:outline-receipt' })
const DispatchIcon = h(Icon, { name: 'ic:outline-directions-car' })
const MessageIcon = h(Icon, { name: 'ic:outline-message' })
const ReservationsIcon = h(Icon, { name: 'ic:outline-calendar-month' })
const AccountsIcon = h(Icon, { name: 'ic:outline-account-circle' })
const InboxIcon = h(Icon, { name: 'ic:outline-inbox' })
const ContactsIcon = h(Icon, { name: 'ic:outline-group' })
const QuoteIcon = h(Icon, { name: 'ic:outline-request-page' })
const PersonIcon = h(Icon, { name: 'basil:user-outline' })
const UsersIcon = h(Icon, { name: 'heroicons:users' })
const FolderIcon = h(Icon, { name: 'heroicons:folder' })
const HomeIcon = h(Icon, { name: 'heroicons:home' })
const DocumentDuplicateIcon = h(Icon, { name: 'heroicons:document-duplicate' })
const ChartPieIcon = h(Icon, { name: 'heroicons:chart-pie' })
const CalendarIcon = h(Icon, { name: 'heroicons:calendar-20-solid' })
const CarIcon = h(Icon, { name: 'material-symbols:directions-car-outline' })

interface RenderNavOptions {
  navigateTo: string
  defaultLabel: string
}

interface NavigationItem {
  label: any
  key: number
  icon?: any
}
const createMenuLabel = (labelText: string, route: string) => {
  return () =>
    h(
      NuxtLink,
      {
        to: route,
      },
      {
        default: () => labelText,
      }
    )
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  renderNav('/', 'Dashboard', HomeIcon, 0),
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: 'Accounts',
    key: 'Accounts',
    icon: renderIcon(AccountsIcon),
    children: [
      {
        key: 'divider-2',
        type: 'divider',
        props: {
          style: {
            marginLeft: '32px',
          },
        },
      },
      renderNav('/accounts', 'Overview', null, '1.1'),
      renderNav('/accounts/fasttrak', 'Fasttrak', null, '1.2'),
      renderNav('/accounts/stripe', 'Stripe', null, '1.3'),
    ],
  },
  {
    key: 'divider-3',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: 'Contacts',
    key: 'contacts',
    icon: renderIcon(ContactsIcon),
    children: [
      renderNav('/contacts', 'Overview', null, '2'),
      renderNav('/accounts/fasttrak', 'Fasttrak', null, '2.1'),
      renderNav('/accounts/stripe', 'Stripe', null, '2.2'),
    ],
  },
  {
    key: 'divider-4',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: 'Quotes',
    key: 'Quotes',
    icon: renderIcon(QuoteIcon),
    children: [
      {
        key: 'divider-5',
        type: 'divider',
        props: {
          style: {
            marginLeft: '32px',
          },
        },
      },
      renderNav('/quotes', 'Overview', null, 3),
      renderNav('/quotes/active', 'Active', null, '3.2'),
      renderNav('/quotes/expired', 'Expired', null, '3.3'),
    ],
  },
  {
    key: 'divider-6',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: 'Reservations',
    key: 'Reservations',
    icon: renderIcon(ReservationsIcon),
    children: [
      {
        key: 'divider-7',
        type: 'divider',
        props: {
          style: {
            marginLeft: '32px',
          },
        },
      },
      renderNav('/reservations', 'Overview', null, '4'),
      renderNav('/reservations/active', 'Active', null, '4.2'),
      renderNav('/reservations/completed', 'Completed', null, '4.3'),
      renderNav('/reservations/finalized', 'Finalized', null, '4.4'),
      renderNav('/reservations/evertransit', 'Evertransit', null, '4.5'),
    ],
  },
  {
    key: 'divider-8',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: 'Communication',
    key: 'communication',
    icon: renderIcon(MessageIcon),
    children: [
      {
        key: 'divider-9',
        type: 'divider',
        props: {
          style: {
            marginLeft: '32px',
          },
        },
      },
      renderNav('/communication', 'Overview', null, 5),
      renderNav('/communication/schedule', 'Schedule', null, '5.2'),
      renderNav('/communication/messaging', 'Messaging', null, '5.3'),
    ],
  },
  {
    key: 'divider-10',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: 'Resources',
    key: 'Resources',
    icon: renderIcon(FolderIcon),
    children: [
      {
        key: 'divider-11',
        type: 'divider',
        props: {
          style: {
            marginLeft: '32px',
          },
        },
      },
      renderNav('/resources', 'Overview', null, '6'),
      renderNav('/resources/drivers', 'Drivers', null, '6.2'),
      renderNav('/resources/affiliates', 'Affiliates', null, '6.3'),
      renderNav('/resources/vehicles', 'Vehicles', null, '6.4'),
    ],
  },
  {
    key: 'divider-12',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: 'Billing',
    key: 'Billing',
    icon: renderIcon(InvoiceIcon),
    children: [
      {
        key: 'divider-13',
        type: 'divider',
        props: {
          style: {
            marginLeft: '32px',
          },
        },
      },
      renderNav('/billing', 'Overview', null, 7),
      renderNav('/billing/receivables', 'Receivables', null, '7.2'),
      renderNav('/billing/payables', 'Payables', null, '7.3'),
      renderNav('/billing/invoicing', 'Invoicing', null, '7.4'),
      renderNav('/billing/stripe', 'Stripe', null, '7.5'),
    ],
  },
  {
    key: 'divider-14',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: 'Settings',
    key: 'Settings',
    icon: renderIcon(SettingsIcon),
    children: [
      {
        key: 'divider-15',
        type: 'divider',
        props: {
          style: {
            marginLeft: '32px',
          },
        },
      },
      renderNav('/settings', 'Profile', null, '8'),
      renderNav('/settings/quotes', 'Quotes', null, '8.2'),
    ],
  },
]

function renderNav(
  navigateTo: string,
  defaultLabel: string,
  iconComponent: any,
  key: string | number,
  children?: any
) {
  const navItem: any = {
    label: () =>
      h(
        NuxtLink,
        {
          to: navigateTo,
        },
        { default: () => defaultLabel }
      ),
    key,
  }

  if (iconComponent) {
    navItem.icon = renderIcon(iconComponent)
  }

  if (children) {
    navItem.children = children
  }

  return navItem
}
</script>

<template>
  <n-menu
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
  />
</template>
