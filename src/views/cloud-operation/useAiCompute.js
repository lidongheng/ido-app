import { ref, watch } from 'vue';
import {
  formatNumToLocalStringAndFiexd,
  formatRateValue,
  toBillion,
  toWan,
} from '@/utils/index.js';
import api from '@/api/index.js';

const CARD_MODEL_COLORS = {
  A5: '#12bca8',
  A3: '#6857dd',
  A2: '#2d9be6',
};

const REGION_ID_BY_NAME = {
  '西南-贵阳一': 'cn-southwest-guiyang-1',
  '华东二': 'cn-east-2',
  '华北-乌兰察布一': 'cn-north-ulanchabu-1',
  '西南-贵阳二零二': 'cn-southwest-guiyang-202',
  '华北三': 'cn-north-3',
};

const tableConfig = {
  size: 'small',
};

function createDetails(prefix, value) {
  return [
    { id: `${prefix}-1`, label: '当前总量', value },
    { id: `${prefix}-2`, label: '年度计划', value: '12,000' },
    { id: `${prefix}-3`, label: '年度新增', value: '3,168' },
    { id: `${prefix}-4`, label: '当前利用率', value: '90.18%' },
  ];
}

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
    date: filters.date.replaceAll('-', ''),
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
      computeType: item.cardModel,
      total: toWan(item.operationsTotal),
      assigned: formatNumToLocalStringAndFiexd(item.allocationTotal, 0),
      usage: formatPercent(item.cardTimeUseRate),
      coreUsage: formatPercent(item.aiCoreUtilization),
    };
  });
}

export function useAiCompute(filters) {
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
  const cardDistributionSummary = ref({
    value: '',
    label: '智算总数(卡)',
  });

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

  const customerDistribution = [
    { name: '外部客户', value: 6.75, displayValue: '6/6.75 %', color: '#2e6fe0' },
    { name: 'YW', value: 27.65, displayValue: '28/27.65 %', color: '#ef8b32' },
    { name: '流程IT', value: 12.5, displayValue: '15万/12.5 %', color: '#48b33e' },
    { name: '终端', value: 31.19, displayValue: '32/31.19 %', color: '#18a4c4' },
  ];
  const customerDistributionSummary = {
    value: '63,511',
    label: '客户数量',
  };

  const customerColumns = [
    { prop: 'name', label: '客户分类', width: 125, align: 'left', showSlot: true },
    { prop: 'total', label: '总卡数\n(万卡)', minWidth: 74, align: 'right', sortable: true },
    { prop: 'increase', label: '年度增量', minWidth: 78, align: 'right', sortable: true },
    { prop: 'usage', label: '卡时使用率', minWidth: 84, align: 'right', sortable: true, showSlot: true },
    { prop: 'coreUsage', label: 'AI Core利用率', minWidth: 92, align: 'right', sortable: true },
  ];

  const customerRows = [
    { id: 'customer-1', name: '流程IT', total: '17.8', increase: '1,232', usage: '90.1%', direction: 'up', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('customer-1', '17.8万卡') },
    { id: 'customer-2', name: '流程IT-基础大模型', total: '17.8', increase: '2,156', usage: '90.1%', direction: 'up', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('customer-2', '17.8万卡') },
    { id: 'customer-3', name: '终端', total: '17.8', increase: '2,156', usage: '90.1%', direction: 'down', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('customer-3', '17.8万卡') },
    { id: 'customer-4', name: 'YW', total: '17.8', increase: '2,156', usage: '90.1%', direction: 'up', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('customer-4', '17.8万卡') },
    { id: 'customer-5', name: '外部客户', total: '17.8', increase: '3,225', usage: '90.1%', direction: 'up', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('customer-5', '17.8万卡') },
    { id: 'customer-6', name: 'Tokens', total: '17.8', increase: '3,225', usage: '90.1%', direction: 'up', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('customer-6', '17.8万卡') },
  ].map((row) => {
    return {
      ...row,
      customerCategoryL1: row.name,
      detailType: 'customer',
    };
  });

  const regionDistribution = [
    { name: '西南-贵阳一', value: 50.1, displayValue: '24万/50.1 %', color: '#2e6fe0' },
    { name: '华东二', value: 13.2, displayValue: '6.4万/13.2 %', color: '#48b33e' },
    { name: '华北-乌兰察布一', value: 11.9, displayValue: '5.8万/11.9 %', color: '#684bdd' },
    { name: '其他', value: 24.8, displayValue: '12万/24.8 %', color: '#18a4c4' },
  ];
  const regionDistributionSummary = {
    value: '463,511',
    label: '智算卡数',
  };

  const regionColumns = [
    { prop: 'name', label: 'Region', width: 145, align: 'left', showSlot: true },
    { prop: 'total', label: '总卡数\n(万卡)', minWidth: 72, align: 'right' },
    { prop: 'assigned', label: '已分配\n(卡)', minWidth: 72, align: 'right' },
    { prop: 'usage', label: '卡时使用率', minWidth: 84, align: 'right' },
    { prop: 'coreUsage', label: 'AI Core利用率', minWidth: 88, align: 'right' },
  ];

  const regionRows = [
    { id: 'ai-region-1', name: '西南-贵阳一', total: '17.8', assigned: '1,232', usage: '90.1%', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('ai-region-1', '17.8万卡') },
    { id: 'ai-region-2', name: '华东二', total: '17.8', assigned: '2,156', usage: '90.1%', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('ai-region-2', '17.8万卡') },
    { id: 'ai-region-3', name: '华北-乌兰察布一', total: '17.8', assigned: '2,156', usage: '90.1%', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('ai-region-3', '17.8万卡') },
    { id: 'ai-region-4', name: '西南-贵阳二零二', total: '17.8', assigned: '2,156', usage: '90.1%', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('ai-region-4', '17.8万卡') },
    { id: 'ai-region-5', name: '华北三', total: '17.8', assigned: '3,225', usage: '90.1%', coreUsage: '89.8%', drawerValue: '17.8万卡', details: createDetails('ai-region-5', '17.8万卡') },
  ].map((row) => {
    return {
      ...row,
      regionId: REGION_ID_BY_NAME[row.name],
      regionName: row.name,
      detailType: 'region',
    };
  });

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
    cardDistributionSummary.value = {
      value: '',
      label: '智算总数(卡)',
    };
    cardRows.value = [];
    efficiencyMetrics.value = [];
    efficiencyRows.value = [];
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
      { label: 'E2E卡时分配率', value: formatRateValue(overview.e2eCardHourRate), unit: '%', iconName: '', help: true },
      { label: '卡时利用率', value: formatRateValue(overview.cardHourRate), unit: '%', iconName: '', help: true },
      { label: 'AI Core利用率', value: formatRateValue(overview.aiCoreRate), unit: '%', iconName: '', help: true },
    ];
    cardDistributionSummary.value = {
      value: formatNumToLocalStringAndFiexd(overview.operationsTotal, 0),
      label: '智算总数(卡)',
    };
    cardDistribution.value = data.cardModelList.map((item) => {
      return {
        name: item.cardModelName,
        value: Number(item.operationsTotalScale) * 100,
        displayValue: `${formatNumToLocalStringAndFiexd(item.operationsTotal, 0)}卡 | ${formatPercent(item.operationsTotalScale)}`,
        color: CARD_MODEL_COLORS[item.cardModel],
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
    cardDistributionSummary,
    cardRows,
    customerColumns,
    customerDistribution,
    customerDistributionSummary,
    customerRows,
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
    tokenFailed,
    tokenLoading,
    tokenMetrics,
    tokenRows,
    xpuFailed,
    xpuLoading,
  };
}
