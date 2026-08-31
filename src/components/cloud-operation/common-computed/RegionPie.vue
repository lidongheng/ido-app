<template>
  <donut-chart
    :data="data"
    :center-value="summary.value"
    :center-label="summary.label"
    :height="height"
  />
</template>

<script setup>
import DonutChart from '@/components/cloud-operation/DonutChart.vue';

defineProps({
  data: {
    type: Array,
    required: true,
  },
  summary: {
    type: Object,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});
</script>
