<template>
  <split-panel
    :title="sideTitle"
    :is-expanded="shouldSplit"
    :watch-resize="true"
    main-width="50%"
    @close-side="closeRegionDetail"
  >
    <template #main>
      <div class="p10">
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
            :showRatio="false"
          />
          <metric-card
            class="mgt8"
            :metrics="overviewData2"
            :loading="overviewLoading"
            :failed="overviewFailed"
            :showRatio="false"
          />
        </card-layout>
        <card-layout title="趋势分析" :show-blue-line="true" :show-nav="false" :show-help="false">
          <skeleton :loading="overviewLoading" :height="200">
            <region-trend-analysis unit="亿元" :trendData="regionViewData.trend" />
          </skeleton>
        </card-layout>
        <card-layout
          title="国内 Region 经营详情"
          :show-blue-line="true"
          :show-nav="false"
          :show-help="false"
        >
          <skeleton :loading="overviewLoading" :height="200">
            <table-list
              :tableConfig="tableConfig"
              :showTableRow="5"
              :tableColumn="tableColumn"
              :tableData="insideRegionData"
            >
              <template #regionName="{ scope }">
                <span class="text-link" @click="openRegionDetail(scope.row, '国内 Region 经营详情')">{{ scope.row.regionName }}</span>
              </template>
              <template #status="{ scope }">
                <el-tooltip placement="top" effect="light">
                  <template #content>
                    <status-tooltip />
                  </template>
                  <div class="status-crice" :class="[scope.row.status]"></div>
                </el-tooltip>
              </template>
            </table-list>
          </skeleton>
        </card-layout>
        <card-layout
          title="海外 Region 经营详情"
          :show-blue-line="true"
          :show-nav="false"
          :show-help="false"
        >
          <skeleton :loading="overviewLoading" :height="200">
            <table-list
              :tableConfig="tableConfig"
              :showTableRow="5"
              :tableColumn="tableColumn"
              :tableData="outsideRegionData"
            >
              <template #regionName="{ scope }">
                <span class="text-link" @click="openRegionDetail(scope.row, '海外 Region 经营详情')">{{ scope.row.regionName }}</span>
              </template>
              <template #status="{ scope }">
                <el-tooltip placement="top" effect="light">
                  <template #content>
                    <status-tooltip />
                  </template>
                  <div class="status-crice" :class="[scope.row.status]"></div>
                </el-tooltip>
              </template>
            </table-list>
          </skeleton>
        </card-layout>
      </div>
    </template>

    <template #side>
      <inline-region-detail
        v-if="selectedRegion"
        :region-id="selectedRegion"
        @close="closeRegionDetail"
      />
    </template>
  </split-panel>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import CardLayout from '@/components/card-layout/index.vue';
import MetricCard from '@/components/cloud-operation/MetricCard.vue';
import TableList from '@/components/cloud-operation/TableList.vue';
import SplitPanel from '@/components/split-panel/index.vue';
import InlineRegionDetail from '@/components/cloud-operation/InlineRegionDetail.vue';
import { isFoldScreenExpanded } from '@/composables/useFoldableScreen';
import {
  valueToYi,
  formatRateValue,
  floatToWan,
  valueToWan,
  formatNumToLocalStringAndFiexd,
  formatValueRateM,
} from '@/utils/index';
import RegionTrendAnalysis from '@/components/region-view/RegionTrendAnalysis.vue';
import {
  useRegionView,
  regionViewData,
  overviewFailed,
  overviewLoading,
  sortArrayByMetric,
  tableConfig,
} from './useRegionView';
import StatusTooltip from '@/components/region-view/StatusTooltip.vue';
import skeleton from '@/components/skeleton/index.vue';

const router = useRouter();

useRegionView();

// 选中的 Region 标识
const selectedRegion = ref(null);
// 折叠屏展开状态（响应式）
const isExpanded = ref(isFoldScreenExpanded());

// 折叠屏展开且已选择 Region 时启用右侧详情，并确保传给组件的是布尔值。
const shouldSplit = computed(() => {
  return Boolean(selectedRegion.value && isExpanded.value);
});

