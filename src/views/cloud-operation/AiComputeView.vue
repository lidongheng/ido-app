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
        :loading="false"
        :failed="false"
      />
      <donut-chart
        :data="cardDistribution"
        :center-value="cardDistributionSummary.value"
        :center-label="cardDistributionSummary.label"
        :height="245"
      />
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
        :loading="false"
        :failed="false"
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
      <donut-chart
        :data="customerDistribution"
        :center-value="customerDistributionSummary.value"
        :center-label="customerDistributionSummary.label"
        :height="265"
      />
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
        <template #usage="{ scope }">
          <trend-value
            v-if="scope.row && scope.row.usage !== undefined"
            :value="scope.row.usage"
            :direction="scope.row.direction"
            unit=""
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
      <donut-chart
        :data="regionDistribution"
        :center-value="regionDistributionSummary.value"
        :center-label="regionDistributionSummary.label"
        :height="255"
      />
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
      class="operation-card token-operation-card"
      title="Tokens"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card
        class="token-panel"
        :metrics="tokenMetrics"
        :loading="false"
        :failed="false"
      />
      <table-list
        class="token-table"
        :table-column="tokenColumns"
        :table-data="tokenRows"
        :default-sort="{}"
        :table-config="tableConfig"
      />
    </card-layout>

    <detail-drawer
      v-model:visible="drawerVisible"
      :title="drawerTitle"
      :metrics="drawerMetrics"
      :columns="drawerColumns"
      :rows="drawerRows"
    />
  </div>
</template>

<script setup>
import CardLayout from '@/components/card-layout/index.vue';
import DataLink from '@/components/cloud-operation/DataLink.vue';
import DetailDrawer from '@/components/cloud-operation/DetailDrawer.vue';
import DonutChart from '@/components/cloud-operation/DonutChart.vue';
import MetricCard from '@/components/cloud-operation/MetricCard.vue';
import TableList from '@/components/cloud-operation/TableList.vue';
import TrendValue from '@/components/cloud-operation/TrendValue.vue';
import { useAiCompute } from './useAiCompute.js';

const {
  cardColumns,
  cardDistribution,
  cardDistributionSummary,
  cardRows,
  customerColumns,
  customerDistribution,
  customerDistributionSummary,
  customerRows,
  drawerColumns,
  drawerMetrics,
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
  regionDistributionSummary,
  regionRows,
  tableConfig,
  tokenColumns,
  tokenMetrics,
  tokenRows,
} = useAiCompute();
</script>

<style lang="less" scoped>
.dashboard-view {
  min-height: 100%;
  padding: 14px 10px 24px;
  background: #fff;
}

:deep(.operation-card .body > :not(.title) + *) {
  margin-top: 10px;
}

:deep(.overview-panel .card-body) {
  gap: 0;
  padding: 12px 6px 11px;
}

:deep(.overview-panel .metric-content) {
  padding: 0 6px;
}

:deep(.overview-panel .metric-label) {
  gap: 3px;
  font-size: 12px;
  white-space: nowrap;
}

:deep(.overview-panel .metric-value-row) {
  margin-top: 8px;
}

:deep(.overview-panel .metric-value) {
  font-size: 20px;
}

:deep(.token-operation-card .body) {
  padding-bottom: 10px;
}

:deep(.token-panel .card-body) {
  min-height: 72px;
  gap: 0;
  padding: 9px 0;
}

:deep(.token-panel .metric-content) {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 14px;
}

:deep(.token-panel .metric-value-row) {
  order: 1;
  margin-top: 0;
}

:deep(.token-panel .metric-value) {
  font-size: 22px;
  line-height: 26px;
}

:deep(.token-panel .metric-unit) {
  font-size: 12px;
}

:deep(.token-panel .metric-label) {
  order: 2;
  min-height: 0;
  margin-top: 7px;
  color: #5d5874;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
}

.token-table {
  overflow: hidden;
  border: 1PX solid #e1e7f3;
  border-radius: 9px;
}

:deep(.token-table .el-table__header-wrapper .el-table__cell) {
  height: 34px;
  padding: 3px 5px;
  background: #eaf0fd !important;
}

:deep(.token-table .el-table__body-wrapper .el-table__cell) {
  height: 38px;
  padding: 4px 5px;
  border-bottom-color: #dfe3ec;
}

:deep(.token-table .el-table__header-wrapper .cell) {
  color: #6e6a91;
  font-size: 12px;
  font-weight: 400;
}

:deep(.token-table .el-table__body-wrapper .cell) {
  color: #28234f;
  font-size: 14px;
  font-weight: 600;
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
