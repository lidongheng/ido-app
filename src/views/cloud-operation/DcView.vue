<template>
  <div class="dashboard-page">
    <card-layout
      title="DC概览"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card :metrics="overviewData" :loading="loading" :failed="failed" />
    </card-layout>
    <card-layout
      title="运营概览"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <div class="flex-columns">
        <DcCardItem
          title="规划"
          :data="planningData"
          :showSubBar="true"
          barBg="#eeeeee"
          subBarBg="#f5f5f5"
          :loading="loading"
          :failed="failed"
        ></DcCardItem>
        <DcCardItem
          title="建成"
          :data="buildingData"
          :loading="loading"
          :failed="failed"
        ></DcCardItem>
        <DcCardItem
          v-if="isAllDataCentersSelected"
          title="使用"
          :data="useData"
          :loading="loading"
          :failed="failed"
        ></DcCardItem>
      </div>
    </card-layout>
  </div>
</template>

<script setup>
import { computed, toRef } from 'vue';
import CardLayout from '@/components/card-layout/index.vue';
import MetricCard from '@/components/cloud-operation/MetricCard.vue';
import DcCardItem from '@/components/cloud-operation/DcCardItem.vue';
import { useDcOverview, loading, failed, dcData } from './useDcOverview.js';
import {
  formatNumToLocalStringAndFiexd,
  formatterValue
} from '@/utils/formatFunction';

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

const filters = toRef(props, 'filters');
useDcOverview(filters);

const getFormatterValue = (value, gap = 1, fixed = 2) => {
  return formatNumToLocalStringAndFiexd(formatterValue(value, gap), fixed);
};

const isAllDataCentersSelected = computed(() => {
  return (
    !filters.value.insideOutsideList?.length &&
    !filters.value.areaNameList?.length &&
    !filters.value.cityNameList?.length &&
    !filters.value.campusNameList?.length
  );
});

const overviewData = computed(() => {
  return [
    {
      label: '投产园区',
      value: getFormatterValue(dcData.value.inProductCampusNum, 1, 0),
      unit: '个',
      iconName: 'dc-icon-1'
    },
    {
      label: '投产DC',
      value: getFormatterValue(dcData.value.inProductDcNum, 1, 0),
      unit: '个',
      iconName: 'dc-icon-2'
    },
    {
      label: '已建机电',
      value: getFormatterValue(dcData.value.totalCompleteRack, 1, 0),
      unit: '柜',
      iconName: 'dc-icon-3'
    }
  ];
});

const planningData = computed(() => {
  return [
    {
      label: '土地',
      subLabel: '提前储备',
      name: '土地',
      value: getFormatterValue(dcData.value.totalPlannedLandArea, 1, 0),
      subName: "",
      subValue: 0,
      subBarWidth: 0,
      unit: '亩',
      iconName: 'dc-over-icon-1'
    },
    {
      label: '楼栋',
      subLabel: '楼宇先行',
      name: '已建成',
      value: getFormatterValue(dcData.value.totalCompleteBuild, 1, 0),
      subName: '在建',
      subValue: getFormatterValue(dcData.value.underConstruction, 1, 0),
      subBarWidth: 60,
      unit: '栋',
      iconName: 'dc-over-icon-2'
    },
  ];
});

const buildingData = computed(() => {
  return [
    {
      label: '机电',
      subLabel: '滚动交付',
      name: '已建机电',
      value: getFormatterValue(dcData.value.totalCompleteRack, 1, 0),
      subName: "",
      subValue: 1, // 占位
      subBarWidth: 70,
      unit: '机柜',
      iconName: 'dc-over-icon-3'
    },
    {
      label: '机柜',
      subLabel: '按需部署',
      name: '已部署服务器',
      value: getFormatterValue(dcData.value.totalDeployRack, 1, 0),
      subName: "",
      subValue: 1, // 占位
      subBarWidth: 80,
      unit: '机柜',
      iconName: 'dc-over-icon-4'
    }
  ];
});

const useData = computed(() => {
  return [
    {
      label: '服务器',
      subLabel: "",
      name: '通算',
      value: getFormatterValue(dcData.value.inUsePmNum, 1, 0),
      unit: '台',
      name2: '智算',
      value2: getFormatterValue(dcData.value.inUseCardNum, 1, 0),
      unit2: '卡',
      subName: "",
      subValue: 1, // 占位
      subBarWidth: 90,
      iconName: 'dc-over-icon-5'
    },
    {
      label: '客户',
      subLabel: "",
      name: '已用',
      value: getFormatterValue(dcData.value.inUseCustomerPmNum, 1, 0),
      unit: '台',
      name2: '已用',
      value2: getFormatterValue(dcData.value.inUseCustomerCardNum, 1, 0),
      unit2: '卡',
      subName: "",
      subValue: 1, // 占位
      subBarWidth: 90,
      iconName: 'dc-over-icon-6'
    },
  ];
});
</script>

<style lang="less" scoped>
.dashboard-page {
  padding: 8px;
  background: rgba(248, 248, 248, 1);
}

.flex-columns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
