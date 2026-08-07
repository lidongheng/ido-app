<template>
  <div class="cloud-operation-page">
    <template v-if="activeOptions">
      <filter-bar
        :region-label="filterLabel"
        :region-open="showSelector"
        @open-region="toggleSelector"
      />

      <main class="page-content">
        <router-view v-slot="{ Component, route: currentRoute }">
          <keep-alive>
            <component
              :is="Component"
              :key="currentRoute.name"
              v-if="currentRoute.meta.keepAlive"
              :filters="filters"
            />
          </keep-alive>
          <component
            :is="Component"
            :key="currentRoute.name"
            v-if="!currentRoute.meta.keepAlive"
            :filters="filters"
          />
        </router-view>
      </main>

      <region-selector
        v-if="!isDcRoute"
        :visible="showSelector"
        :options="regionOptions"
        :selected-ids="selectedRegionIds"
        :all-mode="regionAllMode"
        @cancel="closeSelector"
        @confirm="confirmRegionSelection"
      />

      <dc-selector
        v-else
        :visible="showSelector"
        :options="dcOptions"
        :selected-ids="selectedDcIds"
        :all-mode="dcAllMode"
        @cancel="closeSelector"
        @confirm="confirmDcSelection"
      />

      <bottom-navigation
        :active="activeRouteName"
        @navigate="navigate"
        @ai-click="onAiClick"
      />
    </template>

    <div v-else-if="loadingOptions" class="shell-status">
      <van-loading color="#5b49c2" vertical>加载筛选项...</van-loading>
    </div>

    <div v-else class="shell-status error-state">
      {{ optionsError }}
    </div>
  </div>
</template>

<script setup>
import BottomNavigation from '@/components/cloud-operation/BottomNavigation.vue';
import DcSelector from '@/components/cloud-operation/DcSelector.vue';
import FilterBar from '@/components/cloud-operation/FilterBar.vue';
import RegionSelector from '@/components/cloud-operation/RegionSelector.vue';
import { useCloudOperationFilters } from './useCloudOperationFilters.js';

const {
  activeRouteName,
  activeOptions,
  closeSelector,
  confirmDcSelection,
  confirmRegionSelection,
  dcAllMode,
  dcOptions,
  filterLabel,
  filters,
  isDcRoute,
  loadingOptions,
  navigate,
  onAiClick,
  optionsError,
  regionAllMode,
  regionOptions,
  selectedDcIds,
  selectedRegionIds,
  showSelector,
  toggleSelector
} = useCloudOperationFilters();
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
