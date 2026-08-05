<template>
  <div class="dashboard-page">
    <card-layout
      title="运营概览(公有云)"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card :metrics="overviewData"/>
    </card-layout>
    <card-layout
      title="智算"
      :show-blue-line="true"
      :show-nav="false"
      :show-help="false"
    >
      <metric-card :metrics="intelligentData" :defaultExpanded="true">
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
      <metric-card :metrics="generalData" :defaultExpanded="true">
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
            ></metric-card>
          </div>
        </div>
      </metric-card>
    </card-layout>
  </div>
</template>

<script setup>
import { computed, ref, toRef, watch } from 'vue';
import CardLayout from '@/components/card-layout/index.vue';
import CardTree from './CardTree.vue';
import MetricCard from '@/components/cloud-operation/MetricCard.vue';
import { useResourceOverview } from './useResourceOverview.js';
import { formatterValue, formatRateValue } from '@/utils/formatFunction';

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const filters = toRef(props, 'filters')
const { loading, errorMessage, pageData } = useResourceOverview(filters)
const overviewData = computed(() => {
  return [
    {
      label: '服务器',
      value: formatterValue(1023453, 10000),
      unit: '万台',
      ratio: formatterValue(-14245, 10000),
      iconName: 'overview-icon-1',
    },
    {
      label: '超节点',
      value: 1892,
      unit: '个',
      ratio: 14,
      iconName: 'overview-icon-2',
    },
    {
      label: '资产在线率',
      value: formatRateValue(0.974772),
      unit: '%',
      ratio: formatRateValue(-0.12245),
      iconName: 'overview-icon-3',
    },
  ];
});

const intelligentData = computed(() => {
  return [
    {
      label: '智算卡数',
      value: formatterValue(1023453, 10000),
      unit: '万卡',
      ratio: formatterValue(-14245, 10000),
      iconName: 'ai-icon-1',
    },
    {
      label: '卡时使用率',
      value: formatRateValue(0.974772),
      unit: '%',
      ratio: formatRateValue(0.12245),
      iconName: 'ai-icon-2',
    },
  ];
});

const intelligentChildren = computed(() => {
  return [
    {
      title: 'Token模式',
      iconName: 'build-icon-1',
      metrics: [
        {
          label: 'Token卡数',
          value: formatterValue(1023453, 10000),
          unit: '万卡',
        },
        {
          label: '日Token数',
          value: 1892,
          unit: '亿',
        },
        {
          label: 'Token利用率',
          value: formatRateValue(0.974772),
          unit: '%',
        },
      ],
    },
    {
      title: '算力模式',
      iconName: 'build-icon-1',
      metrics: [
        {
          label: '算力卡数',
          value: formatterValue(1023453, 10000),
          unit: '万卡',
        },
        {
          label: '内部客户',
          value: formatterValue(1223453, 10000),
          unit: '万卡',
        },
        {
          label: '外部客户',
          value: formatterValue(223453, 10000),
          unit: '万卡',
        },
      ],
    },
  ];
});

const generalData = computed(() => {
  return [
    {
      label: '通算服务器',
      value: formatterValue(1023453, 10000),
      unit: '万台',
      ratio: formatRateValue(14245, 10000),
      iconName: 'general-icon-1',
    },
    {
      label: '运营总量',
      value: formatterValue(7023453, 10000),
      unit: '万核',
      ratio: formatRateValue(245, 10000),
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
          value: formatterValue(1023453, 10000),
          unit: '万卡',
        },
        {
          label: '运营总量',
          value: formatterValue(9923453, 10000),
          unit: '万核',
        },
        {
          label: '分配率',
          value: formatRateValue(0.974772),
          unit: '%',
        },
      ],
    },
    {
      title: 'EVS',
      iconName: 'build-icon-1',
      metrics: [
        {
          label: '服务器',
          value: formatterValue(1023453, 10000),
          unit: '万卡',
        },
        {
          label: '逻辑总量',
          value: formatterValue(9923453, 10000),
          unit: 'TB'
        },
        {
          label: '使用率',
          value: formatRateValue(0.4772),
          unit: '%'
        },
      ],
    },
    {
      title: 'OBS',
      iconName: 'build-icon-1',
      metrics: [
        {
          label: '服务器',
          value: formatterValue(1023453, 10000),
          unit: '万卡'
        },
        {
          label: 'HDD逻辑总量',
          value: formatterValue(9923453, 10000),
          unit: 'TB'
        },
        {
          label: 'HDD日分配率',
          value: formatRateValue(0.772),
          unit: '%'
        }
      ]
    },
  ];
});
</script>

<style lang="less" scoped>
.dashboard-page {
  min-height: calc(100vh - 1.35rem);
  padding: 0.48rem 0.43rem 0.4rem;
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
</style>
