<template>
  <metric-item
    class="general-metric-item"
    :metric="metric"
    :compact="compact"
    :loading="loading"
    :failed="failed"
    :show-ratio="showRatio"
    :show-list="metric.showList"
    :up-green="upGreen"
  />
</template>

<script setup>
import MetricItem from '@/components/cloud-operation/MetricItem.vue';

defineProps({
  metric: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  failed: {
    type: Boolean,
    required: true,
  },
  showRatio: {
    type: Boolean,
    default: false,
  },
  upGreen: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="less" scoped>
.general-metric-item {
  width: 100%;
}

:deep(.general-metric-item .list) {
  margin-top: 8px;
}
</style>
