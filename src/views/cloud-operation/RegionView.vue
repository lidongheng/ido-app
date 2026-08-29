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
      <common-echarts :options="trendOptions" />
    </card-layout>

    <card-layout
      title="国内Region经营详情"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <table-list
        :table-column="columns"
        :table-data="domesticRows"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #name="{ scope }">
          <data-link
            v-if="scope.row && scope.row.name !== undefined"
            :text="scope.row.name"
            @click="openRegion(scope.row)"
          />
        </template>
        <template #status="{ scope }">
          <status-dot
            v-if="scope.row && scope.row.status !== undefined"
            :tone="scope.row.status"
            label="经营状态"
          />
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
        :table-column="columns"
        :table-data="overseasRows"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #name="{ scope }">
          <data-link
            v-if="scope.row && scope.row.name !== undefined"
            :text="scope.row.name"
            @click="openRegion(scope.row)"
          />
        </template>
        <template #status="{ scope }">
          <status-dot
            v-if="scope.row && scope.row.status !== undefined"
            :tone="scope.row.status"
            label="经营状态"
          />
        </template>
      </table-list>
    </card-layout>
  </div>
</template>

<script setup>
import CardLayout from '@/components/card-layout/index.vue';
import CommonEcharts from '@/components/common-echarts/index.vue';
import DataLink from '@/components/cloud-operation/DataLink.vue';
import MetricCard from '@/components/cloud-operation/MetricCard.vue';
import StatusDot from '@/components/cloud-operation/StatusDot.vue';
import TableList from '@/components/cloud-operation/TableList.vue';
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
  trendOptions,
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
