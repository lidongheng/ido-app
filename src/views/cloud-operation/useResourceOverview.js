import { ref, watch } from 'vue';
import api from '@/service/index';

export const loading = ref(true);
export const overviewLoading = ref(true);
export const xpuLoading = ref(true);
export const generalLoading = ref(true);

export const resourceOverviewData = ref({});
export const resourceXpuData = ref({});
export const resourceGeneralData = ref({});

export function useResourceOverview(filters) {
  const loadDataByOverview = async () => {
    overviewLoading.value = true;
    resourceOverviewData.value = {};
    try {
      const res = await api.operate.getResourceOverview(filters.value);
      if (res.status === 200) {
        resourceOverviewData.value = res.data ?? {};
      }
    } finally {
      overviewLoading.value = false;
    }
  };

  const loadDataByXpu = async () => {
    xpuLoading.value = true;
    resourceXpuData.value = {};
    try {
      const res = await api.operate.getResourceXpu(filters.value);
      if (res.status === 200) {
        resourceXpuData.value = res.data ?? {};
      }
    } finally {
      xpuLoading.value = false;
    }
  };

  const loadDataByGeneral = async () => {
    generalLoading.value = true;
    resourceGeneralData.value = {};
    try {
      const res = await api.operate.getResourceGeneral(filters.value);
      if (res.status === 200) {
        resourceGeneralData.value = res.data ?? {};
      }
    } finally {
      generalLoading.value = false;
    }
  };

  watch(
    () => filters,
    () => {
      loadDataByOverview();
      loadDataByXpu();
      loadDataByGeneral();
    },
    { deep: true, immediate: true }
  );

  return { loading, overviewLoading, xpuLoading, generalLoading, resourceOverviewData, resourceXpuData, resourceGeneralData };
}