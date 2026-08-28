<template>
  <span class="trend-value" :class="direction">
    <span class="trend-arrow">{{ arrow }}</span>
    <span>{{ value }}{{ unit }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const arrow = computed(() => {
  if (props.direction === 'up') {
    return '▲';
  }

  return '▼';
});
</script>

<style lang="less" scoped>
.trend-value {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
}

.trend-value.up {
  color: #19bfa8;
}

.trend-value.down {
  color: #ef5370;
}

.trend-arrow {
  font-size: 8px;
}
</style>
