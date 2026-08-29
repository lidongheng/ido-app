import { ref } from 'vue';

const tableConfig = {
  size: 'small',
};

const drawerColumns = [
  { prop: 'label', label: '指标', minWidth: 120, align: 'left' },
  { prop: 'value', label: '详细数据', minWidth: 150, align: 'right' },
];

function createDetails(prefix, value) {
  return [
    { id: `${prefix}-1`, label: '当前总量', value },
    { id: `${prefix}-2`, label: '年度计划', value: '12,000' },
    { id: `${prefix}-3`, label: '年度新增', value: '3,168' },
    { id: `${prefix}-4`, label: '当前利用率', value: '90.18%' },
  ];
}

export function useAiCompute() {
  const drawerVisible = ref(false);
  const drawerTitle = ref('智算详情');
  const drawerMetrics = ref([]);
  const drawerRows = ref([]);

  const overviewMetrics = [
    { label: '总卡数', value: '46.3', unit: '万卡', icon: 'apps-o', help: false },
    { label: '年度计划', value: '7.2', unit: '万卡', icon: 'todo-list-o', help: false },
    { label: '年度新增', value: '4.8', unit: '万卡', icon: 'balance-list-o', help: false },
    { label: '已分配', value: '2.4', unit: '万卡', icon: 'records-o', help: false },
    { label: '卡时利用率', value: '95.19', unit: '%', icon: 'clock-o', help: true },
    { label: 'AI Core利用率', value: '96.18', unit: '%', icon: 'chart-trending-o', help: true },
  ];

  const cardDistribution = [
    { name: 'A5', value: 15, displayValue: '1,647卡 | 15%', color: '#12bca8' },
    { name: 'A3', value: 33, displayValue: '45,678卡 | 33%', color: '#6857dd' },
    { name: 'A2', value: 52, displayValue: '143,647卡 | 52%', color: '#2d9be6' },
  ];
  const cardDistributionSummary = {
    value: '463,511',
    label: '智算总数(卡)',
  };

  const cardColumns = [
    { prop: 'name', label: '类型', width: 90, align: 'left', showSlot: true },
    { prop: 'cards', label: '卡数', minWidth: 92, align: 'right' },
    { prop: 'plan', label: '年度计划', minWidth: 90, align: 'right' },
    { prop: 'increase', label: '年度新增', minWidth: 90, align: 'right' },
  ];

  const cardRows = [
    { id: 'a5', name: 'A5', color: '#12bca8', cards: '11,647', plan: '2,000', increase: '1,000' },
    { id: 'a3', name: 'A3', color: '#6857dd', cards: '255,678', plan: '5,000', increase: '3,000' },
    { id: 'a2', name: 'A2', color: '#2d9be6', cards: '233,648', plan: '5,000', increase: '3,000' },
  ];

  const efficiencyMetrics = [
    { label: 'E2E卡时分配率', value: '46.3', unit: '万卡', icon: 'apps-o', help: true },
    { label: '卡时利用率', value: '95.19', unit: '%', icon: 'clock-o', help: true },
    { label: 'AI Core利用率', value: '96.18', unit: '%', icon: 'chart-trending-o', help: true },
  ];

  const efficiencyColumns = [
    { prop: 'name', label: '卡类型', width: 72, align: 'left', showSlot: true },
    { prop: 'total', label: '总卡数\n(万卡)', minWidth: 70, align: 'right' },
    { prop: 'assigned', label: '已分配\n(卡)', minWidth: 70, align: 'right' },
    { prop: 'e2e', label: 'E2E卡时\n分配率', minWidth: 78, align: 'right' },
    { prop: 'usage', label: '卡时使\n用率', minWidth: 72, align: 'right' },
    { prop: 'coreUsage', label: 'AI Core\n利用率', minWidth: 78, align: 'right' },
  ];

  const efficiencyRows = [
    { id: 'eff-a5', name: 'A5', total: '17.8', assigned: '1,232', e2e: '90.1%', usage: '90.1%', coreUsage: '89.8%', drawerValue: '90.1%', details: createDetails('eff-a5', '90.1%') },
    { id: 'eff-a3', name: 'A3', total: '17.8', assigned: '2,156', e2e: '90.1%', usage: '90.1%', coreUsage: '89.8%', drawerValue: '90.1%', details: createDetails('eff-a3', '90.1%') },
    { id: 'eff-a2', name: 'A2', total: '17.8', assigned: '2,156', e2e: '90.1%', usage: '90.1%', coreUsage: '89.8%', drawerValue: '90.1%', details: createDetails('eff-a2', '90.1%') },
  ];

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
  ];

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
  ];

  const tokenMetrics = [
    { label: 'Token卡数', value: '1.56', unit: '万卡', icon: 'apps-o', help: false },
    { label: '日Token数', value: '8,053', unit: '亿', icon: 'chart-trending-o', help: false },
    { label: 'Token利用率', value: '40.13', unit: '%', icon: 'clock-o', help: false },
  ];

  const tokenColumns = [
    { prop: 'name', label: '模型', width: 105, align: 'left' },
    { prop: 'cards', label: '卡数', minWidth: 72, align: 'right', sortable: true },
    { prop: 'daily', label: '日Token数', minWidth: 88, align: 'right', sortable: true },
    { prop: 'usage', label: 'Token利用率', minWidth: 90, align: 'right', sortable: true },
  ];

  const tokenRows = [
    { id: 'token-1', name: 'GLM-5.1', cards: '1,230', daily: '90.8%', usage: '90.8%' },
    { id: 'token-2', name: 'GLM-5.1', cards: '2,200', daily: '90.8%', usage: '90.8%' },
    { id: 'token-3', name: 'GLM-5.1', cards: '2,699', daily: '90.8%', usage: '90.8%' },
  ];

  function openDetail(row) {
    drawerTitle.value = `${row.name} 详情`;
    drawerMetrics.value = [
      { label: '业务对象', value: row.name, unit: '', icon: 'records-o', help: false },
      { label: '当前指标', value: row.drawerValue || row.total || row.cards || '', unit: '', icon: 'chart-trending-o', help: false },
    ];
    drawerRows.value = row.details || createDetails(row.id, row.drawerValue || '17.8万卡');
    drawerVisible.value = true;
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
    drawerColumns,
    drawerMetrics,
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
    tokenMetrics,
    tokenRows,
  };
}
