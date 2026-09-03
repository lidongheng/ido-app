import { ref, watch } from 'vue';
import {
  formatNumToLocalStringAndFiexd,
  formatRateValue,
  toBillion,
  toWan,
} from '@/utils/index.js';
import api from '@/api/index.js';
import { CLOUD_OPERATION_METRIC_DESCRIPTIONS } from '@/data/cloudOperationMetricDescriptions.js';

const CARD_MODEL_COLORS = {
  A5: '#12bca8',
  A3: '#6857dd',
  A2: '#2d9be6',
};

const tableConfig = {
  size: 'small',
};

function formatPercent(value) {
  return `${formatRateValue(value)}%`;
}

function createCardDetails(item, id) {
  return [
    { id: `${id}-1`, label: '当前总量', value: `${formatNumToLocalStringAndFiexd(item.operationsTotal, 0)}卡` },
    { id: `${id}-2`, label: '年度计划', value: `${formatNumToLocalStringAndFiexd(item.yearPlan, 0)}卡` },
    { id: `${id}-3`, label: '年度新增', value: `${formatNumToLocalStringAndFiexd(item.yearAddTotal, 0)}卡` },
    { id: `${id}-4`, label: '当前利用率', value: formatPercent(item.cardTimeUseRate) },
  ];
}

function createDetailParams(filters, row) {
  const params = {
    date: filters.date,
    cardModelList: [],
    customerCategoryL1List: [],
    regionIdList: [],
    regionNameList: [],
    detailType: row.detailType,
  };

  if (row.detailType === 'card') {
    params.cardModelList = [row.cardModel];
  }

  if (row.detailType === 'customer') {
    params.customerCategoryL1List = [row.customerCategoryL1];
  }

  if (row.detailType === 'region') {
    params.regionIdList = [row.regionId];
    params.regionNameList = [row.regionName];
  }

  return params;
}

function createDrawerRows(data) {
  return data.map((item, index) => {
    return {
      id: `ai-detail-${index}`,
      computePower: item.computePower,
      maosPoolName: item.maosPoolName,
      clusterId: item.clusterId,
      cardModel: item.cardModel,
      total: toWan(item.operationsTotal),
      assigned: formatNumToLocalStringAndFiexd(item.allocationTotal, 0),
      usage: formatPercent(item.cardTimeUseRate),
      coreUsage: formatPercent(item.aiCoreUtilization),
    };
  });
}

function createRegionDistribution(regionList) {
  const distribution = regionList
    .map((item) => {
      return {
        region: item.regionName,
        num: item.operationsTotal,
        percent: item.operationsTotalScale,
      };
    })
    .sort((a, b) => b.num - a.num);
  const mainDistribution = distribution.slice(0, 4);
  const otherDistribution = distribution.slice(4);

  if (otherDistribution.length === 0) {
    return mainDistribution;
  }

  // Region 饼图只展示前四项，其余数据合并为“其他”。
  const otherItem = {
    region: '其他',
    num: otherDistribution.reduce((sum, item) => sum + item.num, 0),
    percent: otherDistribution.reduce((sum, item) => sum + item.percent, 0),
  };

  return [...mainDistribution, otherItem];
}

