<script setup lang="ts">
definePageMeta({
  name: 'Invoicing',
  layout: 'default',
  path: '/billing/invoicing',
})

const invoiceNumber = ref('0001')
const invoiceDate = ref('2023-04-23')
const lineItems = ref([
  { description: 'Base Fare', amount: ' $100.00' },
  { description: 'Fuel Surcharge', amount: ' $10.00' },
  { description: 'Gratuity', amount: ' $15.00' },
  // Add more line items if needed
])
const totals = ref([
  { label: 'Subtotal', amount: ' $125.00' },
  { label: 'HST', amount: ' $16.25' },
  { label: 'Total', amount: ' $141.25' },
])
const pickupAddress = ref('123 Main St')
const pickupTime = ref('08:00 AM')
const pickupDay = ref('2023-04-24')
const dropOffAddress = ref('789 Second St')

const billToName = ref('John Doe')
const billToAddress = ref('123 Anywhere St, Toronto, ON')
const passengerName = ref('Jane Smith')
const pickupDateTime = ref('2023-04-24, 08:00 AM')
const pickupLocation = ref('123 Main St')
const dropOffLocation = ref('789 Second St')
const memo = ref('Please confirm pickup time.')
</script>

<template>
  <n-layout-content style="padding: 24px">
    <n-card
      style="
        max-width: 1000px;
        margin: auto;
        aspect-ratio: 17/22;
        padding-left: 12px;
        padding-right: 12px;
      "
    >
      <div class="header">
        <img
          class="logo"
          src="/images/hpl-logo-3.png"
          alt="High Park Livery Logo"
        />
        <div class="contact">
          <p>Email: info@highparklivery.com</p>
          <p>Phone: 647.360.9631</p>
        </div>
      </div>

      <div class="invoice-info">
        <div>
          <span class="label">Invoice #</span>
          <span>{{ invoiceNumber }}</span>
        </div>
        <div>
          <span class="label">Date</span>
          <span>{{ invoiceDate }}</span>
        </div>
      </div>

      <div class="bill-to">
        <h3>Bill To</h3>
        <p>{{ billToName }}</p>
        <p>{{ billToAddress }}</p>
      </div>

      <div class="order-info">
        <h3>Order Information</h3>
        <div>Passenger Name: {{ passengerName }}</div>
        <div>Pickup Date & Time: {{ pickupDateTime }}</div>
        <div>Pickup Location: {{ pickupLocation }}</div>
        <div>Drop Off Location: {{ dropOffLocation }}</div>
      </div>

      <table class="line-items">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in lineItems" :key="index">
            <td>{{ item.description }}</td>
            <td>{{ item.amount }}</td>
          </tr>
        </tbody>
      </table>

      <div class="totals">
        <div v-for="(total, index) in totals" :key="index">
          <span class="label">{{ total.label }} </span>
          <span> {{ total.amount }}</span>
        </div>
      </div>

      <div class="memo">
        <h3>Memo</h3>
        <p>{{ memo }}</p>
      </div>

      <div class="message">
        <p>
          Thank you for choosing High Park Livery. We appreciate your business!
        </p>
      </div>
    </n-card>
  </n-layout-content>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 2px solid #a57c52ff;
}

.logo {
  max-width: 150px;
  max-height: 75px;
}

.contact {
  text-align: right;
}

.invoice-info {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.invoice-info div {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.line-items {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.line-items th,
.line-items td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.line-items th {
  background-color: #a57c52ff;
  font-weight: bold;
  color: #ffffff;
}

.totals {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.totals div {
  margin-left: 20px;
}

.routing {
  margin-bottom: 20px;
}
.routing h3 {
  margin-bottom: 10px;
  color: #a57c52ff;
}

.routing div {
  margin-bottom: 5px;
}

.bill-to,
.order-info,
.memo {
  margin-bottom: 20px;
}

.bill-to h3,
.order-info h3,
.memo h3 {
  color: #a57c52ff;
  margin-bottom: 10px;
}

.message {
  font-style: italic;
  text-align: center;
  margin-top: 20px;
}
</style>
