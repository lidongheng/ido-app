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

export const resourceOverviewData = ref({});
export const resourceXpuData = ref({});
export const resourceGeneralData = ref({});

export function useResourceOverview(filters) {
  const loadDataByOverview = async () => {
    overviewLoading.value = true;
    resourceOverviewData.value = {};
    try {
      const res = await getResourceOverview(filters.value);
      if (res.status === 200) {
        resourceOverviewData.value = res.data ?? {};
      }
    } catch (error) {
      console.error('资源概览接口请求失败:', error);
    } finally {
      overviewLoading.value = false;
    }
  };

  const loadDataByXpu = async () => {
    xpuLoading.value = true;
    resourceXpuData.value = {};
    try {
      const res = await getResourceXpu(filters.value);
      if (res.status === 200) {
        resourceXpuData.value = res.data ?? {};
      }
    } catch (error) {
      console.error('XPU 概览接口请求失败:', error);
    } finally {
      xpuLoading.value = false;
    }
  };

  const loadDataByGeneral = async () => {
    generalLoading.value = true;
    resourceGeneralData.value = {};
    try {
      const res = await getResourceGeneral(filters.value);
      if (res.status === 200) {
        resourceGeneralData.value = res.data ?? {};
      }
    } catch (error) {
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

  return { loading, overviewLoading, xpuLoading, generalLoading, resourceOverviewData, resourceXpuData, resourceGeneralData };
}
