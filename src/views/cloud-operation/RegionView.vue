<template>
  <div class="dashboard-view">
    <card-layout
      title="Region经营概览"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card
        :metrics="overviewData"
        :loading="overviewLoading"
        :failed="overviewFailed"
        :show-ratio="false"
      />
      <metric-card
        class="mgt8"
        :metrics="overviewData2"
        :loading="overviewLoading"
        :failed="overviewFailed"
        :show-ratio="false"
      />
    </card-layout>

    <card-layout
      title="趋势分析"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <trend-chart
        :categories="trendCategories"
        :series="trendSeries"
        :unit="trendUnit"
        :height="275"
      />
    </card-layout>

    <card-layout
      title="国内Region经营详情"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <table-list
        :columns="columns"
        :data="domesticRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #regionLink="{ row }">
          <data-link :text="row.name" @click="openRegion(row)" />
        </template>
        <template #status="{ row }">
          <status-dot :tone="row.status" label="经营状态" />
        </template>
      </table-list>
    </card-layout>

    <card-layout
      title="海外Region经营详情"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <table-list
        :columns="columns"
        :data="overseasRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #regionLink="{ row }">
          <data-link :text="row.name" @click="openRegion(row)" />
        </template>
        <template #status="{ row }">
          <status-dot :tone="row.status" label="经营状态" />
        </template>
      </table-list>
    </card-layout>
  </div>
</template>

<script setup>
import CardLayout from '@/components/card-layout/index.vue';
import DataLink from '@/components/cloud-operation/DataLink.vue';
import MetricCard from '@/components/cloud-operation/MetricCard.vue';
import StatusDot from '@/components/cloud-operation/StatusDot.vue';
import TableList from '@/components/cloud-operation/TableList.vue';
import TrendChart from '@/components/cloud-operation/TrendChart.vue';
import { useRegionOverview } from './useRegionOverview.js';

const {
  columns,
  domesticRows,
  openRegion,
  overviewData,
  overviewData2,
  overviewFailed,
  overviewLoading,
  overseasRows,
  tableConfig,
  trendCategories,
  trendSeries,
  trendUnit,
} = useRegionOverview();
</script>

<style lang="less" scoped>
.dashboard-view {
  min-height: 100%;
  padding: 14px 10px 24px;
  background: #fff;
}

.mgt8 {
  margin-top: 8px;
}
</style>
