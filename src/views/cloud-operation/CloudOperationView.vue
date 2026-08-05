<template>
  <div class="cloud-operation-page">
    <template v-if="regionOptions">
      <filter-bar
        :selected-date="selectedDate"
        :region-label="regionLabel"
        :region-open="showRegionSelector"
        @date-change="selectedDate = $event"
        @open-region="showRegionSelector = !showRegionSelector"
      />

      <main class="page-content">
        <router-view v-slot="{ Component }">
          <component :is="Component" :filters="filters" />
        </router-view>
      </main>

      <region-selector
        :visible="showRegionSelector"
        :options="regionOptions"
        :selected-ids="selectedRegionIds"
        @cancel="showRegionSelector = false"
        @confirm="confirmRegions"
      />

      <bottom-navigation
        :active="route.name"
        @navigate="navigate"
        @ai-click="onAiClick"
      />
    </template>

    <div v-else-if="loadingRegions" class="shell-status">
      <van-loading color="#5b49c2" vertical>加载筛选项...</van-loading>
    </div>

    <div v-else class="shell-status error-state">
      {{ regionError }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FilterBar from '@/components/cloud-operation/FilterBar.vue'
import RegionSelector from '@/components/cloud-operation/RegionSelector.vue'
import BottomNavigation from '@/components/cloud-operation/BottomNavigation.vue'
import { useRegionOptions } from './useRegionOptions.js'

function getToday() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const route = useRoute()
const router = useRouter()
const selectedDate = ref(getToday())
const showRegionSelector = ref(false)
const {
  regionOptions,
  selectedRegionIds,
  loadingRegions,
  regionError
} = useRegionOptions()

const filters = computed(() => ({
  date: selectedDate.value,
  regionIds: [...selectedRegionIds.value]
}))

const regionLabel = computed(() => {
  if (selectedRegionIds.value.length === regionOptions.value.length) {
    return '全部'
  }

  const firstRegion = regionOptions.value.find(
    (region) => region.id === selectedRegionIds.value[0]
  )

  if (selectedRegionIds.value.length === 1) {
    return firstRegion.name
  }

  return `${firstRegion.name} +${selectedRegionIds.value.length - 1}`
})

function confirmRegions(regionIds) {
  selectedRegionIds.value = regionIds
  showRegionSelector.value = false
}

function navigate(name) {
  if (route.name === name) {
    return
  }

  router.push({ name })
}

function onAiClick() {
  // AI 助手入口按当前需求只保留点击能力，不进行页面跳转。
}
</script>

<style lang="less" scoped>
.cloud-operation-page {
  min-height: 100vh;
  background: #fff;
}

.page-content {
  padding-top: 51px;
  padding-bottom: calc(75px + env(safe-area-inset-bottom));
}

.shell-status {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  color: #5d5575;
  background: #fff;
}

.error-state {
  color: #df5b72;
  font-size: 14px;
}
</style>
