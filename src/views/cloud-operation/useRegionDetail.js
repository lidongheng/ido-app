import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTrendOptions } from './useTrendOptions.js';

const REGION_DETAILS = {
  'cn-hongkong-1': { name: '中国-香港', code: 'ap-southeast-1', azCount: '7', openTime: '2025-04' },
  'cn-north-beijing-4': { name: '华北-北京四', code: 'cn-north-4', azCount: '7', openTime: '2025-04' },
  'cn-east-shanghai-1': { name: '华东-上海一', code: 'cn-east-3', azCount: '7', openTime: '2025-04' },
  'cn-north-beijing-2': { name: '华北-北京二', code: 'cn-north-2', azCount: '7', openTime: '2025-04' },
  'cn-east-shanghai-2': { name: '华东-上海二', code: 'cn-east-4', azCount: '7', openTime: '2025-04' },
  'cn-north-beijing-1': { name: '华北-北京一', code: 'cn-north-1', azCount: '7', openTime: '2025-04' },
  'cn-north-ulanchabu-1': { name: '华北-乌兰察布一', code: 'cn-north-9', azCount: '7', openTime: '2025-04' },
  'cn-south-guangzhou-1': { name: '华南-广州', code: 'cn-south-1', azCount: '7', openTime: '2025-04' },
  'ap-singapore-1': { name: '新加坡', code: 'ap-southeast-3', azCount: '7', openTime: '2025-04' },
  'eu-ireland-1': { name: '爱尔兰', code: 'eu-west-1', azCount: '7', openTime: '2025-04' },
  'la-mexico-1': { name: '墨西哥', code: 'la-north-2', azCount: '7', openTime: '2025-04' },
  'la-chile-1': { name: '智利', code: 'la-south-2', azCount: '7', openTime: '2025-04' },
};

const tableConfig = {
  size: 'small',
};

function createTopRows(prefix) {
  const summaryRow = {
    id: `${prefix}-summary`,
    isSummary: true,
    customer: '汇总',
    type: '',
    revenue: '863.95',
    growth: '18.19%',
    ratio: '18.19%',
    secondaryRevenue: '863.95',
  };

  const list = [
    { type: '外部客户', rate: '18.06%' },
    { type: '外部客户', rate: '17.17%' },
    { type: '内部客户', rate: '18.06%' },
    { type: '内部客户', rate: '17.17%' },
    { type: '内部客户', rate: '18.19%' },
  ].map((item, index) => {
    return {
      id: `${prefix}-${index + 1}`,
      customer: '华为云服务',
      type: item.type,
      revenue: '863.95',
      growth: item.rate,
      ratio: item.rate,
      secondaryRevenue: '863.95',
    };
  });

  return [summaryRow, ...list];
}

function createRankRows(scope) {
  const list = [
    { total: '14,852', dir: 'up', subtitle: 'AZ1-c6-mgr-1', isNew: false },
    { total: '18,123', dir: 'down', subtitle: 'AZ3-c6-mgr-7', isNew: false },
    { total: '12,121', dir: 'up', subtitle: 'AZ2-c6-mgr-2', isNew: false },
    { total: '12,121', dir: 'up', subtitle: 'AZ2-c6-mgr-2', isNew: true },
    { total: '12,121', dir: 'up', subtitle: 'AZ2-c6-mgr-2', isNew: false },
    { total: '12,121', dir: 'up', subtitle: 'AZ2-c6-mgr-2', isNew: true },
    { total: '12,121', dir: 'up', subtitle: 'AZ2-c6-mgr-2', isNew: false },
    { total: '12,121', dir: 'up', subtitle: 'AZ2-c6-mgr-2', isNew: false },
    { total: '12,121', dir: 'up', subtitle: 'AZ2-c6-mgr-2', isNew: false },
    { total: '12,121', dir: 'up', subtitle: 'AZ2-c6-mgr-2', isNew: false },
  ];

  return list.map((item, index) => {
    return {
      id: `${scope}-rank-${index + 1}`,
      rank: index + 1,
      movement: 1,
      movementDirection: item.dir,
      name: scope === 'domestic' ? 'XXX-客户' : '海外-客户',
      subtitle: item.subtitle,
      isNew: item.isNew,
      total: item.total,
      year: '1,205',
      month: '1,205',
    };
  });
}

