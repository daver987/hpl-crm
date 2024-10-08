<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { promiseTimeout } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
import { tabListData } from './data'
import NoticeList from './NoticeList.vue'

const listDataRef = ref(cloneDeep(tabListData))
const loadingRef = ref(false)
const nameRef = ref(0)

const count = computed(() => {
  return listDataRef.value.reduce((pre, cur) => {
    return pre + cur.list.filter((item) => !item.read).length
  }, 0)
})

const getTabStyle = computed((): CSSProperties => {
  return {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '6rem',
  }
})

const getBadgeStyle = computed((): CSSProperties => {
  return {
    right: `-${count.value > 9 ? 6 : 1}px`,
  }
})

const handleClear = (index: number) => {
  listDataRef.value[index].list = []
}

const handleLoadMore = async (index: number) => {
  const raw = listDataRef.value[index]
  if (raw.list.length > 99) return
  loadingRef.value = true
  await promiseTimeout(1000)
  raw.list.push(...tabListData[index].list)
  loadingRef.value = false
}
</script>

<template>
  <div class="h-full mr-4">
    <n-popover trigger="click" class="!p-0" placement="bottom">
      <template #trigger>
        <span class="relative">
          <Icon
            name="heroicons:bell"
            style="width: 24px; height: 24px;"
          />
          <n-badge
            :value="count"
            :show="count > 0"
            :style="getBadgeStyle"
            :max="99"
          />
        </span>
      </template>

      <template #default>
        <NTabs
          v-model:value="nameRef"
          :tab-style="getTabStyle"
          type="line"
          justify-content="space-evenly"
          style="width: 450px;"
        >
          <template v-for="(item, index) in listDataRef" :key="item.key">
            <NTabPane :name="index">
              <template #tab>
                <n-space :size="3">
                  <div class="mt-1">
                    {{ item.name }}
                  </div>
                  <n-badge
                    :value="item.list.filter((i) => !i.read).length"
                    :type="item.badgeType"
                    :max="99"
                    :show="item.list.length !== 0"
                  />
                </n-space>
              </template>
              <NoticeList :list="item.list" :loading="loadingRef" />
            </NTabPane>
          </template>
        </NTabs>
        <div
  v-if="listDataRef[nameRef].list.length > 0"
  style="display: flex; border-top: 1px solid var(--n-divider-color);"
>
  <div
    style="padding: 1rem 0; text-align: center; cursor: pointer; flex: 1;"
    @click="handleClear(nameRef)"
  >
    Clear
  </div>
  <div
    v-if="nameRef !== 2"
    style="padding: 1rem 0; text-align: center; cursor: pointer; flex: 1; border-left: 1px solid var(--n-divider-color);"
    @click="handleLoadMore(nameRef)"
  >
    View More
  </div>
</div>

      </template>
    </n-popover>
  </div>
</template>


