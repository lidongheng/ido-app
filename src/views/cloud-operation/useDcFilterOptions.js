import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSelectedDc } from '@/stores/useSelectedDc.js';
import { getDcFilterOptions } from './mock.js';

function createDcKey(parts) {
  // DC 接口没有节点 ID，使用完整层级路径作为组件内部唯一键，不作为接口参数传出。
  return JSON.stringify(parts);
}

function normalizeDcOptions(data) {
  return data.flatMap((insideOutside) => {
    return insideOutside.children.flatMap((area) => {
      return area.children.map((city) => ({
        id: createDcKey([city.insideOutside, city.areaName, city.cityName]),
        name: city.cityName,
        scope: city.insideOutside,
        area: city.areaName,
        children: city.children.map((campus) => ({
          id: createDcKey([
            campus.insideOutside,
            campus.areaName,
            campus.cityName,
            campus.campusName
          ]),
          name: campus.campusName,
          scope: campus.insideOutside,
          area: campus.areaName,
          cityName: campus.cityName
        }))
      }));
    });
  });
}

export function useDcFilterOptions() {
  const dcOptions = ref(null);
  const loadingDcOptions = ref(true);
  const dcOptionsError = ref('');
  const {
    allMode: dcAllMode,
    dcIds: selectedDcIds
  } = storeToRefs(useSelectedDc());

  async function fetchDcFilterOptions() {
    loadingDcOptions.value = true;
    dcOptionsError.value = '';

    try {
      const res = await getDcFilterOptions();

      if (res.status === 403) {
        dcOptions.value = null;
        selectedDcIds.value = [];
        dcOptionsError.value = '暂无 DC 筛选权限';
        return;
      }

      if (res.status === 200) {
        const options = normalizeDcOptions(res.data);
        dcOptions.value = options;
        selectedDcIds.value = options.flatMap((city) => {
          return city.children.map((dataCenter) => dataCenter.id);
        });
        dcAllMode.value = true;
        return;
      }

      dcOptions.value = null;
      selectedDcIds.value = [];
      dcOptionsError.value = 'DC 筛选项加载失败';
    } catch (error) {
      dcOptions.value = null;
      selectedDcIds.value = [];
      dcOptionsError.value = 'DC 筛选项加载失败';
    } finally {
      loadingDcOptions.value = false;
    }
  }

  fetchDcFilterOptions();

  return {
    dcOptions,
    loadingDcOptions,
    dcOptionsError
  };
}