export function useRegionDetail() {
  const route = useRoute();
  const region = computed(() => {
    return REGION_DETAILS[route.params.regionId] || REGION_DETAILS['cn-hongkong-1'];
  });

  const financialMetrics = [
    {
      label: '年度销毛额',
      value: '1,132',
      unit: '万元(RMB)',
      icon: 'balance-list-o',
      help: false,
      trend: { label: '环比增长量', value: '122万元', direction: 'up', unit: '' },
      details: [
        { label: '销毛率', value: '18.17%', highlight: 'up' },
        { label: '收入', value: '11 万元' },
        { label: '成本', value: '19 万元' },
      ],
    },
    {
      label: '月度销毛额',
      value: '232',
      unit: '万元(RMB)',
      icon: 'balance-list-o',
      help: false,
      trend: { label: '环比增长量', value: '46万元', direction: 'up', unit: '' },
      details: [
        { label: '销毛率', value: '18.17%', highlight: 'up' },
        { label: '收入', value: '11 万元' },
        { label: '成本', value: '19 万元' },
      ],
    },
  ];

  const serverMetrics = [
    { label: '在线服务器', value: '10,632', unit: '台', icon: '', help: false, details: [{ label: '占比', value: '60.02%', help: false }] },
    { label: 'V5及以前', value: '6,400', unit: '台', icon: '', help: false, details: [{ label: '占比', value: '60.02%', help: false }] },
    { label: 'V6-V8', value: '2,146', unit: '台', icon: '', help: false, details: [{ label: '占比', value: '20.18%', help: false }] },
    { label: 'V9', value: '2,105', unit: '台', icon: '', help: false, details: [{ label: '占比', value: '19.80%', help: false }] },
  ];

  const trendCategories = ['1月', '2月', '3月', '4月', '5月', '6月'];
  const trendUnit = '万元';
  const trendSeries = [
    { name: '当月收入', type: 'bar', color: '#7666df', data: [4.52, 4.34, 4.01, 3.95, 3.76, 3.69] },
    { name: '当月成本', type: 'bar', color: '#329fe6', data: [3.41, 3.43, 3.31, 3.45, 3.35, 3.21] },
    { name: '当月销毛额', type: 'bar', color: '#15bda7', data: [1.11, 0.91, 0.7, 0.5, 0.41, 0.48] },
    { name: '累计销毛额', type: 'line', color: '#16af9f', data: [1.11, 1.35, 1.7, 2.05, 2.55, 3.12] },
  ];
  const trendOptions = useTrendOptions(trendCategories, trendSeries, trendUnit);

  const incomeDistribution = [
    { name: 'A客户', value: 20, displayValue: '20%', color: '#2f9fe6' },
    { name: 'B客户', value: 60, displayValue: '60%', color: '#0fba80' },
    { name: 'C客户', value: 10, displayValue: '10%', color: '#7261dc' },
    { name: '其他客户', value: 10, displayValue: '10%', color: '#12a4c2' },
  ];
  const incomeDistributionSummary = {
    value: '100',
    label: '客户',
  };

  const topColumns = [
    { prop: 'customer', label: '客户', width: 105, align: 'left' },
    { prop: 'type', label: '客户类型', width: 88, align: 'left' },
    {
      prop: 'annual',
      label: '年度累计指标',
      align: 'center',
      children: [
        { prop: 'revenue', label: '收入\n(万元)', width: 78, align: 'right', sortable: true },
        { prop: 'growth', label: '环比\n增长量', width: 78, align: 'right', sortable: true },
        { prop: 'ratio', label: '占比', width: 72, align: 'right', sortable: true },
        { prop: 'secondaryRevenue', label: '收入\n(万元)', width: 78, align: 'right' },
      ],
    },
  ];

  const revenueRows = createTopRows('revenue');
  const growthRows = createTopRows('growth');
  const declineRows = createTopRows('decline');

  const customerDistribution = [
    { name: '内部客户', value: 27, displayValue: '1021.12万核', color: '#17a7c1' },
    { name: '外部客户', value: 73, displayValue: '2876.81万核', color: '#2d6fdd' },
  ];
  const customerDistributionSummary = {
    value: '3803.73',
    label: '售卖总量(万核)',
  };

  const rankColumns = [
    { prop: 'rank', label: '', width: 44, align: 'center', showSlot: true },
    { prop: 'name', label: '客户名称', width: 136, align: 'left', showSlot: true },
    { prop: 'total', label: '售卖总量', minWidth: 84, align: 'right', sortable: true },
    { prop: 'year', label: '年度增量', minWidth: 80, align: 'right', sortable: true },
    { prop: 'month', label: '月度增量', minWidth: 80, align: 'right', sortable: true },
  ];

  const domesticRankRows = createRankRows('domestic');
  const overseasRankRows = createRankRows('overseas');

  return {
    customerDistribution,
    customerDistributionSummary,
    declineRows,
    domesticRankRows,
    financialMetrics,
    growthRows,
    incomeDistribution,
    incomeDistributionSummary,
    overseasRankRows,
    rankColumns,
    region,
    revenueRows,
    serverMetrics,
    tableConfig,
    topColumns,
    trendOptions,
  };
}
