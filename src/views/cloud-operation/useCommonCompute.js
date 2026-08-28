import { computed, ref } from 'vue';

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
    { id: `${prefix}-2`, label: '年度增量', value: '5,000' },
    { id: `${prefix}-3`, label: '月度增量', value: '1,205' },
    { id: `${prefix}-4`, label: '变化率', value: '15%' },
  ];
}

function createCustomerRows(prefix) {
  const configs = [
    { total: '11,647', increase: '2,000', rate: '12%', direction: 'up' },
    { total: '255,678', increase: '5,000', rate: '10%', direction: 'up' },
    { total: '233,648', increase: '5,000', rate: '15%', direction: 'down' },
    { total: '233,648', increase: '5,000', rate: '15%', direction: 'down' },
    { total: '233,648', increase: '5,000', rate: '15%', direction: 'up' },
  ];

  return configs.map((cfg, index) => {
    return {
      id: `${prefix}-${index + 1}`,
      name: 'XXX-客户',
      total: cfg.total,
      increase: cfg.increase,
      rate: cfg.rate,
      direction: cfg.direction,
      drawerValue: cfg.total,
      details: createDetails(`${prefix}-${index + 1}`, cfg.total),
    };
  });
}

function createChangeRows(prefix, direction) {
  const isUp = direction === 'up';
  const data = isUp
    ? [
        { value: '1,647', change: '2,000 → 3,647' },
        { value: '5,678', change: '2,000 → 3,647' },
        { value: '3,648', change: '2,000 → 3,647' },
        { value: '3,648', change: '2,000 → 3,647' },
        { value: '3,648', change: '2,000 → 3,647' },
      ]
    : [
        { value: '1,647', change: '2,000 → 1,353' },
        { value: '5,678', change: '8,000 → 2,322' },
        { value: '3,648', change: '5,000 → 1,352' },
        { value: '3,648', change: '5,000 → 1,352' },
        { value: '3,648', change: '5,000 → 1,352' },
      ];

  return data.map((item, index) => {
    return {
      id: `${prefix}-${index + 1}`,
      name: 'XXX-客户',
      value: item.value,
      change: item.change,
      direction,
      drawerValue: item.value,
      details: createDetails(`${prefix}-${index + 1}`, item.value),
    };
  });
}

