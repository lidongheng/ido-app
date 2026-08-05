import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useCurrentDate } from '@/stores/useCurrentDate.js';
import { useSelectedDc } from '@/stores/useSelectedDc.js';
import { useSelectedRegion } from '@/stores/useSelectedRegion.js';
import { useDcFilterOptions } from './useDcFilterOptions.js';
import { useRegionOptions } from './useRegionOptions.js';

export function useCloudOperationFilters() {
  const route = useRoute();
  const router = useRouter();
  const showSelector = ref(false);
  const { date: selectedDate } = storeToRefs(useCurrentDate());
  const { dcIds: selectedDcIds } = storeToRefs(useSelectedDc());
  const { regionIds: selectedRegionIds } = storeToRefs(useSelectedRegion());
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
        dcIds: [...selectedDcIds.value]
      };
    }

    return {
      date: selectedDate.value,
      regionIds: [...selectedRegionIds.value]
    };
  });
  const filterLabel = computed(() => {
    if (isDcRoute.value) {
      return getDcLabel();
    }

    return getRegionLabel();
  });

  function getRegionLabel() {
    if (selectedRegionIds.value.length === regionOptions.value.length) {
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

    if (selectedDcIds.value.length === dataCenters.length) {
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

  function toggleSelector() {
    showSelector.value = !showSelector.value;
  }

  function closeSelector() {
    showSelector.value = false;
  }

  function confirmDcSelection(dcIds) {
    selectedDcIds.value = dcIds;
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
    dcOptions,
    selectedDcIds,
    showSelector,
    closeSelector,
    confirmDcSelection,
    navigate,
    toggleSelector
  };
}
