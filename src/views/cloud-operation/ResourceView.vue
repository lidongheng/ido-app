<template>
  <div class="dashboard-page">
    <card-layout
      title="运营概览(公有云)"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card
        :metrics="overviewData"
        :loading="overviewLoading"
        :showRatio="true"
      />
    </card-layout>
    <card-layout
      title="智算"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card
        :metrics="intelligentData"
        :defaultExpanded="true"
        :loading="xpuLoading"
        :showRatio="true"
      >
        <div class="tree-expand">
          <CardTree :data="intelligentChildren" :cardHeight="74"></CardTree>
          <div class="card-list">
            <metric-card
              v-for="item in intelligentChildren"
              :key="item.title"
              :title="item.title"
              :iconName="item.iconName"
              :metrics="item.metrics"
              :compact="true"
              :loading="xpuLoading"
            ></metric-card>
          </div>
        </div>
      </metric-card>
    </card-layout>
    <card-layout
      title="通算"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card
        :metrics="generalData"
        :defaultExpanded="true"
        :loading="generalLoading"
        :showRatio="true"
      >
        <div class="tree-expand">
          <CardTree :data="generalChildren" :cardHeight="74"></CardTree>
          <div class="card-list">
            <metric-card
              v-for="item in generalChildren"
              :key="item.title"
              :title="item.title"
              :iconName="item.iconName"
              :metrics="item.metrics"
              :compact="true"
              :loading="generalLoading"
            ></metric-card>
          </div>
        </div>
        <span v-if="!generalLoading" class="placeholder-box">...</span>
      </metric-card>
    </card-layout>
  </div>
</template>

<script setup>
import { computed, toRef } from 'vue';
import CardLayout from '@/components/card-layout/index.vue';
import CardTree from '@/components/cloud-operation/CardTree.vue';
import MetricCard from '@/components/cloud-operation/MetricCard.vue';
import {
  useResourceOverview,
  overviewLoading,
  xpuLoading,
  generalLoading,
  resourceOverviewData,
  resourceGeneralData,
  resourceXpuData,
} from './useResourceOverview.js';
import {
  formatNumToLocalStringAndFixed,
  formatterValue,
  formatRateValue,
} from '@/utils/formatFunction';

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

const filters = toRef(props, 'filters');
useResourceOverview(filters);

const getFormatterValue = (value, gap = 1, fixed = 2) => {
  return formatNumToLocalStringAndFiexd(formatterValue(value, gap), fixed);
};

const overviewData = computed(() => {
  return [
    {
      label: '服务器',
      value: getFormatterValue(
        resourceOverviewData.value.totalGyyServersCnt,
        10000,
      ),
      unit: '万台',
      ratio: formatterValue(
        resourceOverviewData.value.totalGyyServersCntMom,
        10000,
      ),
      iconName: 'overview-icon-1',
    },
    {
      label: '超节点',
      value: getFormatterValue(resourceOverviewData.value.superNodeCnt, 1, 0),
      unit: '个',
      ratio: formatterValue(resourceOverviewData.value.superNodeCntMom, 1, 0),
      iconName: 'overview-icon-2',
    },
    {
      label: '资产在线率',
      value: formatRateValue(resourceOverviewData.value.onlineRate),
      unit: '%',
      ratio: formatRateValue(resourceOverviewData.value.onlineRateMom),
      iconName: 'overview-icon-3',
    },
  ];
});

const xpuData = computed(() => {
  return [
    {
      label: '智算卡数',
      value: getFormatterValue(resourceXpuData.value.smartCardNum, 10000),
      unit: '万卡',
      ratio: formatterValue(resourceXpuData.value.smartCardNumMon, 100000),
      iconName: 'ai-icon-1',
    },
    {
      label: '卡时使用率',
      value: formatRateValue(resourceXpuData.value.useRateHour),
      unit: '%',
      ratio: formatRateValue(resourceXpuData.value.useRateHourMom),
      iconName: 'ai-icon-2',
    },
  ];
});

const xpuChildren = computed(() => {
  return [
    {
      title: 'Token模式',
      iconName: 'build-icon-1',
      metrics: [
        {
          label: 'Token卡数',
          value: getFormatterValue(resourceXpuData.value.tokenCardTotal, 10000),
          unit: '万卡',
        },
      ],
    },
    {
      label: '日Token数',
      value: getFormatterValue(resourceXpuData.value.tokenCardNumD, 1000000000),
      unit: '亿',
    },
    {
      label: 'Token利用率',
      value: formatRateValue(resourceXpuData.value.tokenUseRate),
      unit: '%',
    },
    {
      title: '算力模式',
      iconName: 'build-icon-1',
      metrics: [
        {
          label: '算力卡数',
          value: getFormatterValue(
            resourceXpuData.value.computerCardNum,
            10000,
          ),
          unit: '万卡',
        },
        {
          label: '内部客户',
          value: getFormatterValue(
            resourceXpuData.value.internalCustomer,
            10000,
          ),
          unit: '万卡',
        },
        {
          label: '外部客户',
          value: getFormatterValue(
            resourceXpuData.value.externalCustomer,
            10000,
          ),
          unit: '万台',
        },
      ],
    },
  ];
});

const generalData = computed(() => {
  return [
    {
      label: '通算服务器',
      value: getFormatterValue(resourceGeneralData.value.totalPmCnt, 10000),
      unit: '万台',
      ratio: formatterValue(resourceGeneralData.value.totalPmCntMom, 10000),
      iconName: 'general-icon-1',
    },
    {
      label: '运营总量',
      value: getFormatterValue(
        resourceGeneralData.value.operationTotalQty,
        10000,
      ),
      unit: '万核',
      ratio: formatterValue(
        resourceGeneralData.value.operationTotalQtyMom,
        10000,
      ),
      iconName: 'general-icon-2',
    },
  ];
});

const generalChildren = computed(() => {
  return [
    {
      title: 'ECS',
      iconName: 'build-icon-1',
      metrics: [
        {
          label: '服务器',
          value: getFormatterValue(
            resourceGeneralData.value.ecsTotalPmCnt,
            10000,
          ),
          unit: '万台',
        },
        {
          label: '运营总量',
          value: getFormatterValue(
            resourceGeneralData.value.ecsOperationTotalQty,
            10000,
          ),
          unit: '万核',
        },
      ],
    },
    {
      title: 'EVS',
      iconName: 'build-icon-1',
      metrics: [
        {
          label: '服务器',
          value: getFormatterValue(
            resourceGeneralData.value.evsTotalPmCnt,
            10000,
          ),
          unit: '万卡',
        },
        {
          label: '逻辑总量',
          value: getFormatterValue(
            resourceGeneralData.value.evsOperationTotalQty,
            1024,
          ),
          unit: 'PB',
        },
        {
          label: '使用率',
          value: formatRateValue(resourceGeneralData.value.evsUsageRate),
          unit: '%',
        },
      ],
    },
    {
      title: 'OBS',
      iconName: 'build-icon-1',
      metrics: [
        {
          label: '服务器',
          value: getFormatterValue(
            resourceGeneralData.value.obsTotalPmCnt,
            10000,
          ),
          unit: '万卡',
        },
        {
          label: 'HDD逻辑总量',
          value: getFormatterValue(
            resourceGeneralData.value.obsOperationTotalQty,
            1024,
          ),
          unit: 'PB',
        },
        {
          label: 'HDD日分配率',
          value: formatRateValue(resourceGeneralData.value.obsDistributionRate),
          unit: '%',
        },
      ],
    },
  ];
});
</script>

<style lang="less" scoped>
.dashboard-page {
  padding: 8px;
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
</style>
