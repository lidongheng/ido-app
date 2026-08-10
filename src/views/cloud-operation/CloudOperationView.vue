<template>
  <div class="cloud-operation-page">
    <template v-if="true">
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

    <template v-if="showAssistant">
      <iframe
        id="iframe-page"
        src="#"
      ></iframe>

      <div class="return circle" @click="showAssistant = false">
        <SvgIcon iconName="dashboard" class="icon-dashboard" />
        <span class="text">点我~</span>
        <span class="text">返回看板</span>
      </div>
    </template>
    
    divdiv
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
  showAssistant,
  toggleSelector
} = useCloudOperationFilters();
</script>

<style lang="less" scoped>
.cloud-operation-page {
  height: 100vh;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  overflow: auto;
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

#iframe-page {
  position: absolute;
  z-index: 1200;
  left: 0;
  top: 0;
  border: 0;
  transform-origin: 0 0;
  width: 100vw;
  height: calc(100vh - 40px);
}

.return {
  position: absolute;
  z-index: 1210;
  right: 4px;
  bottom: 20vh;
  display: flex;
  justify-content: center;
  padding-top: 10px;

  .icon-dashboard {
    width: 20px;
    height: 20px;
    color: #4E5FE9;
  }

  .text {
    position: absolute;
    bottom: 4px;
    font-size: 10px;
    font-weight: bold;
    color: #5651ea;
    font-family: 'Microsoft YaHei';
    transform-origin: center;
    white-space: nowrap;

    &:nth-of-type(1) {
      animation: textLoopA 8s infinite;
    }

    &:nth-of-type(2) {
      animation: textLoopB 8s infinite;
    }
  }
}

@keyframes textLoopA {
  0%, 40% { opacity: 1; transform: scale(1); }
  50% { opacity: 0; transform: scale(0); }
  90% { opacity: 0; transform: scale(0); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes textLoopB {
  0%, 40% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
  90% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0); }
}

.circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(to right, #f3f4fd, #edf9fc, #ebfafc);
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: absolute;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: #fff;
    border-radius: 50%;
  }
}
</style>
