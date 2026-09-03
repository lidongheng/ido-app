import { computed, ref, watch } from 'vue';
import { useCommonCompute } from './useCommonCompute.js';

export const colors = [
  '#007AFF',
  '#FF9500',
  '#FF2D55',
  '#FF3B30',
  '#FF4500',
  '#FF5722',
  '#FF69B4',
];

const RESOURCE_KEY_BY_LABEL = {
  ECS: 'ecs',
  EVS: 'evs',
  OBS: 'obs',
};

const CUSTOMER_KEY_BY_LABEL = {
  内部客户: 'internal',
  外部客户: 'external',
};

export function useCommonComputeOverview() {
  const commonCompute = useCommonCompute();
  const btnList = ['ECS', 'EVS', 'OBS'];
  const customerList = ['内部客户', '外部客户'];
  const activeBtn = ref('ECS');
  const activeCustomer = ref('内部客户');

  watch(
    activeBtn,
    (value) => {
      commonCompute.resourceTab.value = RESOURCE_KEY_BY_LABEL[value];
    },
    { immediate: true },
  );

  watch(
    activeCustomer,
    (value) => {
      commonCompute.customerTab.value = CUSTOMER_KEY_BY_LABEL[value];
    },
    { immediate: true },
  );

  const generalData = computed(() => {
    return [
      {
        label: commonCompute.powerOverview.label,
        value: commonCompute.powerOverview.value,
        unit: '万台',
        ratio: commonCompute.powerOverview.trendValue.replace('万台', ''),
        iconName: 'general-icon-1',
        showList: true,
        list: commonCompute.powerBars.map((item) => {
          return {
            label: item.label,
            value: item.value,
            unit: '',
          };
        }),
      },
    ];
  });

  function selectBtn(value) {
    activeBtn.value = value;
  }

  function selectCustomer(value) {
    activeCustomer.value = value;
  }

  return {
    activeBtn,
    activeCustomer,
    btnList,
    changeColumns: commonCompute.changeColumns,
    customerColumns: commonCompute.customerColumns,
    customerDistribution: commonCompute.customerDistribution,
    customerDistributionSummary: commonCompute.customerDistributionSummary,
    customerList,
    customerRows: commonCompute.customerRows,
    decreaseColumns: commonCompute.decreaseChangeColumns,
    decreaseRows: commonCompute.decreaseRows,
    domesticData: commonCompute.domesticMetrics,
    domesticDistribution: commonCompute.domesticDistribution,
    domesticRows: commonCompute.domesticRows,
    drawerRows: commonCompute.drawerRows,
    drawerTitle: commonCompute.drawerTitle,
    drawerVisible: commonCompute.drawerVisible,
    generalData,
    increaseRows: commonCompute.increaseRows,
    overseasColumns: commonCompute.overseasColumns,
    overseasData: commonCompute.overseasMetrics,
    overseasDistribution: commonCompute.overseasDistribution,
    overseasRows: commonCompute.overseasRows,
    overseasTableConfig: commonCompute.overseasTableConfig,
    openDetail: commonCompute.openDetail,
    regionColumns: commonCompute.regionColumns,
    regionDistributionSummary: commonCompute.regionDistributionSummary,
    resourceCenterRows: commonCompute.resourceCenterRows,
    selectBtn,
    selectCustomer,
    tableConfig: commonCompute.tableConfig,
    totalData: commonCompute.resourceMetrics,
  };
}
