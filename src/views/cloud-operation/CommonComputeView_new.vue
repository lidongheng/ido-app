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
        metricType="GeneralMetricItem"
        :loading="false"
        :failed="false"
        :showRatio="true"
      />
    </card-layout>
    <div class="general-content">
      <el-affix :offset="80" class="btn-box">
        <div class="btn-list">
          <div
            class="btn-item"
            v-for="item in btnList"
            :key="item"
            :class="{ active: activeBtn === item }"
            @click="activeBtn = item"
          >
            {{ item }}
          </div>
        </div>
      </el-affix>
      <div class="content-box">
        <metric-card
          :metrics="totalData"
          metricType="GeneralCommonItem"
          :loading="false"
          :failed="false"
          :showRatio="true"
        />
        <div class="card-title">
          <span class="blue-line"></span>
          <span class="card-title-text">客户资源</span>
        </div>
        <CustomerResourcesTrend></CustomerResourcesTrend>
        <div class="custome-list">
          <div
            class="custome-item"
            v-for="item in customerList"
            :key="item"
            :class="{ active: activeCustomer === item }"
            @click="activeCustomer = item"
          >
            {{ item }}
          </div>
        </div>
        <common-table title="总量排行榜"></common-table>
        <common-table title="增量排行榜"></common-table>
        <common-table title="掉量排行榜"></common-table>
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
        ></metric-card>
        <div class="card-title">
          <span class="card-title-text">国内</span>
        </div>
        <RegionPie></RegionPie>
        <common-table title="流量高地"></common-table>
        <common-table title="资源中心"></common-table>
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
        ></metric-card>
        <div class="card-title">
          <span class="card-title-text">海外</span>
        </div>
        <RegionPie></RegionPie>
        <overseas-table></overseas-table>
      </div>
    </card-layout>
  </div>
</template>

<script setup>
import { computed, toRef, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CardLayout from '@/components/card-layout/index.vue';
import MetricCard from '@/components/cloud-operation/MetricCard.vue';
import {
  useCommonComputeOverview,
  btnList,
  activeBtn,
  customerList,
  activeCustomer,
} from './useCommonComputeOverview.js';
import {
  formatNumToLocalStringAndFixed,
  formatterValue,
  formatRateValue,
} from '@/utils/formatFunction';
import CustomerResourcesTrend from '@/components/cloud-operation/common-computed/CustomerResourcesTrend.vue';
import RegionPie from '@/components/cloud-operation/common-computed/RegionPie.vue';
import CommonTable from '@/components/cloud-operation/common-computed/CommonTable.vue';
import OverseasTable from '@/components/cloud-operation/common-computed/OverseasTable.vue';
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

.custom-list {
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(246, 246, 246, 1);
}

.custom-item {
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

.custom-item.active {
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
