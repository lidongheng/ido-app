import { computed } from 'vue';
import { useTrendOptions } from '@/views/cloud-operation/useTrendOptions.js';

export function useRegionTrendAnalysis(trendData, unit) {
  const options = computed(() => {
    return useTrendOptions(trendData.value.categories, trendData.value.series, unit.value);
  });

  return {
    options,
  };
}
