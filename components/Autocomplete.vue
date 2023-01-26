<script lang="ts" setup>
// import { z } from 'zod'
// const contactSchema = z
//   .object({
//     firstName: z.string(),
//     lastName: z.string(),
//     phoneNumber: z.string(),
//   })
//   .strip()
const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

const options = ref(stringOptions)

const contact = ref('')
const phoneNumber = ref('')

const filterFn = (val: any, update: any, abort: any) => {
  update(() => {
    const needle = val.toLowerCase()
    options.value = stringOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    )
  })
}
// const getContacts = async () => {
//   try {
//     const { data: contacts, refresh } = await useFetch('/api/get-contacts')
//     console.log(contactSchema.parse(contacts))
//   } catch (error) {
//     alert(error)
//   }
// }
// await getContacts()
</script>

<template>
  <q-card>
    <q-card-section>
      <q-input
        dense
        outlined
        v-model="phoneNumber"
        hint="Enter in Phone Number"
      />
    </q-card-section>
    <q-card-section>
      <q-select
        v-model="contact"
        use-input
        dense
        outlined
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        hint="Search Contacts"
        style="width: 250px; padding-bottom: 32px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> Enter Number</q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn flat label="Start Conversation" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<style scoped></style>
