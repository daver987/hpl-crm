import { PersonOutline as PersonIcon } from '@vicons/ionicons5'
import {
  RequestPageOutlined as QuoteIcon,
  GroupOutlined as ContactsIcon,
  InboxOutlined as HomeIcon,
  AccountCircleOutlined as AccountsIcon,
  CalendarMonthOutlined as ReservationsIcon,
  MessageOutlined as MessageIcon,
  DirectionsCarOutlined as DispatchIcon,
  ReceiptOutlined as InvoiceIcon,
  SettingsOutlined as SettingsIcon,
  ScheduleOutlined as ScheduleIcon,
} from '@vicons/material'
import { Component, Ref } from 'vue'
import { NIcon } from 'naive-ui'
import { NuxtLink } from '#components'

export interface NavigationItem {
  label: any
  key: number
  icon?: any
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export const navigation = (): Ref<NavigationItem[]> =>
  ref([
    {
      label: () =>
        h(
          NuxtLink,
          {
            to: {
              name: 'My Office',
            },
          },
          { default: () => 'My Office' }
        ),
      icon: renderIcon(HomeIcon),
      key: 0,
    },

    {
      label: () =>
        h(
          NuxtLink,
          {
            to: '/contacts',
          },
          { default: () => 'Contacts' }
        ),
      icon: renderIcon(ContactsIcon),
      key: 1,
    },
    {
      label: () =>
        h(
          NuxtLink,
          {
            to: '/accounts',
          },
          { default: () => 'Accounts' }
        ),
      icon: renderIcon(AccountsIcon),
      key: 2,
      children: [
        {
          label: 'Corporate',
          key: 2.1,
        },
        {
          label: 'Individual',
          key: 2.2,
        },
      ],
    },
    {
      label: () =>
        h(
          NuxtLink,
          {
            to: '/quotes',
          },
          { default: () => 'Quotes' }
        ),
      icon: renderIcon(QuoteIcon),
      key: 3,
    },
    {
      label: () =>
        h(
          NuxtLink,
          {
            to: '/reservations',
          },
          { default: () => 'Reservations' }
        ),
      icon: renderIcon(ReservationsIcon),
      key: 4,
    },
    {
      label: () =>
        h(
          NuxtLink,
          {
            to: '/dispatch',
          },
          { default: () => 'Dispatch' }
        ),
      icon: renderIcon(DispatchIcon),
      key: 5,
    },
    {
      label: () =>
        h(
          NuxtLink,
          {
            to: '/messaging',
          },
          { default: () => 'Messaging' }
        ),
      icon: renderIcon(MessageIcon),
      key: 6,
    },
    {
      label: () =>
        h(
          NuxtLink,
          {
            to: '/schedule',
          },
          { default: () => 'Schedule' }
        ),
      icon: renderIcon(ScheduleIcon),
      key: 7,
    },
    {
      label: () =>
        h(
          NuxtLink,
          {
            to: '/invoicing',
          },
          { default: () => 'Invoicing' }
        ),
      icon: renderIcon(InvoiceIcon),
      key: 8,
    },
    {
      label: () =>
        h(
          NuxtLink,
          {
            to: '/profile',
          },
          { default: () => 'My Profile' }
        ),
      icon: renderIcon(PersonIcon),
      key: 9,
    },
    {
      label: () =>
        h(
          NuxtLink,
          {
            to: '/settings',
          },
          { default: () => 'Settings' }
        ),
      icon: renderIcon(SettingsIcon),
      key: 10,
    },
  ])
