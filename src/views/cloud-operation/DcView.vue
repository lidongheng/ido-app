<template>
  <div class="dashboard-page">
    <div v-if="loading" class="page-status">
      <van-loading color="#5b49c2" vertical>DC 数据加载中...</van-loading>
    </div>

    <div v-else-if="errorMessage" class="page-status error-state">
      {{ errorMessage }}
    </div>

    <template v-else>
      <operation-section title="DC概览">
        <metric-card :metrics="pageData.overview" />
      </operation-section>

      <operation-section title="运营概览">
        <progress-card
          v-for="group in pageData.progressGroups"
          :key="group.title"
          :group="group"
        />
        <!--
          特殊业务规则：服务器和客户必须作为一个完整模块，仅在全部数据中心都选中时展示。
          Mock 在非全选时返回空数组，因此这里直接移除组件，不显示空状态，也不保留占位高度。
        -->
        <usage-card v-if="pageData.usageGroups.length > 0" :groups="pageData.usageGroups" />
      </operation-section>

      <operation-section title="城市详情">
        <card-tree
          v-if="pageData.cityTree.length > 0"
          :data="pageData.cityTree"
          :height="112"
          :collapsible="false"
          :style="{ '--row-height': '112px' }"
        >
          <template #default="{ item }">
            <metric-card
              class="tree-card"
              :title="item.name"
              icon="wap-home-o"
              :metrics="item.metrics"
              compact
            />
          </template>
        </card-tree>

        <van-empty v-else description="当前筛选条件下暂无芜湖城市数据" />

        <template v-if="visibleCityCards.length > 0">
          <metric-card
            v-for="card in visibleCityCards"
            :key="card.name"
            :title="card.name"
            :metrics="card.metrics"
            expandable
          >
            <metric-card
              v-for="detail in card.details"
              :key="detail.name"
              :title="detail.name"
              icon="wap-home-o"
              :metrics="detail.metrics"
              compact
            />
          </metric-card>

          <button
            v-if="pageData.cityCards.length > visibleCityCount"
            class="more-button"
            type="button"
            @click="showAllCities = !showAllCities"
          >
            {{ showAllCities ? '收起城市' : '更多城市' }}
            <van-icon :name="showAllCities ? 'arrow-up' : 'arrow-down'" />
          </button>
        </template>

        <van-empty v-else description="当前筛选条件下暂无城市数据" />
      </operation-section>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, toRef, watch } from 'vue'
import CardTree from '@/components/card-tree/index.vue'
import OperationSection from '@/components/cloud-operation/OperationSection.vue'
import MetricCard from '@/components/cloud-operation/MetricCard.vue'
import ProgressCard from '@/components/cloud-operation/ProgressCard.vue'
import UsageCard from '@/components/cloud-operation/UsageCard.vue'
import { useDcOverview } from './useDcOverview.js'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const filters = toRef(props, 'filters')
const { loading, errorMessage, pageData } = useDcOverview(filters)
const showAllCities = ref(false)
const visibleCityCount = 3

const visibleCityCards = computed(() => {
  if (showAllCities.value) {
    return pageData.value.cityCards
  }

  return pageData.value.cityCards.slice(0, visibleCityCount)
})

watch(filters, () => {
  showAllCities.value = false
}, {
  deep: true
})
</script>

<style lang="less" scoped>
.dashboard-page {
  min-height: calc(100vh - 51px);
  padding: 18px 16px 15px;
  background: #fff;
}

.page-status {
  display: flex;
  min-height: 263px;
  align-items: center;
  justify-content: center;
  color: #655d7d;
}

.error-state {
  color: #df5b72;
  font-size: 14px;
}

.tree-card {
  width: 100%;
}

.more-button {
  display: flex;
  width: 100%;
  min-height: 35px;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border-radius: 6px;
  color: #6d66a3;
  background: linear-gradient(90deg, #fafafe 0%, #f6f5fb 100%);
  font-size: 14px;
  cursor: pointer;
}

:deep(.team-progress-list) {
  width: 100%;
}

:deep(.team-progress-list .row) {
  width: 100%;
}

@media (max-width: 360px) {
  .dashboard-page {
    padding-right: 12px;
    padding-left: 12px;
  }
}
</style>