export function useCommonCompute() {
  const resourceTab = ref('ecs');
  const customerTab = ref('internal');
  const increasePeriod = ref('month');
  const decreasePeriod = ref('month');
  const drawerVisible = ref(false);
  const drawerTitle = ref('通算详情');
  const drawerMetrics = ref([]);
  const drawerRows = ref([]);

  const resourceOptions = [
    { label: 'ECS', value: 'ecs' },
    { label: 'EVS', value: 'evs' },
    { label: 'OBS', value: 'obs' },
  ];
  const customerOptions = [
    { label: '内部客户', value: 'internal' },
    { label: '外部客户', value: 'external' },
  ];
  const periodOptions = [
    { label: '年', value: 'year' },
    { label: '月', value: 'month' },
    { label: '日', value: 'day' },
  ];

  const powerBars = [
    { label: 'A算力', value: '16.36万台/26.19%', percent: 55, color: '#14acc7' },
    { label: 'I算力', value: '23.56万台/46.86%', percent: 88, color: '#5964dc' },
    { label: 'K算力', value: '10.31万台/26.31%', percent: 35, color: '#3299e7' },
  ];
  const powerOverview = {
    value: '56.53',
    label: '服务器总量(万台)',
    trendPrefix: '较上月',
    trendValue: '1.82万台',
    trendDirection: 'up',
  };

  const resourceMetricMap = {
    ecs: [
      {
        label: '总量',
        value: '3803.73',
        unit: '万核',
        icon: 'balance-list-o',
        help: false,
        trends: [{ label: '年度新增', value: '1.82万核/0.21%', direction: 'up', unit: '' }],
      },
      {
        label: '已售量',
        value: '2876.82',
        unit: '万核',
        icon: 'todo-list-o',
        help: false,
        trends: [{ label: '年度新增', value: '3.16万核/1.36%', direction: 'up', unit: '' }],
      },
      {
        label: '售卖率',
        value: '75.63',
        unit: '%',
        icon: 'chart-trending-o',
        help: true,
        trends: [
          { label: '年度提升', value: '3.16%', direction: 'up', unit: '' },
          { label: '新增挖潜', value: '2.11万核', direction: 'up', unit: '' },
        ],
      },
    ],
    evs: [
      {
        label: '总容量',
        value: '815.26',
        unit: 'PB',
        icon: 'balance-list-o',
        help: false,
        trends: [{ label: '年度新增', value: '16.21PB', direction: 'up', unit: '' }],
      },
      {
        label: '已售容量',
        value: '693.18',
        unit: 'PB',
        icon: 'todo-list-o',
        help: false,
        trends: [{ label: '年度新增', value: '11.36PB', direction: 'up', unit: '' }],
      },
      {
        label: '使用率',
        value: '85.02',
        unit: '%',
        icon: 'chart-trending-o',
        help: true,
        trends: [{ label: '年度提升', value: '1.28%', direction: 'up', unit: '' }],
      },
    ],
    obs: [
      {
        label: '总容量',
        value: '665.53',
        unit: 'PB',
        icon: 'balance-list-o',
        help: false,
        trends: [{ label: '年度新增', value: '12.65PB', direction: 'up', unit: '' }],
      },
      {
        label: '已售容量',
        value: '512.39',
        unit: 'PB',
        icon: 'todo-list-o',
        help: false,
        trends: [{ label: '年度新增', value: '9.32PB', direction: 'up', unit: '' }],
      },
      {
        label: '分配率',
        value: '76.99',
        unit: '%',
        icon: 'chart-trending-o',
        help: true,
        trends: [{ label: '年度提升', value: '0.86%', direction: 'up', unit: '' }],
      },
    ],
  };
  const resourceMetrics = computed(() => resourceMetricMap[resourceTab.value]);

  const customerDistribution = [
    { name: '内部客户', value: 27, displayValue: '1021.12万核', color: '#19a9c3' },
    { name: '外部客户', value: 73, displayValue: '2876.81万核', color: '#2e6fe0' },
  ];
  const customerDistributionSummary = {
    value: '3803.73',
    label: '售卖总量(万核)',
  };

  const customerColumns = [
    { prop: 'name', label: '客户名', width: 125, align: 'left', slotName: 'link' },
    { prop: 'total', label: '总量', minWidth: 78, align: 'right' },
    { prop: 'increase', label: '年度变化', minWidth: 92, align: 'right', slotName: 'trend' },
    { prop: 'rate', label: '变化率', minWidth: 72, align: 'right' },
  ];
  const customerRowMap = {
    internal: createCustomerRows('internal'),
    external: createCustomerRows('external'),
  };
  const customerRows = computed(() => customerRowMap[customerTab.value]);

  const changeColumns = [
    { prop: 'name', label: '客户名', width: 125, align: 'left', slotName: 'link' },
    { prop: 'value', label: '增量', minWidth: 90, align: 'right', slotName: 'trend' },
    { prop: 'change', label: '总量变化', minWidth: 135, align: 'right' },
  ];
  const decreaseChangeColumns = [
    { prop: 'name', label: '客户名', width: 125, align: 'left', slotName: 'link' },
    { prop: 'value', label: '掉量', minWidth: 90, align: 'right', slotName: 'trend' },
    { prop: 'change', label: '总量变化', minWidth: 135, align: 'right' },
  ];
  const increaseRowMap = {
    year: createChangeRows('increase-year', 'up'),
    month: createChangeRows('increase-month', 'up'),
    day: createChangeRows('increase-day', 'up'),
  };
  const decreaseRowMap = {
    year: createChangeRows('decrease-year', 'down'),
    month: createChangeRows('decrease-month', 'down'),
    day: createChangeRows('decrease-day', 'down'),
  };
  const increaseRows = computed(() => increaseRowMap[increasePeriod.value]);
  const decreaseRows = computed(() => decreaseRowMap[decreasePeriod.value]);

  const domesticMetrics = [
    { label: '售卖总量合计', value: '123', unit: '万核', icon: 'balance-list-o', help: false },
    { label: '年度增量合计', value: '120', unit: '万核', icon: 'chart-trending-o', help: false },
    { label: '月度增量合计', value: '88', unit: '万核', icon: 'bar-chart-o', help: false },
  ];
  const domesticDistribution = [
    { name: '华北-北京四', value: 10.5, displayValue: '1122万核/22.5%', color: '#a04cda' },
    { name: '华东-上海一', value: 22.5, displayValue: '1122万核/22.5%', color: '#2c6bd9' },
    { name: '华南-广州', value: 14, displayValue: '1122万核/22.5%', color: '#46ae3d' },
    { name: '西南-贵阳一', value: 13, displayValue: '1122万核/22.5%', color: '#6449db' },
    { name: '华北-乌兰察布一', value: 10, displayValue: '1122万核/22.5%', color: '#19a4c1' },
    { name: '华东二（芜湖）', value: 18, displayValue: '1122万核/22.5%', color: '#ef8b32' },
    { name: '华北三（和林格尔）', value: 12, displayValue: '1122万核/22.5%', color: '#3d8cd9' },
  ];
  const regionColumns = [
    { prop: 'name', label: 'Region', width: 140, align: 'left' },
    { prop: 'total', label: '售卖总量\n(万核)', minWidth: 78, align: 'right' },
    { prop: 'year', label: '年度增量\n(万核)', minWidth: 78, align: 'right' },
    { prop: 'month', label: '月度增量\n(万核)', minWidth: 78, align: 'right' },
    { prop: 'status', label: '增长状态', minWidth: 72, align: 'center', slotName: 'status' },
  ];
  const domesticNames = [
    '华北-北京四',
    '华东-上海一',
    '华南-广州',
    '西南-贵阳一',
    '华北-乌兰察布一',
    '华东二（芜湖）',
    '华北三（和林格尔）',
  ];
  const domesticRows = domesticNames.map((name, index) => {
    let tone = 'success';
    if (index === 1) tone = 'danger';
    else if (index === 2) tone = 'warning';
    return {
      id: `domestic-${index + 1}`,
      name,
      total: '661.4',
      year: '508.97',
      month: '508.97',
      status: tone,
      drawerValue: '661.4万核',
      details: createDetails(`domestic-${index + 1}`, '661.4万核'),
    };
  });
  const resourceCenterRows = domesticNames.map((name, index) => {
    return {
      id: `resource-center-${index + 1}`,
      name,
      total: '661.4',
      year: '508.97',
      month: '508.97',
      status: 'success',
      drawerValue: '661.4万核',
      details: createDetails(`resource-center-${index + 1}`, '661.4万核'),
    };
  });

  const overseasMetrics = [
    { label: '售卖总量合计', value: '123', unit: '万核', icon: 'balance-list-o', help: false },
    { label: '年度增量合计', value: '120', unit: '万核', icon: 'chart-trending-o', help: false },
    { label: '月度增量合计', value: '88', unit: '万核', icon: 'bar-chart-o', help: false },
  ];
  const overseasDistribution = [
    { name: 'EMEA', value: 32, displayValue: '885万核/28.5%', color: '#684bdd' },
    { name: '亚太', value: 43, displayValue: '1122万核/22.5%', color: '#2d6ddb' },
    { name: '拉美', value: 25, displayValue: '1122万核/22.5%', color: '#45ad3e' },
  ];
  const regionDistributionSummary = {
    value: '63,511',
    label: '售卖总量',
  };
  const overseasColumns = [
    { prop: 'area', label: '大区', width: 60, align: 'left' },
    { prop: 'name', label: 'Region', width: 95, align: 'left' },
    { prop: 'total', label: '售卖总量\n(万核)', minWidth: 78, align: 'right', sortable: true },
    { prop: 'year', label: '年度增量\n(万核)', minWidth: 78, align: 'right', sortable: true },
    { prop: 'month', label: '月度增量\n(万核)', minWidth: 78, align: 'right', sortable: true },
    { prop: 'status', label: '增长状态', minWidth: 72, align: 'center', slotName: 'status' },
  ];
  const overseasRows = [
    { id: 'overseas-1', area: '亚太', name: '新加坡', tone: 'success' },
    { id: 'overseas-2', area: '亚太', name: '香港', tone: 'danger' },
    { id: 'overseas-3', area: '亚太', name: '泰国', tone: 'warning' },
    { id: 'overseas-4', area: '拉美', name: 'xxx', tone: 'success' },
    { id: 'overseas-5', area: '拉美', name: 'xxx', tone: 'success' },
    { id: 'overseas-6', area: '拉美', name: 'xxx', tone: 'success' },
    { id: 'overseas-7', area: 'EMEA', name: 'xxx', tone: 'success' },
    { id: 'overseas-8', area: 'EMEA', name: 'xxx', tone: 'success' },
  ].map((row) => {
    return {
      ...row,
      total: '661.4',
      year: '508.97',
      month: '508.97',
      status: row.tone,
      drawerValue: '661.4万核',
      details: createDetails(row.id, '661.4万核'),
    };
  });

  const overseasTableConfig = {
    size: 'small',
    spanMethod({ rowIndex, columnIndex }) {
      if (columnIndex !== 0) {
        return [1, 1];
      }

      if (rowIndex === 0 || rowIndex === 3 || rowIndex === 6) {
        const rowSpan = rowIndex === 6 ? 2 : 3;
        return [rowSpan, 1];
      }

      return [0, 0];
    },
  };

  function openDetail(row) {
    drawerTitle.value = `${row.name} 详情`;
    drawerMetrics.value = [
      { label: '业务对象', value: row.name, unit: '', icon: 'records-o', help: false },
      { label: '当前指标', value: row.drawerValue || row.total || row.value || '', unit: '', icon: 'chart-trending-o', help: false },
    ];
    drawerRows.value = row.details || createDetails(row.id, row.drawerValue || '661.4万核');
    drawerVisible.value = true;
  }

  return {
    changeColumns,
    customerColumns,
    customerDistribution,
    customerDistributionSummary,
    customerOptions,
    customerRows,
    customerTab,
    decreaseChangeColumns,
    decreasePeriod,
    decreaseRows,
    domesticDistribution,
    domesticMetrics,
    domesticRows,
    drawerColumns,
    drawerMetrics,
    drawerRows,
    drawerTitle,
    drawerVisible,
    increasePeriod,
    increaseRows,
    openDetail,
    overseasColumns,
    overseasDistribution,
    overseasMetrics,
    overseasRows,
    overseasTableConfig,
    periodOptions,
    powerBars,
    powerOverview,
    regionColumns,
    regionDistributionSummary,
    resourceCenterRows,
    resourceMetrics,
    resourceOptions,
    resourceTab,
    tableConfig,
  };
}

