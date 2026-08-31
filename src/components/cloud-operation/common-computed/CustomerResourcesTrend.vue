<template>
  <donut-chart
    :data="data"
    :center-value="summary.value"
    :center-label="summary.label"
    :height="245"
  />
</template>

<script setup>
import DonutChart from '@/components/ai-compute/DonutChart.vue';

defineProps({
  data: {
    type: Array,
    required: true,
  },
  summary: {
    type: Object,
    required: true,
  },
});
</script>
