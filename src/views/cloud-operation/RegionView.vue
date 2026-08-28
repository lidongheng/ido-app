<template>
  <div class="dashboard-view">
    <operation-section title="Region经营概览">
      <indicator-panel :items="primaryMetrics" :columns="2" :bordered="true" />
      <indicator-panel :items="businessMetrics" :columns="2" :bordered="true" />
    </operation-section>

    <operation-section title="趋势分析">
      <trend-chart
        :categories="trendCategories"
        :series="trendSeries"
        :unit="trendUnit"
        :height="275"
      />
    </operation-section>

    <operation-section title="国内Region经营详情">
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
    </operation-section>

    <operation-section title="海外Region经营详情">
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
    </operation-section>
  </div>
</template>

<script setup>
import DataLink from '@/components/cloud-operation/DataLink.vue';
import IndicatorPanel from '@/components/cloud-operation/IndicatorPanel.vue';
import OperationSection from '@/components/cloud-operation/OperationSection.vue';
import StatusDot from '@/components/cloud-operation/StatusDot.vue';
import TableList from '@/components/cloud-operation/TableList.vue';
import TrendChart from '@/components/cloud-operation/TrendChart.vue';
import { useRegionOverview } from './useRegionOverview.js';

const {
  businessMetrics,
  columns,
  domesticRows,
  openRegion,
  overseasRows,
  primaryMetrics,
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
</style>
