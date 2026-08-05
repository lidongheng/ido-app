import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSelectedDc } from '@/stores/useSelectedDc.js';
import { getDcFilterOptions } from './mock.js';

export function useDcFilterOptions() {
  const dcOptions = ref(null);
  const loadingDcOptions = ref(true);
  const dcOptionsError = ref('');
  const { dcIds: selectedDcIds } = storeToRefs(useSelectedDc());

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
        dcOptions.value = res.data;
        selectedDcIds.value = res.data.flatMap((city) => {
          return city.children.map((dataCenter) => dataCenter.id);
        });
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
