import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTrendOptions } from './useTrendOptions.js';

const tableConfig = {
  size: 'small',
};

function createRows(scope) {
  const domesticItems = [
    { id: 'cn-hongkong-1', name: '中国-香港', tone: 'success', rate: '18.19%' },
    { id: 'cn-north-beijing-4', name: '华北-北京四', tone: 'warning', rate: '18.06%' },
    { id: 'cn-east-shanghai-1', name: '华东-上海一', tone: 'danger', rate: '17.17%' },
    { id: 'cn-north-beijing-4-2', name: '华北-北京四', tone: 'success', rate: '18.06%' },
    { id: 'cn-east-shanghai-1-2', name: '华东-上海一', tone: 'success', rate: '17.17%' },
    { id: 'cn-north-beijing-4-3', name: '华北-北京四', tone: 'success', rate: '18.19%' },
    { id: 'cn-north-beijing-4-4', name: '华北-北京四', tone: 'success', rate: '18.06%' },
    { id: 'cn-east-shanghai-1-3', name: '华东-上海一', tone: 'success', rate: '17.17%' },
    { id: 'cn-north-beijing-4-5', name: '华北-北京四', tone: 'success', rate: '18.06%' },
    { id: 'cn-east-shanghai-1-4', name: '华东-上海一', tone: 'success', rate: '17.17%' },
  ];
  const overseasItems = [
    { id: 'ap-singapore-1', name: '新加坡', tone: 'success', rate: '18.19%' },
    { id: 'eu-ireland-1', name: '爱尔兰', tone: 'warning', rate: '18.06%' },
    { id: 'la-mexico-1', name: '墨西哥', tone: 'danger', rate: '17.17%' },
    { id: 'la-chile-1', name: '智利', tone: 'success', rate: '18.06%' },
  ];
  const list = scope === 'domestic' ? domesticItems : overseasItems;

  return list.map((item) => {
    return {
      id: item.id,
      name: item.name,
      marginRate: item.rate,
      status: item.tone,
      revenue: '863.95',
      cost: '624.19',
      allocationRate: item.rate,
      serviceRate: '99.90%',
    };
  });
}

export function useRegionOverview() {
  const router = useRouter();
  const overviewLoading = ref(false);
  const overviewFailed = ref(false);
  const overviewData = [
    { label: 'Region', value: '35', unit: '个', iconName: 'overview-icon-2', help: false },
    { label: '在线服务器', value: '88.18', unit: '万台', iconName: 'overview-icon-1', help: false },
  ];
  const overviewData2 = [
    {
      label: '年度销毛额',
      value: '38.93',
      unit: '亿元(RMB)',
      iconName: 'overview-icon-3',
      help: false,
      trend: { label: '环比增长量', value: '1.82亿元', direction: 'up', unit: '' },
      details: [
        { label: '销毛率', value: '18.19%', highlight: 'up' },
        { label: '收入', value: '69.16亿元' },
        { label: '成本', value: '30.23亿元' },
      ],
    },
    {
      label: '月度销毛额',
      value: '4.93',
      unit: '亿元(RMB)',
      iconName: 'overview-icon-3',
      help: false,
      trend: { label: '环比增长量', value: '0.79亿元', direction: 'up', unit: '' },
      details: [
        { label: '销毛率', value: '18.19%', highlight: 'up' },
        { label: '收入', value: '7.46亿元' },
        { label: '成本', value: '2.53亿元' },
      ],
    },
  ];
  const trendCategories = ['1月', '2月', '3月', '4月', '5月', '6月'];
  const trendUnit = '亿元';
  const trendSeries = [
    { name: '当月收入', type: 'bar', color: '#7666df', data: [4.52, 4.34, 4.01, 3.95, 3.76, 3.69] },
    { name: '当月成本', type: 'bar', color: '#329fe6', data: [3.41, 3.43, 3.31, 3.45, 3.35, 3.21] },
    { name: '当月销毛额', type: 'bar', color: '#15bda7', data: [1.11, 0.91, 0.7, 0.5, 0.41, 0.48] },
    { name: '累计销毛额', type: 'line', color: '#16af9f', data: [1.11, 1.35, 1.7, 2.05, 2.55, 3.12] },
  ];
  const trendOptions = useTrendOptions(trendCategories, trendSeries, trendUnit);
  const columns = [
    { prop: 'name', label: 'Region', width: 125, align: 'left', showSlot: true },
    { prop: 'marginRate', label: '销毛率', minWidth: 78, align: 'right', sortable: true },
    { prop: 'status', label: '经营\n状态', minWidth: 62, align: 'center', showSlot: true },
    {
      prop: 'annual',
      label: '年度累计指标',
      align: 'center',
      children: [
        { prop: 'revenue', label: '收入\n(万元)', width: 78, align: 'right', sortable: true },
        { prop: 'cost', label: '成本\n(万元)', width: 78, align: 'right', sortable: true },
        { prop: 'allocationRate', label: '分配率', width: 76, align: 'right', sortable: true },
        { prop: 'serviceRate', label: '服务率', width: 76, align: 'right' },
      ],
    },
  ];
  const domesticRows = createRows('domestic');
  const overseasRows = createRows('overseas');

  function openRegion(row) {
    router.push({
      name: 'RegionDetail',
      params: {
        regionId: row.id.split('-')[0] === 'cn' && !row.id.includes('hongkong') ? 'cn-north-beijing-4' : row.id,
      },
    });
  }

  return {
    columns,
    domesticRows,
    openRegion,
    overviewData,
    overviewData2,
    overviewFailed,
    overviewLoading,
    overseasRows,
    tableConfig,
    trendOptions,
  };
}
