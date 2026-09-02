<template>
  <div class="cloud-operation-page" :class="{ 'with-nav-bar': hasNavBar }">
    <template v-if="true">
      <!-- Region/DC 筛选逻辑暂时保留，当前入口只展示“全球”。 -->
      <filter-bar
        region-count-label=""
        region-label="全球"
        :region-open="showSelector"
        :region-disabled="filterDisabled"
        :region-static="true"
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

        <agent-panel />
      </main>

      <back-top
        target=".page-content"
        :visibility-height="300"
        bottom="120px"
        icon-size="24px"
      />

      <region-selector
        v-if="!isDcRoute && regionOptions"
        :visible="showSelector"
        :options="regionOptions"
        :selected-ids="selectedRegionIds"
        :all-mode="regionAllMode"
        @cancel="closeSelector"
        @confirm="confirmRegionSelection"
      />

      <dc-selector
        v-else-if="isDcRoute && dcOptions"
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
        <span class="text" style="font-size: 0.22rem;">返回看板</span>
      </div>
    </template>

    <div class="box">
      <div class="notch"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import BackTop from '@/components/back-top/index.vue';
import AgentPanel from '@/components/cloud-operation/AgentPanel.vue';
import BottomNavigation from '@/components/cloud-operation/BottomNavigation.vue';
import DcSelector from '@/components/cloud-operation/DcSelector.vue';
import FilterBar from '@/components/cloud-operation/FilterBar.vue';
import RegionSelector from '@/components/cloud-operation/RegionSelector.vue';
import SvgIcon from '@/components/cloud-operation/SvgIcon.vue';
import { useCloudOperationFilters } from './useCloudOperationFilters.js';

const hasNavBar = ref(false);

onMounted(() => {
  setTimeout(() => {
    hasNavBar.value = !!document.querySelector('.wecode-nav-bar');
  }, 10);
});

const {
  activeRouteName,
  activeOptions,
  closeSelector,
  confirmDcSelection,
  confirmRegionSelection,
  dcAllMode,
  dcOptions,
  filterCountLabel,
  filterDisabled,
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
  height: 100%;
  min-height: 0;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cloud-operation-page.with-nav-bar {
  height: calc(100% - 40PX);
}

.page-content {
  flex: 1;
  /* 旧安卓 WebView 需要明确释放 flex 子项的最小高度，才能形成真实滚动容器。 */
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
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
  height: 100vh;
}
.cloud-operation-page.with-nav-bar {
  height: calc(100vh - 40PX);
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
    bottom: 6px;
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
