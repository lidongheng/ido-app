import { ref } from 'vue';

const regionOverviewMock = {
  businessOverview: {
    region: 35,
    server: 881800,
    valueY: 3893000000,
    valueIncreaseY: 182000000,
    valueRateY: 0.1819,
    incomeY: 6916000000,
    costY: 3023000000,
    valueM: 493000000,
    valueIncreaseM: 79000000,
    valueRateM: 0.1819,
    incomeM: 746000000,
    costM: 253000000,
  },
  trend: {
    categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
    series: [
      { name: '当月收入', type: 'bar', color: '#7666df', data: [4.52, 4.34, 4.01, 3.95, 3.76, 3.69] },
      { name: '当月成本', type: 'bar', color: '#329fe6', data: [3.41, 3.43, 3.31, 3.45, 3.35, 3.21] },
      { name: '当月销毛额', type: 'bar', color: '#15bda7', data: [1.11, 0.91, 0.7, 0.5, 0.41, 0.48] },
      { name: '累计销毛额', type: 'line', color: '#16af9f', data: [1.11, 1.35, 1.7, 2.05, 2.55, 3.12] },
    ],
  },
  insideRegion: [
    { regionId: 'cn-hongkong-1', regionName: '中国-香港', valueRateY: 0.1819, status: 'success', incomeY: 8639500, costY: 6241900, allocationRateY: 0.919, servers: 14852, valueRateM: 0.1819, incomeM: 746000, costM: 253000 },
    { regionId: 'cn-north-beijing-4', regionName: '华北-北京四', valueRateY: 0.1806, status: 'warning', incomeY: 8324100, costY: 6121800, allocationRateY: 0.906, servers: 18123, valueRateM: 0.1806, incomeM: 721000, costM: 249000 },
    { regionId: 'cn-east-shanghai-1', regionName: '华东-上海一', valueRateY: 0.1717, status: 'danger', incomeY: 7986300, costY: 6013200, allocationRateY: 0.887, servers: 12121, valueRateM: 0.1717, incomeM: 684000, costM: 241000 },
    { regionId: 'cn-north-beijing-2', regionName: '华北-北京二', valueRateY: 0.1698, status: 'success', incomeY: 7568200, costY: 5841700, allocationRateY: 0.898, servers: 11680, valueRateM: 0.1698, incomeM: 652000, costM: 236000 },
    { regionId: 'cn-east-shanghai-2', regionName: '华东-上海二', valueRateY: 0.1652, status: 'success', incomeY: 7213500, costY: 5638900, allocationRateY: 0.892, servers: 10936, valueRateM: 0.1652, incomeM: 627000, costM: 229000 },
    { regionId: 'cn-south-guangzhou-1', regionName: '华南-广州', valueRateY: 0.1586, status: 'warning', incomeY: 6931700, costY: 5512400, allocationRateY: 0.879, servers: 10248, valueRateM: 0.1586, incomeM: 603000, costM: 225000 },
  ],
  outsideRegion: [
    { regionId: 'ap-singapore-1', regionName: '新加坡', valueRateY: 0.1819, status: 'success', incomeY: 4639500, costY: 3241900, allocationRateY: 0.901, servers: 8852, valueRateM: 0.1819, incomeM: 446000, costM: 153000 },
    { regionId: 'eu-ireland-1', regionName: '爱尔兰', valueRateY: 0.1806, status: 'warning', incomeY: 4324100, costY: 3121800, allocationRateY: 0.886, servers: 8123, valueRateM: 0.1806, incomeM: 421000, costM: 149000 },
    { regionId: 'la-mexico-1', regionName: '墨西哥', valueRateY: 0.1717, status: 'danger', incomeY: 3986300, costY: 3013200, allocationRateY: 0.862, servers: 7121, valueRateM: 0.1717, incomeM: 384000, costM: 141000 },
    { regionId: 'la-chile-1', regionName: '智利', valueRateY: 0.1608, status: 'success', incomeY: 3568200, costY: 2841700, allocationRateY: 0.853, servers: 6680, valueRateM: 0.1608, incomeM: 352000, costM: 136000 },
  ],
};

export const regionViewData = ref(regionOverviewMock);
export const overviewFailed = ref(false);
export const overviewLoading = ref(false);
export const tableConfig = {
  size: 'small',
};

export function sortArrayByMetric(data, metric) {
  return [...data].sort((a, b) => b[metric] - a[metric]);
}

export function useRegionView() {
  return {
    overviewFailed,
    overviewLoading,
    regionViewData,
    tableConfig,
  };
}
