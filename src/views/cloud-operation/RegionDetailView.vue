<template>
  <div class="dashboard-view">
    <header class="region-intro">
      <h1>{{ region.name }} <span>({{ region.code }})</span></h1>
      <p>AZ数量：<strong>{{ region.azCount }}</strong><span>开服时间：{{ region.openTime }}</span></p>
    </header>

    <indicator-panel :items="financialMetrics" :columns="2" :bordered="true" />

    <div class="server-card">
      <div class="server-card-header">
        <van-icon name="balance-list-o" class="server-icon" />
        <span>服务器</span>
      </div>
      <indicator-panel class="server-panel" :items="serverMetrics" :columns="4" :bordered="false" />
    </div>

    <card-layout
      class="operation-card"
      title="经营趋势"
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
      class="operation-card"
      title="收入来源"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <donut-chart
        :data="incomeDistribution"
        :center-value="incomeDistributionSummary.value"
        :center-label="incomeDistributionSummary.label"
        :height="270"
      />
    </card-layout>

    <card-layout
      class="operation-card"
      title="收入TOP5"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <table-list
        :columns="topColumns"
        :data="revenueRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      />
    </card-layout>

    <card-layout
      class="operation-card"
      title="收入增长TOP5"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <table-list
        :columns="topColumns"
        :data="growthRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      />
    </card-layout>

    <card-layout
      class="operation-card"
      title="收入降低TOP5"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <table-list
        :columns="topColumns"
        :data="declineRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      />
    </card-layout>

    <card-layout
      class="operation-card"
      title="客户资源"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <donut-chart
        :data="customerDistribution"
        :center-value="customerDistributionSummary.value"
        :center-label="customerDistributionSummary.label"
        :height="245"
      />
      <h3 class="subsection-title">国内客户排行榜</h3>
      <table-list
        :columns="rankColumns"
        :data="domesticRankRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #rank="{ row }">
          <rank-cell
            :rank="row.rank"
            :movement="row.movement"
            :direction="row.movementDirection"
          />
        </template>
        <template #customer="{ row }">
          <div class="customer-cell">
            <div class="customer-name-row">
              <span>{{ row.name }}</span>
              <em v-if="row.isNew" class="new-tag">NEW</em>
            </div>
            <span class="customer-subtitle">{{ row.subtitle }}</span>
          </div>
        </template>
      </table-list>

      <h3 class="subsection-title overseas-title">海外客户排行榜</h3>
      <table-list
        :columns="rankColumns"
        :data="overseasRankRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #rank="{ row }">
          <rank-cell
            :rank="row.rank"
            :movement="row.movement"
            :direction="row.movementDirection"
          />
        </template>
        <template #customer="{ row }">
          <div class="customer-cell">
            <div class="customer-name-row">
              <span>{{ row.name }}</span>
              <em v-if="row.isNew" class="new-tag">NEW</em>
            </div>
            <span class="customer-subtitle">{{ row.subtitle }}</span>
          </div>
        </template>
      </table-list>
    </card-layout>
  </div>
</template>

<script setup>
import CardLayout from '@/components/card-layout/index.vue';
import DonutChart from '@/components/cloud-operation/DonutChart.vue';
import IndicatorPanel from '@/components/cloud-operation/IndicatorPanel.vue';
import RankCell from '@/components/cloud-operation/RankCell.vue';
import TableList from '@/components/cloud-operation/TableList.vue';
import TrendChart from '@/components/cloud-operation/TrendChart.vue';
import { useRegionDetail } from './useRegionDetail.js';

const {
  customerDistribution,
  customerDistributionSummary,
  declineRows,
  domesticRankRows,
  financialMetrics,
  growthRows,
  incomeDistribution,
  incomeDistributionSummary,
  overseasRankRows,
  rankColumns,
  region,
  revenueRows,
  serverMetrics,
  tableConfig,
  topColumns,
  trendCategories,
  trendSeries,
  trendUnit,
} = useRegionDetail();
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

.region-intro {
  padding: 8px 6px 14px;
}

.region-intro h1 {
  color: #241c4f;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.region-intro h1 span {
  color: #716b85;
  font-size: 12px;
  font-weight: 400;
}

.region-intro p {
  display: flex;
  gap: 24px;
  margin-top: 8px;
  color: #5d5878;
  font-size: 12px;
}

.region-intro p strong {
  color: #353575;
}

.server-card {
  margin-top: 10px;
  border: 1PX solid #e5eaf5;
  border-radius: 9px;
  background: #fff;
  padding: 8px 4px 6px;
}

.server-card-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px 4px;
  font-size: 12px;
  font-weight: 700;
  color: #353575;
}

.server-icon {
  color: #5e63c8;
  font-size: 14px;
}

.server-panel {
  border: none !important;
}

.subsection-title {
  margin-top: 12px;
  margin-bottom: 8px;
  color: #35304f;
  font-size: 14px;
  font-weight: 600;
}

.overseas-title {
  margin-top: 18px;
}

.customer-cell {
  color: #353575;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.customer-name-row {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: 12px;
}

.customer-subtitle {
  display: block;
  color: #88829f;
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
}

.new-tag {
  display: inline-block;
  padding: 0 3px;
  height: 13px;
  line-height: 13px;
  border-radius: 3px;
  color: #fff;
  background: #ef5370;
  font-size: 8px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: -0.2px;
}
</style>
