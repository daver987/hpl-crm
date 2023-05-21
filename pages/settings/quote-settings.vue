<script lang="ts" setup>
// import { quotes } from '~/data/quotes'
// import { format } from 'date-fns'
// import _ from 'lodash'

definePageMeta({
  key: (route) => route.fullPath,
  name: 'Quote Settings',
  layout: 'default',
  path: '/settings/quotes',
})

// const quotesToSnakeCase = toSnakeCase(quotes)
// console.log('Quotes to snake case:', quotesToSnakeCase)

// function formatAddress(name: string, address: string) {
//   return address.includes(name) ? address : `${name}, ${address}`
// }

// const modifiedQuotes = quotesToSnakeCase.map(
//   ({
//     pickup_date,
//     pickup_time,
//     return_date,
//     return_time,
//     last_name,
//     user_email,
//     first_name,
//     ...item
//   }) => ({
//     ...item,
//     email_address: _.trim(_.toLower(user_email)),
//     first_name: _.capitalize(first_name),
//     last_name: _.capitalize(last_name),
//     pickup_date: format(new Date(pickup_date), 'T'),
//     pickup_time: format(new Date(pickup_time), 'T'),
//     return_date: format(new Date(return_date), 'T'),
//     return_time: format(new Date(return_time), 'T'),
//     formatted_pickup_date: format(new Date(pickup_date), 'PPP'),
//     formatted_pickup_time: format(new Date(pickup_time), 'p'),
//     formatted_return_date: format(new Date(return_date), 'PPP'),
//     formatted_return_time: format(new Date(return_time), 'p'),
//     meta_data: [],
//     origin_full_name: formatAddress(
//       item.origin_name,
//       item.origin_formatted_address
//     ),
//     destination_full_name: formatAddress(
//       item.destination_name,
//       item.destination_formatted_address
//     ),
//   })
// )
//
// console.log('Quotes Profile:', modifiedQuotes)

// const returnedQuote = ref('')

// async function submitQuotes(quotes: any) {
//   for (let i = 0; i < quotes.length; i++) {
//     const quote = quotes[i]
//     const { data } = await useFetch('/api/quote', {
//       method: 'POST',
//       body: quote,
//     })
//     console.log('Returned Data', data.value)
//     //@ts-ignore
//     returnedQuote.value = data.value
//     await new Promise((resolve) => setTimeout(resolve, 200))
//   }
// }
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-row>
      <n-card title="Quote Form Settings">
        <SettingsTable />
      </n-card>
    </n-row>
  </n-layout-content>
</template>

<style scoped></style>
