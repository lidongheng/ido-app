import { ref, watch } from 'vue';
import api from '@/service/index';

export const loading = ref(true);
export const dcData = ref({});

export function useDcOverview(filters) {
  const loadData = async () => {
    loading.value = true;
    dcData.value = {};
    try {
      const res = await api.operate.getDcOverview(filters.value);
      if (res.status === 200) {
        dcData.value = res.data ?? {};
      }
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => filters,
    () => {
      loadData();
    },
    {
      deep: true,
      immediate: true,
    }
  );
}