// 折叠屏开合会触发 resize，及时同步 Region 详情的展示方式。
const handleResize = () => {
  const newExpanded = isFoldScreenExpanded();
  if (isExpanded.value !== newExpanded) {
    isExpanded.value = newExpanded;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// 打开 Region 详情
const sideTitle = ref('');
const openRegionDetail = (row, title) => {
  // 点击时检测是否为折叠屏展开状态
  if (isFoldScreenExpanded()) {
    sideTitle.value = title;
    // 折叠屏展开状态：在右侧内联展示
    selectedRegion.value = row.regionId;
  } else {
    // 非展开状态：跳转到详情页
    router.push({
      name: 'RegionDetail',
      params: {
        regionId: row.regionId,
      },
    });
  }
};

// 关闭 Region 详情
const closeRegionDetail = () => {
  selectedRegion.value = null;
};

const overviewData = computed(() => {
  const businessOverview = regionViewData.value?.businessOverview ?? {};
  return [
    {
      label: 'Region',
      value: businessOverview.region ?? '--',
      unit: '个',
      iconName: 'region-ov1',
    },
    {
      label: '在线服务器',
      value: floatToWan(businessOverview.server, 'dc', 2),
      unit: '万台',
      iconName: 'region-ov2',
    },
  ];
});

const overviewData2 = computed(() => {
  const businessOverview = regionViewData.value?.businessOverview ?? {};
  return [
    {
      label: '年度销毛额',
      value: valueToYi(businessOverview.valueY),
      unit: '亿元(RMB)',
      iconName: 'region-ov3',
      showList: true,
      list: [
        {
          label: '环比增长量',
          value: valueToYi(businessOverview.valueIncreaseY),
          unit: '亿元',
        },
        {
          label: '销毛率',
          value: formatRateValue(businessOverview.valueRateY, 1),
          unit: '%',
        },
        {
          label: '收入',
          value: valueToYi(businessOverview.incomeY),
          unit: '亿元',
        },
        {
          label: '成本',
          value: valueToYi(businessOverview.costY),
          unit: '亿元',
        },
      ],
    },
    {
      label: '月度销毛额',
      value: valueToYi(businessOverview.valueM),
      unit: '亿元(RMB)',
      iconName: 'region-ov3',
      showList: true,
      list: [
        {
          label: '环比增长量',
          value: valueToYi(businessOverview.valueIncreaseM),
          unit: '亿元',
        },
        {
          label: '销毛率',
          value: formatRateValue(businessOverview.valueRateM, 1),
          unit: '%',
        },
        {
          label: '收入',
          value: valueToYi(businessOverview.incomeY),
          unit: '亿元',
        },
        {
          label: '成本',
          value: valueToYi(businessOverview.costY),
          unit: '亿元',
        },
      ],
    },
  ];
});

const tableColumn = [
  {
    label: 'Region',
    minWidth: 140,
    prop: 'regionName',
    showSlot: true,
    fixed: 'left',
  },
  {
    label: '年度累计指标',
    align: 'center',
    children: [
      {
        label: '销毛率',
        align: 'center',
        prop: 'valueRateY',
        formatterFun: (row, columns, cellValue) => `${formatValueRateM(cellValue)}`,
      },
      {
        label: '经营\n状态',
        width: 60,
        prop: 'status',
        showSlot: true,
        align: 'center',
        tipsComponent: StatusTooltip,
        tooltipConfig: {
          'append-to': 'body',
          effect: 'light',
          placement: 'top',
          trigger: 'click',
        },
      },
      {
        label: '收入\n(万元)',
        align: 'right',
        prop: 'incomeY',
        minWidth: 90,
        formatterFun: (row, columns, cellValue) => `${valueToWan(cellValue, 2)}`,
      },
      {
        label: '成本\n(万元)',
        align: 'right',
        prop: 'costY',
        minWidth: 90,
        formatterFun: (row, columns, cellValue) => `${valueToWan(cellValue, 2)}`,
      },
      {
        label: '分配率',
        align: 'right',
        prop: 'allocationRateY',
        formatterFun: (row, columns, cellValue) => `${formatRateValue(cellValue)}%`,
      },
      {
        label: '在线\n服务器(台)',
        align: 'right',
        prop: 'servers',
        formatterFun: (row, columns, cellValue) => `${formatNumToLocalStringAndFiexd(cellValue, 2)}`,
      },
    ],
  },
  {
    label: '当月指标',
    align: 'center',
    children: [
      {
        label: '销毛率',
        align: 'right',
        prop: 'valueRateM',
        formatterFun: (row, columns, cellValue) => `${formatValueRateM(cellValue)}`,
      },
      {
        label: '收入\n万元',
        align: 'right',
        prop: 'incomeM',
        formatterFun: (row, columns, cellValue) => `${valueToWan(cellValue, 2)}`,
      },
      {
        label: '成本\n万元',
        align: 'right',
        prop: 'costM',
        formatterFun: (row, columns, cellValue) => `${valueToWan(cellValue, 2)}`,
      },
    ],
  },
];

const insideRegionData = computed(() => {
  return sortArrayByMetric(regionViewData.value.insideRegion, 'valueRateY');
});

const outsideRegionData = computed(() => {
  return sortArrayByMetric(regionViewData.value.outsideRegion, 'valueRateY');
});
</script>

<style lang="less" scoped>
.mgt8 {
  margin-top: 8px;
}

.text-link {
  color: #536fdb;
  cursor: pointer;
}

.status-crice {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-crice.success {
  background: #20b486;
}

.status-crice.warning {
  background: #f5a623;
}

.status-crice.danger {
  background: #e85b72;
}
</style>
