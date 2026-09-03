<template>
  <div class="dashboard-view">
    <card-layout
      class="operation-card"
      title="智算概览"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card
        class="overview-panel"
        :metrics="overviewMetrics"
        :loading="xpuLoading"
        :failed="xpuFailed"
      />
      <RegionPie
        name="智算总数"
        unit="卡"
        :gap="1"
        :fixed="0"
        :loading="false"
        :data="cardDistribution"
      ></RegionPie>
      <table-list
        :table-column="cardColumns"
        :table-data="cardRows"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #name="{ scope }">
          <div v-if="scope.row && scope.row.name !== undefined" class="type-cell">
            <span class="color-bullet" :style="{ background: scope.row.color }"></span>
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </table-list>
    </card-layout>

    <card-layout
      class="operation-card"
      title="效率"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card
        :metrics="efficiencyMetrics"
        :loading="xpuLoading"
        :failed="xpuFailed"
        :separate-icon-row="true"
      />
      <table-list
        :table-column="efficiencyColumns"
        :table-data="efficiencyRows"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #name="{ scope }">
          <data-link
            v-if="scope.row && scope.row.name !== undefined"
            :text="scope.row.name"
            @click="openDetail(scope.row)"
          />
        </template>
      </table-list>
    </card-layout>

    <card-layout
      class="operation-card"
      title="客户分布"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <RegionPie
        name="总卡数"
        unit="卡"
        :gap="1"
        :fixed="0"
        :loading="false"
        :data="customerDistribution"
      ></RegionPie>
      <table-list
        :table-column="customerColumns"
        :table-data="customerRows"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #name="{ scope }">
          <data-link
            v-if="scope.row && scope.row.name !== undefined"
            :text="scope.row.name"
            @click="openDetail(scope.row)"
          />
        </template>
      </table-list>
    </card-layout>

    <card-layout
      class="operation-card"
      title="Region分布"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <RegionPie
        name="智算卡数"
        unit="卡"
        :gap="1"
        :fixed="0"
        :loading="false"
        :data="regionDistribution"
      ></RegionPie>
      <table-list
        :table-column="regionColumns"
        :table-data="regionRows"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #name="{ scope }">
          <data-link
            v-if="scope.row && scope.row.name !== undefined"
            :text="scope.row.name"
            @click="openDetail(scope.row)"
          />
        </template>
      </table-list>
    </card-layout>

    <card-layout
      class="operation-card"
      title="Tokens"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <token-card :metrics="tokenMetrics" />
      <table-list
        :table-column="tokenColumns"
        :table-data="tokenRows"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #name="{ scope }">
          <data-link
            v-if="scope.row && scope.row.name !== undefined"
            :text="scope.row.name"
            @click="openDetail(scope.row)"
          />
        </template>
      </table-list>
    </card-layout>

    <detail-drawer
      v-model:visible="drawerVisible"
      :detail-type="drawerDetailType"
      :title="drawerTitle"
      :rows="drawerRows"
    />
  </div>
</template>

<script setup>
import { toRef } from 'vue';
import CardLayout from '@/components/card-layout/index.vue';
import DataLink from '@/components/cloud-operation/DataLink.vue';
import DetailDrawer from '@/components/ai-compute/DetailDrawer.vue';
import RegionPie from '@/components/cloud-operation/common-computed/RegionPie.vue';
import MetricCard from '@/components/cloud-operation/MetricCard.vue';
import TableList from '@/components/cloud-operation/TableList.vue';
import TokenCard from '@/components/ai-compute/TokenCard.vue';
import { useAiCompute } from './useAiCompute.js';

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

const {
  cardColumns,
  cardDistribution,
  cardRows,
  customerColumns,
  customerDistribution,
  customerRows,
  drawerDetailType,
  drawerRows,
  drawerTitle,
  drawerVisible,
  efficiencyColumns,
  efficiencyMetrics,
  efficiencyRows,
  openDetail,
  overviewMetrics,
  regionColumns,
  regionDistribution,
  regionRows,
  tableConfig,
  tokenColumns,
  tokenMetrics,
  tokenRows,
  xpuFailed,
  xpuLoading,
} = useAiCompute(toRef(props, 'filters'));
</script>

<style lang="less" scoped>
.dashboard-view {
  min-height: 100%;
  padding: 14px 10px 24px;
  background: #f8f8f8;
}

:deep(.operation-card .body > :not(.title) + *) {
  margin-top: 10px;
}

:deep(.overview-panel .card-body) {
  gap: 0;
  padding: 12px 6px 11px;
}

:deep(.overview-panel .metric-item) {
  min-width: 0;
}

:deep(.overview-panel .metric-content) {
  padding: 0 2px;
}

:deep(.overview-panel .metric-label) {
  gap: 3px;
  font-size: 12px;
  white-space: nowrap;
}

:deep(.overview-panel .metric-value-row) {
  gap: 2px;
  margin-top: 8px;
  white-space: nowrap;
}

:deep(.overview-panel .metric-value) {
  font-size: clamp(14PX, 4.5vw, 18PX);
}

:deep(.overview-panel .metric-unit) {
  flex-shrink: 0;
}

.type-cell {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #353575;
}

.color-bullet {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

</style>
