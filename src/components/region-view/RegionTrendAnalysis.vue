<template>
  <common-echarts :options="options" />
</template>

<script setup>
import { toRef } from 'vue';
import CommonEcharts from '@/components/common-echarts/index.vue';
import { useRegionTrendAnalysis } from './useRegionTrendAnalysis.js';

const props = defineProps({
  trendData: {
    type: Object,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const { options } = useRegionTrendAnalysis(toRef(props, 'trendData'), toRef(props, 'unit'));
</script>
