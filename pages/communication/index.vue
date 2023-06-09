<script lang="ts" setup>
import { format } from 'date-fns'

definePageMeta({
  path: '/communication',
  name: 'Overview',
})
const {
  data: messages,
  pending: loadingMessages,
  error,
  refresh,
} = await useFetch('/api/messages')
</script>

<template>
  <n-layout-content style="padding: 12px">
    <n-grid :cols="1" :y-gap="12">
      <n-grid-item>
        <n-card content-style="padding: 0;" title="Messages">
          <n-tabs
            type="line"
            size="large"
            :tabs-padding="20"
            pane-style="padding: 20px;"
          >
            <n-tab-pane name="UNREAD">
              <n-grid :cols="3">
                <n-grid-item v-for="message in messages" :key="message.id">
                  <n-card
                    size="medium"
                    style="max-width: 350px"
                    :segmented="{
                      content: true,
                      footer: 'soft',
                    }"
                    title="Subject:"
                  >
                    <template #header-extra>
                      {{ message.subject }}
                    </template>

                    <n-space>
                      From:
                      <NuxtLink
                        class="text-blue-500"
                        :href="`mailto:${message.user.email_address}`"
                        >{{ message.user.email_address }}</NuxtLink
                      ><br />
                    </n-space>
                    <n-divider />
                    {{ format(new Date(message.created_at), 'PPP')
                    }}<br /><br />
                    {{ message.message }}<br /><br />
                    {{ message.user.first_name }} {{ message.user.last_name }}
                    <template #action>
                      <n-space justify="space-between">
                        <n-button type="primary" ghost strong size="medium"
                          >Reply</n-button
                        >
                        <n-button size="small" secondary>Mark As Read</n-button>
                      </n-space>
                    </template>
                  </n-card>
                </n-grid-item>
              </n-grid>
            </n-tab-pane>
            <n-tab-pane name="READ"> READ </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-layout-content>
</template>

<style scoped></style>
