import { ref, watch } from 'vue';
import {
  getResourceGeneral,
  getResourceOverview,
  getResourceXpu,
} from './overviewMock.js';

export const loading = ref(true);
export const overviewLoading = ref(true);
export const xpuLoading = ref(true);
export const generalLoading = ref(true);
export const overviewFailed = ref(false);
export const xpuFailed = ref(false);
export const generalFailed = ref(false);

export const resourceOverviewData = ref({});
export const resourceXpuData = ref({});
export const resourceGeneralData = ref({});

export function useResourceOverview(filters) {
  const loadDataByOverview = async () => {
    overviewLoading.value = true;
    overviewFailed.value = false;
    resourceOverviewData.value = {};
    try {
      const res = await getResourceOverview(filters.value);
      if (res.status === 200) {
        resourceOverviewData.value = res.data ?? {};
      }
    } catch (error) {
      overviewFailed.value = true;
      console.error('资源概览接口请求失败:', error);
    } finally {
      overviewLoading.value = false;
    }
  };

  const loadDataByXpu = async () => {
    xpuLoading.value = true;
    xpuFailed.value = false;
    resourceXpuData.value = {};
    try {
      const res = await getResourceXpu(filters.value);
      if (res.status === 200) {
        resourceXpuData.value = res.data ?? {};
      }
    } catch (error) {
      xpuFailed.value = true;
      console.error('XPU 概览接口请求失败:', error);
    } finally {
      xpuLoading.value = false;
    }
  };

  const loadDataByGeneral = async () => {
    generalLoading.value = true;
    generalFailed.value = false;
    resourceGeneralData.value = {};
    try {
      const res = await getResourceGeneral(filters.value);
      if (res.status === 200) {
        resourceGeneralData.value = res.data ?? {};
      }
    } catch (error) {
      generalFailed.value = true;
      console.error('通算概览接口请求失败:', error);
    } finally {
      generalLoading.value = false;
    }
  };

  watch(
    filters,
    () => {
      loadDataByOverview();
      loadDataByXpu();
      loadDataByGeneral();
    },
    { deep: true, immediate: true }
  );

  return {
    loading,
    overviewLoading,
    xpuLoading,
    generalLoading,
    overviewFailed,
    xpuFailed,
    generalFailed,
    resourceOverviewData,
    resourceXpuData,
    resourceGeneralData
  };
}
