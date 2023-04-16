<script lang="ts" setup>
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
import { Component } from 'vue'
import { NIcon } from 'naive-ui'
import { NuxtLink } from '#components'

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

const menuOptions = computed(() => [
  renderNav('/', 'My Office', HomeIcon, 0),
  renderNav('/accounts', 'Accounts', AccountsIcon, '100', [
    {
      type: 'group',
      label: 'Account Types',
      key: '1.1',
      children: [
        renderNav('/accounts/corporate', 'Corporate', null, '1.1.1'),
        renderNav('/accounts/individual', 'Individual', null, '1.1.2'),
      ],
    },
  ]),
  renderNav('/contacts', 'Contacts', ContactsIcon, 2),
  renderNav('/quotes', 'Quotes', QuoteIcon, 3),
  renderNav('/reservations', 'Reservations', ReservationsIcon, 4, [
    {
      type: 'group',
      label: 'Active Reservations',
      key: '4.1',
      children: [
        renderNav('/reservations/evertransit', 'Evertransit', null, '4.1.1'),
        renderNav('/reservations/fasttrak', 'Fasttrak', null, '4.1.2'),
      ],
    },
  ]),
  renderNav('/dispatch', 'Dispatch', DispatchIcon, 5),
  renderNav('/messaging', 'Messaging', MessageIcon, 6),
  renderNav('/schedule', 'Schedule', ScheduleIcon, 7),
  renderNav('/invoicing', 'Invoicing', InvoiceIcon, 8),
  renderNav('/profile', 'My Profile', PersonIcon, 9),
  renderNav('/settings', 'Settings', SettingsIcon, 10),
])

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
