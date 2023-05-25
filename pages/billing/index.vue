<script lang="ts" setup>
import { format } from 'date-fns'
import { z } from 'zod'

definePageMeta({
  name: 'Billing Overview',
  layout: 'default',
  path: '/billing',
})

const AgingReportSchema = z.object({
  item: z.object({
    agingInvoiceInfoList: z.array(
      z.object({
        invoiceInfo: z.object({
          invoiceId: z.number(),
          invoiceDate: z.string(),
          invoicePayStatus: z.string(),
          customerId: z.number(),
          corporateProfileId: z.number(),
          companyId: z.number(),
          invoiceMessage: z.string(),
          daysInBilling: z.number(),
          unusedDeposits: z.number(),
          invoiceTotal: z.number(),
          adjustedInvoiceTotal: z.number(),
          outstandingBalance: z.number(),
          paymentTotal: z.number(),
          adjustmentTotal: z.number(),
          depositDebitTotal: z.number(),
          discountTotal: z.number(),
          invoiceAddress: z.object({
            street1: z.string(),
            street2: z.string(),
            city: z.string(),
            region: z.string(),
            postalCode: z.string(),
            country: z.string(),
            displayAddress: z.string(),
            geoLookupAddress: z.string(),
            cityRegionPostalCode: z.string(),
          }),
          collectionMethod: z.string(),
          collectionType: z.string(),
          creditCardId: z.number(),
          isCorrectedInvoice: z.boolean(),
          isCancelledInvoice: z.boolean(),
          lastLateFeeDate: z.null(),
          isEmailed: z.boolean(),
          invoiceNotes: z.string(),
          createTime: z.string(),
          modifiedTime: z.string(),
          billToSummary: z.object({
            billToName: z.string(),
            billToDescription: z.string(),
            billToEntityType: z.string(),
            customerId: z.number(),
            corporateProfileID: z.number(),
            doBillCorporate: z.boolean(),
          }),
        }),
        isUnpaid: z.boolean(),
        isLate: z.boolean(),
        isCreditBalance: z.boolean(),
        agingReportTimeframeType: z.string(),
      })
    ),
  }),
})

type AgingReport = z.infer<typeof AgingReportSchema>

const {
  data: response,
  pending,
  error,
  refresh,
} = await useFetch('/api/billing', {
  method: 'POST',
})
const report = AgingReportSchema.parse(response.value)
const agingReport = report.item.agingInvoiceInfoList
</script>

<template>
  <n-layout-content>
    <n-card>
      <template
        v-for="aReport in agingReport"
        :key="aReport.invoiceInfo.invoiceId"
      >
        <p>{{ aReport.invoiceInfo.invoiceId }}</p>
        <p>{{ aReport.isUnpaid }}</p>
        <p>{{ aReport.invoiceInfo.invoiceTotal }}</p>
        <p>{{ aReport.invoiceInfo.billToSummary.billToName }}</p>
        <p>{{ format(new Date(aReport.invoiceInfo.invoiceDate), 'PP') }}</p>
      </template>
      <pre class="text-white">{{ agingReport }}</pre>
    </n-card>
  </n-layout-content>
</template>

<style scoped></style>
