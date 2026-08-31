<template>
  <div class="dashboard-page">
    <card-layout
      title="通算概览"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card
        :metrics="generalData"
        metric-type="GeneralMetricItem"
        :loading="false"
        :failed="false"
        :show-ratio="true"
      />
    </card-layout>

    <div class="btn-box">
      <div class="btn-list">
        <div
          v-for="item in btnList"
          :key="item"
          class="btn-item"
          :class="{ active: activeBtn === item }"
          @click="selectBtn(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <div class="general-content">
      <div class="content-box">
        <metric-card
          :metrics="totalData"
          metric-type="GeneralCommonItem"
          :loading="false"
          :failed="false"
          :show-ratio="true"
        />

        <div class="card-title">
          <span class="blue-line"></span>
          <span class="card-title-text">客户资源</span>
        </div>

        <customer-resources-trend
          :data="customerDistribution"
          :summary="customerDistributionSummary"
        />

        <div class="customer-list">
          <div
            v-for="item in customerList"
            :key="item"
            class="customer-item"
            :class="{ active: activeCustomer === item }"
            @click="selectCustomer(item)"
          >
            {{ item }}
          </div>
        </div>

        <common-table
          title="总量排行榜"
          :columns="customerColumns"
          :rows="customerRows"
          :table-config="tableConfig"
          @open-detail="openDetail"
        />
        <common-table
          title="增量排行榜"
          :columns="changeColumns"
          :rows="increaseRows"
          :table-config="tableConfig"
          @open-detail="openDetail"
        />
        <common-table
          title="掉量排行榜"
          :columns="decreaseColumns"
          :rows="decreaseRows"
          :table-config="tableConfig"
          @open-detail="openDetail"
        />
      </div>
    </div>

    <card-layout
      title="国内 Region 分布"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <div class="flex-column-gap-12">
        <metric-card
          :metrics="domesticData"
          :loading="false"
          :failed="false"
        />
        <div class="card-title">
          <span class="card-title-text">国内</span>
        </div>
        <region-pie
          :data="domesticDistribution"
          :summary="regionDistributionSummary"
          :height="285"
        />
        <common-table
          title="流量高地"
          :columns="regionColumns"
          :rows="domesticRows"
          :table-config="tableConfig"
        />
        <common-table
          title="资源中心"
          :columns="regionColumns"
          :rows="resourceCenterRows"
          :table-config="tableConfig"
        />
      </div>
    </card-layout>

    <card-layout
      title="海外 Region 分布"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <div class="flex-column-gap-12">
        <metric-card
          :metrics="overseasData"
          :loading="false"
          :failed="false"
        />
        <div class="card-title">
          <span class="card-title-text">海外</span>
        </div>
        <region-pie
          :data="overseasDistribution"
          :summary="regionDistributionSummary"
          :height="250"
        />
        <overseas-table
          :columns="overseasColumns"
          :rows="overseasRows"
          :table-config="overseasTableConfig"
        />
      </div>
    </card-layout>

    <detail-drawer
      v-model:visible="drawerVisible"
      :title="drawerTitle"
      :rows="drawerRows"
    />
  </div>
</template>

<script setup>
import CardLayout from '@/components/card-layout/index.vue';
import CommonTable from '@/components/cloud-operation/common-computed/CommonTable.vue';
import CustomerResourcesTrend from '@/components/cloud-operation/common-computed/CustomerResourcesTrend.vue';
import DetailDrawer from '@/components/cloud-operation/DetailDrawer.vue';
import OverseasTable from '@/components/cloud-operation/common-computed/OverseasTable.vue';
import RegionPie from '@/components/cloud-operation/common-computed/RegionPie.vue';
import MetricCard from '@/components/cloud-operation/MetricCard.vue';
import { useCommonComputeOverview } from './useCommonComputeOverview.js';

defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

const {
  activeBtn,
  activeCustomer,
  btnList,
  changeColumns,
  customerColumns,
  customerDistribution,
  customerDistributionSummary,
  customerList,
  customerRows,
  decreaseColumns,
  decreaseRows,
  domesticData,
  domesticDistribution,
  domesticRows,
  drawerRows,
  drawerTitle,
  drawerVisible,
  generalData,
  increaseRows,
  overseasColumns,
  overseasData,
  overseasDistribution,
  overseasRows,
  overseasTableConfig,
  openDetail,
  regionColumns,
  regionDistributionSummary,
  resourceCenterRows,
  selectBtn,
  selectCustomer,
  tableConfig,
  totalData,
} = useCommonComputeOverview();
</script>

<style lang="less" scoped>
.dashboard-page {
  padding: 8px;
  margin-bottom: 20px;
  background: rgba(248, 248, 248, 1);
}

.tree-expand {
  display: flex;
}

.card-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.placeholder-box {
  height: 12px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.general-content {
  position: relative;
  padding: 0px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
}

.btn-box {
  /* top 写在样式中，由 postcss-pxtorem 按不同屏宽转换。 */
  position: sticky;
  z-index: 10;
  top: 0px;
}

.btn-list {
  height: 24px;
  display: flex;
  background: rgba(234, 241, 254, 1);
}

.btn-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  color: rgba(37, 43, 58, 1);
  font-family: 'Microsoft YaHei';
  font-style: Regular;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  background: rgba(234, 241, 254, 1);
}

.btn-item.active {
  border-radius: 8px 8px -8px -8px;
  font-style: Bold;
  font-weight: 700;
  background-color: #fff;
}

.content-box {
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.flex-column-gap-12 {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-title-text {
  color: rgba(37, 43, 58, 1);
  font-family: 'Microsoft YaHei';
  font-style: Bold;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
}

.blue-line {
  width: 4px;
  height: 12px;
  background: #5f7de0;
  border-radius: 4px;
}

.customer-list {
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(246, 246, 246, 1);
}

.customer-item {
  color: rgba(37, 43, 58, 1);
  font-family: 'Microsoft YaHei';
  font-style: Regular;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
  border-bottom: 2px solid #fff;
  padding-bottom: 4px;
}

.customer-item.active {
  color: rgba(37, 43, 58, 1);
  font-family: 'Microsoft YaHei';
  font-style: Bold;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
  border-bottom: 2px solid rgba(94, 124, 224, 1);
}
</style>