export function useAiCompute(filters) {
  const drawerDetailType = ref('card');
  const drawerVisible = ref(false);
  const drawerTitle = ref('智算详情');
  const drawerRows = ref([]);
  const xpuLoading = ref(true);
  const xpuFailed = ref(false);
  const tokenLoading = ref(true);
  const tokenFailed = ref(false);
  // 筛选快速切换时只允许最后一次请求更新页面，避免旧响应覆盖新筛选结果。
  let xpuRequestSequence = 0;
  let tokenRequestSequence = 0;

  const overviewMetrics = ref([]);

  const cardDistribution = ref([]);
  const cardColumns = [
    { prop: 'name', label: '类型', width: 90, align: 'left', showSlot: true },
    { prop: 'cards', label: '卡数', minWidth: 92, align: 'right' },
    { prop: 'plan', label: '年度计划', minWidth: 90, align: 'right' },
    { prop: 'increase', label: '年度新增', minWidth: 90, align: 'right' },
  ];

  const cardRows = ref([]);

  const efficiencyMetrics = ref([]);

  const efficiencyColumns = [
    { prop: 'name', label: '卡类型', width: 72, align: 'left', showSlot: true },
    { prop: 'total', label: '总卡数\n(万卡)', minWidth: 70, align: 'right' },
    { prop: 'assigned', label: '已分配\n(卡)', minWidth: 70, align: 'right' },
    { prop: 'e2e', label: 'E2E卡时\n分配率', minWidth: 78, align: 'right' },
    { prop: 'usage', label: '卡时使\n用率', minWidth: 72, align: 'right' },
    { prop: 'coreUsage', label: 'AI Core\n利用率', minWidth: 78, align: 'right' },
  ];

  const efficiencyRows = ref([]);

  const customerDistribution = ref([]);
  const customerColumns = [
    { prop: 'name', label: '客户分类', width: 105, align: 'left', showSlot: true },
    { prop: 'total', label: '卡数\n(卡)', minWidth: 55, align: 'right', sortable: true },
    { prop: 'increase', label: '年度增量', minWidth: 60, align: 'right', sortable: true },
    { prop: 'usage', label: '卡时使用率', minWidth: 65, align: 'right', sortable: true },
    { prop: 'coreUsage', label: 'AI Core利用率', minWidth: 65, align: 'right', sortable: true },
  ];

  const customerRows = ref([]);

  const regionDistribution = ref([]);
  const regionColumns = [
    { prop: 'name', label: 'Region', width: 105, align: 'left', showSlot: true },
    { prop: 'total', label: '卡数\n(卡)', minWidth: 60, align: 'right' },
    { prop: 'assigned', label: '已分配\n(卡)', minWidth: 60, align: 'right' },
    { prop: 'usage', label: '卡时使用率', minWidth: 60, align: 'right' },
    { prop: 'coreUsage', label: 'AI Core利用率', minWidth: 65, align: 'right' },
  ];

  const regionRows = ref([]);

  const tokenMetrics = ref([]);

  const tokenColumns = [
    { prop: 'name', label: '模型', width: 90, align: 'left' },
    { prop: 'cards', label: '卡数', minWidth: 65, align: 'right', sortable: true },
    { prop: 'daily', label: '日Token数', minWidth: 82, align: 'right', sortable: true },
    { prop: 'usage', label: 'Token利用率', minWidth: 88, align: 'right', sortable: true },
  ];

  const tokenRows = ref([]);

  function clearXpuData() {
    overviewMetrics.value = [];
    cardDistribution.value = [];
    cardRows.value = [];
    efficiencyMetrics.value = [];
    efficiencyRows.value = [];
    customerDistribution.value = [];
    customerRows.value = [];
    regionDistribution.value = [];
    regionRows.value = [];
  }

  function setXpuData(data) {
    const overview = data.xpuOverview;

    overviewMetrics.value = [
      { label: '总卡数', value: toWan(overview.operationsTotal), unit: '万卡', iconName: '', help: false },
      { label: '年度计划', value: toWan(overview.yearPlan), unit: '万卡', iconName: '', help: false },
      { label: '年度新增', value: toWan(overview.yearAddTotal), unit: '万卡', iconName: '', help: false },
      { label: '已分配', value: toWan(overview.allocationTotal), unit: '万卡', iconName: '', help: false },
    ];
    efficiencyMetrics.value = [
      { label: 'E2E卡时分配率', value: formatRateValue(overview.e2eCardHourRate), unit: '%', icon: 'apps-o', help: true, helpText: CLOUD_OPERATION_METRIC_DESCRIPTIONS.e2eCardHourRate },
      { label: '卡时利用率', value: formatRateValue(overview.cardHourRate), unit: '%', icon: 'clock-o', help: true, helpText: CLOUD_OPERATION_METRIC_DESCRIPTIONS.cardHourRate },
      { label: 'AI Core利用率', value: formatRateValue(overview.aiCoreRate), unit: '%', icon: 'chart-trending-o', help: true, helpText: CLOUD_OPERATION_METRIC_DESCRIPTIONS.aiCoreRate },
    ];
    cardDistribution.value = data.cardModelList.map((item) => {
      return {
        region: item.cardModelName,
        num: item.operationsTotal,
        percent: item.operationsTotalScale,
      };
    });
    cardRows.value = data.cardModelList.map((item, index) => {
      return {
        id: `card-${index}`,
        name: item.cardModelName,
        color: CARD_MODEL_COLORS[item.cardModel],
        cards: formatNumToLocalStringAndFiexd(item.operationsTotal, 0),
        plan: formatNumToLocalStringAndFiexd(item.yearPlan, 0),
        increase: formatNumToLocalStringAndFiexd(item.yearAddTotal, 0),
      };
    });
    efficiencyRows.value = data.cardModelList.map((item, index) => {
      const id = `eff-${index}`;

      return {
        id,
        name: item.cardModelName,
        cardModel: item.cardModel,
        detailType: 'card',
        total: toWan(item.operationsTotal),
        assigned: formatNumToLocalStringAndFiexd(item.allocationTotal, 0),
        e2e: formatPercent(item.e2eCardTimeUseRate),
        usage: formatPercent(item.cardTimeUseRate),
        coreUsage: formatPercent(item.aiCoreUtilization),
        drawerValue: formatPercent(item.cardTimeUseRate),
        details: createCardDetails(item, id),
      };
    });
    customerDistribution.value = data.customerList.map((item) => {
      return {
        region: item.customerCategoryL1,
        num: item.operationsTotal,
        percent: item.operationsTotalScale,
      };
    });
    customerRows.value = data.customerList.map((item, index) => {
      return {
        id: `customer-${index}`,
        name: item.customerCategoryL1,
        customerCategoryL1: item.customerCategoryL1,
        detailType: 'customer',
        total: formatNumToLocalStringAndFiexd(item.operationsTotal, 0),
        increase: formatNumToLocalStringAndFiexd(item.yearAddTotal, 0),
        usage: formatPercent(item.cardTimeUseRate),
        coreUsage: formatPercent(item.aiCoreUtilization),
      };
    });
    regionDistribution.value = createRegionDistribution(data.regionList);
    regionRows.value = data.regionList.map((item, index) => {
      return {
        id: `region-${index}`,
        name: item.regionName,
        regionId: item.regionId,
        regionName: item.regionName,
        detailType: 'region',
        total: formatNumToLocalStringAndFiexd(item.operationsTotal, 0),
        assigned: formatNumToLocalStringAndFiexd(item.allocationTotal, 0),
        usage: formatPercent(item.cardTimeUseRate),
        coreUsage: formatPercent(item.aiCoreUtilization),
      };
    });
  }

  function clearTokenData() {
    tokenMetrics.value = [];
    tokenRows.value = [];
  }

  function setTokenData(data) {
    const overview = data.tokenOverview;

    tokenMetrics.value = [
      { label: 'Token卡数', value: toWan(overview.tokenCardTotal), unit: '万卡', help: false },
      { label: '日Token数', value: toBillion(overview.dayTokenTotal), unit: '亿', help: false },
      { label: 'Token利用率', value: formatRateValue(overview.tokenUtilization), unit: '%', help: false },
    ];
    tokenRows.value = data.modelList.map((item, index) => {
      return {
        id: `token-${index}`,
        name: item.model,
        cards: formatNumToLocalStringAndFiexd(item.tokenCardTotal, 0),
        daily: toBillion(item.dayTokenTotal),
        usage: formatPercent(item.tokenUtilization),
      };
    });
  }

  async function loadXpuData() {
    const requestSequence = ++xpuRequestSequence;

    xpuLoading.value = true;
    xpuFailed.value = false;
    clearXpuData();

    try {
      const response = await api.operate.getAiComputeOverview(filters.value);

      if (requestSequence !== xpuRequestSequence) {
        return;
      }

      if (response.status === 200) {
        setXpuData(response.data);
      }
    } catch (error) {
      if (requestSequence !== xpuRequestSequence) {
        return;
      }

      xpuFailed.value = true;
      console.error('智算概览接口请求失败:', error);
    } finally {
      if (requestSequence === xpuRequestSequence) {
        xpuLoading.value = false;
      }
    }
  }

  async function loadTokenData() {
    const requestSequence = ++tokenRequestSequence;

    tokenLoading.value = true;
    tokenFailed.value = false;
    clearTokenData();

    try {
      const response = await api.operate.getAiComputeTokenOverview(filters.value);

      if (requestSequence !== tokenRequestSequence) {
        return;
      }

      if (response.status === 200) {
        setTokenData(response.data);
      }
    } catch (error) {
      if (requestSequence !== tokenRequestSequence) {
        return;
      }

      tokenFailed.value = true;
      console.error('Token 概览接口请求失败:', error);
    } finally {
      if (requestSequence === tokenRequestSequence) {
        tokenLoading.value = false;
      }
    }
  }

  watch(
    filters,
    () => {
      loadXpuData();
      loadTokenData();
    },
    { deep: true, immediate: true }
  );

  async function openDetail(row) {
    drawerDetailType.value = row.detailType;
    drawerTitle.value = `${row.name}资源池详情`;
    drawerRows.value = [];
    drawerVisible.value = true;

    try {
      const params = createDetailParams(filters.value, row);
      const response = await api.operate.getAiComputeDetail(params);

      if (response.status === 200) {
        drawerRows.value = createDrawerRows(response.data);
      }
    } catch (error) {
      console.error('智算详情接口请求失败:', error);
    }
  }

  return {
    cardColumns,
    cardDistribution,
    cardRows,
    customerColumns,
    customerDistribution,
    customerRows,
    drawerDetailType,
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
    regionRows,
    tableConfig,
    tokenColumns,
    tokenFailed,
    tokenLoading,
    tokenMetrics,
    tokenRows,
    xpuFailed,
    xpuLoading,
  };
}
