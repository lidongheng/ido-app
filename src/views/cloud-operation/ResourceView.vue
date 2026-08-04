<template>
  <div class="dashboard-page">
    <div v-if="loading" class="page-status">
      <van-loading color="#5b49c2" vertical>资源数据加载中...</van-loading>
    </div>

    <div v-else-if="errorMessage" class="page-status error-state">
      {{ errorMessage }}
    </div>

    <template v-else>
      <operation-section title="运营概览(公有云)">
        <metric-card :metrics="pageData.overview" />
      </operation-section>

      <operation-section title="智算">
        <metric-card :metrics="pageData.intelligence.summary" />

        <card-tree
          :data="pageData.intelligence.modes"
          :height="104"
          :collapsible="false"
          :style="{ '--row-height': '2.77rem' }"
        >
          <template #default="{ item }">
            <metric-card
              class="tree-card"
              :title="item.name"
              icon="cluster-o"
              :metrics="item.metrics"
              compact
            />
          </template>
        </card-tree>
      </operation-section>

      <operation-section title="通算">
        <metric-card :metrics="pageData.general.summary" />

        <card-tree
          :data="pageData.general.tree"
          :height="112"
          :collapsible="false"
          :style="{ '--row-height': '2.99rem' }"
        >
          <template #default="{ item }">
            <metric-card
              class="tree-card"
              :title="item.name"
              icon="cluster-o"
              :metrics="item.metrics"
              compact
            />
          </template>
        </card-tree>

        <template v-if="visibleAreaCards.length > 0">
          <metric-card
            v-for="card in visibleAreaCards"
            :key="card.name"
            :title="card.name"
            :metrics="card.metrics"
            expandable
          >
            <metric-card
              v-for="detail in card.details"
              :key="detail.regionId"
              :title="detail.name"
              icon="cluster-o"
              :metrics="detail.metrics"
              compact
            />
          </metric-card>

          <button
            v-if="pageData.general.areaCards.length > visibleAreaCount"
            class="more-button"
            type="button"
            @click="showAllAreas = !showAllAreas"
          >
            {{ showAllAreas ? '收起大区' : '更多大区' }}
            <van-icon :name="showAllAreas ? 'arrow-up' : 'arrow-down'" />
          </button>
        </template>

        <van-empty v-else description="当前筛选条件下暂无大区数据" />
      </operation-section>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, toRef, watch } from 'vue'
import CardTree from '@/components/card-tree/index.vue'
import OperationSection from '@/components/cloud-operation/OperationSection.vue'
import MetricCard from '@/components/cloud-operation/MetricCard.vue'
import { useResourceOverview } from './useResourceOverview.js'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const filters = toRef(props, 'filters')
const { loading, errorMessage, pageData } = useResourceOverview(filters)
const showAllAreas = ref(false)
const visibleAreaCount = 3

const visibleAreaCards = computed(() => {
  if (showAllAreas.value) {
    return pageData.value.general.areaCards
  }

  return pageData.value.general.areaCards.slice(0, visibleAreaCount)
})

watch(filters, () => {
  showAllAreas.value = false
}, {
  deep: true
})
</script>

<style lang="less" scoped>
.dashboard-page {
  min-height: calc(100vh - 1.35rem);
  padding: .48rem .43rem .4rem;
  background: #fff;
}

.page-status {
  display: flex;
  min-height: 7rem;
  align-items: center;
  justify-content: center;
  color: #655d7d;
}

.error-state {
  color: #df5b72;
  font-size: .37rem;
}

.tree-card {
  width: 100%;
}

.more-button {
  display: flex;
  width: 100%;
  min-height: .93rem;
  align-items: center;
  justify-content: center;
  gap: .08rem;
  border-radius: .17rem;
  color: #6d66a3;
  background: linear-gradient(90deg, #fafafe 0%, #f6f5fb 100%);
  font-size: .38rem;
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
    padding-right: .32rem;
    padding-left: .32rem;
  }
}
</style>
