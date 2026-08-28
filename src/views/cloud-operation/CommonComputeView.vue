<template>
  <div class="dashboard-view">
    <operation-section title="通算概览">
      <div class="power-overview-card">
        <div class="power-total">
          <strong>{{ powerOverview.value }}</strong>
          <span>{{ powerOverview.label }}</span>
          <div class="power-trend">
            <span v-if="powerOverview.trendPrefix">{{ powerOverview.trendPrefix }}</span>
            <trend-value
              :value="powerOverview.trendValue"
              :direction="powerOverview.trendDirection"
              unit=""
            />
          </div>
        </div>
        <div class="power-bars">
          <div v-for="bar in powerBars" :key="bar.label" class="power-bar-row">
            <span>{{ bar.label }}</span>
            <div class="power-track">
              <i :style="{ width: `${bar.percent}%`, background: bar.color }"></i>
            </div>
            <strong>{{ bar.value }}</strong>
          </div>
        </div>
      </div>
      <segment-tabs v-model="resourceTab" :options="resourceOptions" variant="underline" />
      <indicator-panel :items="resourceMetrics" :columns="3" :bordered="true" />
    </operation-section>

    <operation-section title="客户资源">
      <donut-chart
        :data="customerDistribution"
        :center-value="customerDistributionSummary.value"
        :center-label="customerDistributionSummary.label"
        :height="245"
      />
      <segment-tabs v-model="customerTab" :options="customerOptions" variant="underline" />
      <h3 class="subsection-title">总量排行榜</h3>
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
          <trend-value :value="row.increase" :direction="row.direction" unit="" />
        </template>
      </table-list>

      <div class="subsection-header">
        <h3>增量排行榜</h3>
        <segment-tabs v-model="increasePeriod" :options="periodOptions" variant="block" />
      </div>
      <table-list
        :columns="changeColumns"
        :data="increaseRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #link="{ row }">
          <data-link :text="row.name" @click="openDetail(row)" />
        </template>
        <template #trend="{ row }">
          <trend-value :value="row.value" :direction="row.direction" unit="" />
        </template>
      </table-list>

      <div class="subsection-header">
        <h3>掉量排行榜</h3>
        <segment-tabs v-model="decreasePeriod" :options="periodOptions" variant="block" />
      </div>
      <table-list
        :columns="decreaseChangeColumns"
        :data="decreaseRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #link="{ row }">
          <data-link :text="row.name" @click="openDetail(row)" />
        </template>
        <template #trend="{ row }">
          <trend-value :value="row.value" :direction="row.direction" unit="" />
        </template>
      </table-list>
    </operation-section>

    <operation-section title="国内Region分布">
      <indicator-panel :items="domesticMetrics" :columns="3" :bordered="true" />
      <h3 class="subsection-title">国内</h3>
      <donut-chart
        :data="domesticDistribution"
        :center-value="regionDistributionSummary.value"
        :center-label="regionDistributionSummary.label"
        :height="285"
      />
      <h3 class="subsection-title">流量高地</h3>
      <table-list
        :columns="regionColumns"
        :data="domesticRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #status="{ row }">
          <status-dot :tone="row.status" label="增长状态" />
        </template>
      </table-list>
      <h3 class="subsection-title">资源中心</h3>
      <table-list
        :columns="regionColumns"
        :data="resourceCenterRows"
        row-key="id"
        :default-sort="{}"
        :table-config="tableConfig"
      >
        <template #status="{ row }">
          <status-dot :tone="row.status" label="增长状态" />
        </template>
      </table-list>
    </operation-section>

    <operation-section title="海外Region分布">
      <indicator-panel :items="overseasMetrics" :columns="3" :bordered="true" />
      <h3 class="subsection-title">海外</h3>
      <donut-chart
        :data="overseasDistribution"
        :center-value="regionDistributionSummary.value"
        :center-label="regionDistributionSummary.label"
        :height="250"
      />
      <h3 class="subsection-title">流量高地</h3>
      <table-list
        :columns="overseasColumns"
        :data="overseasRows"
        row-key="id"
        :default-sort="{}"
        :table-config="overseasTableConfig"
      >
        <template #status="{ row }">
          <status-dot :tone="row.status" label="增长状态" />
        </template>
      </table-list>
    </operation-section>

    <div class="bottom-agent-tip">松开，Agent将为你服务...</div>

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
import DataLink from '@/components/cloud-operation/DataLink.vue';
import DetailDrawer from '@/components/cloud-operation/DetailDrawer.vue';
import DonutChart from '@/components/cloud-operation/DonutChart.vue';
import IndicatorPanel from '@/components/cloud-operation/IndicatorPanel.vue';
import OperationSection from '@/components/cloud-operation/OperationSection.vue';
import SegmentTabs from '@/components/cloud-operation/SegmentTabs.vue';
import StatusDot from '@/components/cloud-operation/StatusDot.vue';
import TableList from '@/components/cloud-operation/TableList.vue';
import TrendValue from '@/components/cloud-operation/TrendValue.vue';
import { useCommonCompute } from './useCommonCompute.js';

const {
  changeColumns,
  customerColumns,
  customerDistribution,
  customerDistributionSummary,
  customerOptions,
  customerRows,
  customerTab,
  decreaseChangeColumns,
  decreasePeriod,
  decreaseRows,
  domesticDistribution,
  domesticMetrics,
  domesticRows,
  drawerColumns,
  drawerMetrics,
  drawerRows,
  drawerTitle,
  drawerVisible,
  increasePeriod,
  increaseRows,
  openDetail,
  overseasColumns,
  overseasDistribution,
  overseasMetrics,
  overseasRows,
  overseasTableConfig,
  periodOptions,
  powerBars,
  powerOverview,
  regionColumns,
  regionDistributionSummary,
  resourceCenterRows,
  resourceMetrics,
  resourceOptions,
  resourceTab,
  tableConfig,
} = useCommonCompute();
</script>

<style lang="less" scoped>
.dashboard-view {
  min-height: 100%;
  padding: 14px 10px 24px;
  background: #fff;
}

.power-overview-card {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 12px;
  padding: 12px 10px;
  border: 1PX solid #e5eaf5;
  border-radius: 9px;
}

.power-total {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #353575;
}

.power-total strong {
  font-size: 26px;
  line-height: 30px;
}

.power-total > span {
  color: #77718f;
  font-size: 11px;
}

.power-trend {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  color: #77718f;
}

.power-bars {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.power-bar-row {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) 92px;
  align-items: center;
  gap: 5px;
  color: #6f6a87;
  font-size: 10px;
}

.power-bar-row strong {
  color: #595a8a;
  font-weight: 500;
  text-align: right;
  font-size: 9.5px;
}

.power-track {
  height: 7px;
  overflow: hidden;
  border-radius: 4px;
  background: #eef0f7;
}

.power-track i {
  display: block;
  height: 100%;
  border-radius: inherit;
}

.subsection-title,
.subsection-header h3 {
  color: #35304f;
  font-size: 14px;
  font-weight: 600;
}

.subsection-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
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
