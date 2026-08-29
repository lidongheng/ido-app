<template>
  <div class="dashboard-view">
    <card-layout
      class="operation-card"
      title="智算概览"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <indicator-panel :items="overviewMetrics" :columns="3" :bordered="true" />
      <donut-chart
        :data="cardDistribution"
        :center-value="cardDistributionSummary.value"
        :center-label="cardDistributionSummary.label"
        :height="245"
      />
      <table-list
        :columns="cardColumns"
        :data="cardRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #cardType="{ row }">
          <div class="type-cell">
            <span class="color-bullet" :style="{ background: row.color }"></span>
            <span>{{ row.name }}</span>
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
      <indicator-panel :items="efficiencyMetrics" :columns="3" :bordered="true" />
      <table-list
        :columns="efficiencyColumns"
        :data="efficiencyRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #link="{ row }">
          <data-link :text="row.name" @click="openDetail(row)" />
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
        :columns="customerColumns"
        :data="customerRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #link="{ row }">
          <data-link :text="row.name" @click="openDetail(row)" />
        </template>
        <template #trend="{ row }">
          <trend-value :value="row.usage" :direction="row.direction" unit="" />
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
        :columns="regionColumns"
        :data="regionRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #link="{ row }">
          <data-link :text="row.name" @click="openDetail(row)" />
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
      <indicator-panel :items="tokenMetrics" :columns="3" :bordered="false" />
      <table-list
        :columns="tokenColumns"
        :data="tokenRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      />
    </card-layout>

    <div class="bottom-agent-tip">下拉，Agent将为你服务...</div>

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
import IndicatorPanel from '@/components/cloud-operation/IndicatorPanel.vue';
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

.bottom-agent-tip {
  margin-top: 20px;
  margin-bottom: 12px;
  text-align: center;
  font-size: 11px;
  color: #a4a1b7;
  letter-spacing: 0.5px;
}
</style>
