import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useCurrentDate } from '@/stores/useCurrentDate.js';
import { useSelectedDc } from '@/stores/useSelectedDc.js';
import { useSelectedRegion } from '@/stores/useSelectedRegion.js';
import { useDcFilterOptions } from './useDcFilterOptions.js';
import { useRegionOptions } from './useRegionOptions.js';

function getUniqueValues(values) {
  return [...new Set(values)];
}

function getEmptySelectorParams() {
  return {
    insideOutsideList: [],
    areaNameList: [],
    regionNameList: [],
    cityNameList: [],
    campusNameList: []
  };
}

export function useCloudOperationFilters() {
  const route = useRoute();
  const router = useRouter();
  const showSelector = ref(false);
  const { date: selectedDate } = storeToRefs(useCurrentDate());
  const {
    allMode: dcAllMode,
    dcIds: selectedDcIds
  } = storeToRefs(useSelectedDc());
  const {
    allMode: regionAllMode,
    regionIds: selectedRegionIds
  } = storeToRefs(useSelectedRegion());
  const { regionOptions, loadingRegions, regionError } = useRegionOptions();
  const { dcOptions, loadingDcOptions, dcOptionsError } = useDcFilterOptions();

  const isDcRoute = computed(() => route.name === 'dc');
  const activeRouteName = computed(() => route.name);
  const activeOptions = computed(() => {
    return isDcRoute.value ? dcOptions.value : regionOptions.value;
  });
  const loadingOptions = computed(() => {
    return isDcRoute.value ? loadingDcOptions.value : loadingRegions.value;
  });
  const optionsError = computed(() => {
    return isDcRoute.value ? dcOptionsError.value : regionError.value;
  });
  const filters = computed(() => {
    if (isDcRoute.value) {
      return {
        date: selectedDate.value,
        ...getDcFilterParams()
      };
    }

    return {
      date: selectedDate.value,
      ...getRegionFilterParams()
    };
  });
  const filterLabel = computed(() => {
    if (isDcRoute.value) {
      return getDcLabel();
    }

    return getRegionLabel();
  });

  function getRegionLabel() {
    if (regionAllMode.value) {
      return '全部';
    }

    const firstRegion = regionOptions.value.find((region) => {
      return region.id === selectedRegionIds.value[0];
    });

    if (selectedRegionIds.value.length === 1) {
      return firstRegion.name;
    }

    return `${firstRegion.name} +${selectedRegionIds.value.length - 1}`;
  }

  function getDcLabel() {
    const dataCenters = dcOptions.value.flatMap((city) => city.children);

    if (dcAllMode.value) {
      return '全部';
    }

    const firstDataCenter = dataCenters.find((dataCenter) => {
      return dataCenter.id === selectedDcIds.value[0];
    });

    if (selectedDcIds.value.length === 1) {
      return firstDataCenter.name;
    }

    return `${firstDataCenter.name} +${selectedDcIds.value.length - 1}`;
  }

  function getRegionFilterParams() {
    // 只有主动选择“全部”才压缩为空数组；手动选满所有具体项仍显式传值。
    if (regionAllMode.value) {
      return getEmptySelectorParams();
    }

    const selectedIdSet = new Set(selectedRegionIds.value);
    const selectedOptions = regionOptions.value.filter((option) => {
      return selectedIdSet.has(option.id);
    });

    return {
      insideOutsideList: getUniqueValues(selectedOptions.map((option) => option.scope)),
      areaNameList: getUniqueValues(selectedOptions.map((option) => option.area)),
      regionNameList: selectedOptions.map((option) => option.name),
      cityNameList: [],
      campusNameList: []
    };
  }

  function getDcFilterParams() {
    // DC 与 Region 共用相同的“全部模式”协议，不能用已选数量推断。
    if (dcAllMode.value) {
      return getEmptySelectorParams();
    }

    const selectedIdSet = new Set(selectedDcIds.value);
    const selectedCampuses = dcOptions.value.flatMap((city) => {
      return city.children.filter((campus) => selectedIdSet.has(campus.id));
    });

    return {
      insideOutsideList: getUniqueValues(selectedCampuses.map((campus) => campus.scope)),
      areaNameList: getUniqueValues(selectedCampuses.map((campus) => campus.area)),
      regionNameList: [],
      cityNameList: getUniqueValues(selectedCampuses.map((campus) => campus.cityName)),
      campusNameList: selectedCampuses.map((campus) => campus.name)
    };
  }

  function toggleSelector() {
    showSelector.value = !showSelector.value;
  }

  function closeSelector() {
    showSelector.value = false;
  }

  function confirmRegionSelection(selection) {
    selectedRegionIds.value = selection.ids;
    regionAllMode.value = selection.allMode;
    closeSelector();
  }

  function confirmDcSelection(selection) {
    selectedDcIds.value = selection.ids;
    dcAllMode.value = selection.allMode;
    closeSelector();
  }

  function navigate(name) {
    if (route.name === name) {
      return;
    }

    showSelector.value = false;
    router.push({ name });
  }

  function onAiClick() {
    // AI 助手入口按当前需求只保留点击能力，不进行页面跳转。
  }

  return {
    activeRouteName,
    activeOptions,
    filterLabel,
    filters,
    isDcRoute,
    loadingOptions,
    onAiClick,
    optionsError,
    regionOptions,
    regionAllMode,
    dcOptions,
    dcAllMode,
    selectedDcIds,
    selectedRegionIds,
    showSelector,
    closeSelector,
    confirmDcSelection,
    confirmRegionSelection,
    navigate,
    toggleSelector
  };
}
