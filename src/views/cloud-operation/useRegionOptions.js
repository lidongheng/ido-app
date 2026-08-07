import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSelectedRegion } from '@/stores/useSelectedRegion.js';
import { getRegionOptions } from './mock.js';

function normalizeRegionOptions(data) {
  return data.flatMap((insideOutside) => {
    return insideOutside.list.flatMap((area) => {
      return area.list.map((region) => ({
        id: region.id,
        name: region.dimensionLevelL3,
        scope: region.dimensionLevelL1,
        area: region.dimensionLevelL2
      }));
    });
  });
}

export function useRegionOptions() {
  const regionOptions = ref(null);
  const {
    allMode: regionAllMode,
    regionIds: selectedRegionIds
  } = storeToRefs(useSelectedRegion());
  const loadingRegions = ref(true);
  const regionError = ref('');

  async function fetchRegionOptions() {
    loadingRegions.value = true;
    regionError.value = '';

    try {
      const res = await getRegionOptions();

      if (res.status === 403) {
        regionOptions.value = null;
        selectedRegionIds.value = [];
        regionError.value = '暂无 Region 筛选权限';
        return;
      }

      if (res.status === 200) {
        const options = normalizeRegionOptions(res.data);
        regionOptions.value = options;
        selectedRegionIds.value = options.map((option) => option.id);
        regionAllMode.value = true;
        return;
      }

      regionOptions.value = null;
      selectedRegionIds.value = [];
      regionError.value = 'Region 筛选项加载失败';
    } catch (error) {
      regionOptions.value = null;
      selectedRegionIds.value = [];
      regionError.value = 'Region 筛选项加载失败';
    } finally {
      loadingRegions.value = false;
    }
  }

  fetchRegionOptions();

  return {
    regionOptions,
    loadingRegions,
    regionError
  };
}
