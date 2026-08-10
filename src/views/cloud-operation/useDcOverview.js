import { ref, watch } from 'vue';
import { getDcOverview } from './overviewMock.js';

export const loading = ref(true);
export const failed = ref(false);
export const dcData = ref({});

export function useDcOverview(filters) {
  const loadData = async () => {
    loading.value = true;
    failed.value = false;
    dcData.value = {};
    try {
      const res = await getDcOverview(filters.value);
      if (res.status === 200) {
        dcData.value = res.data ?? {};
      }
    } catch (error) {
      failed.value = true;
      console.error('DC 概览接口请求失败:', error);
    } finally {
      loading.value = false;
    }
  };

  watch(
    filters,
    () => {
      loadData();
    },
    {
      deep: true,
      immediate: true,
    }
  );
}
