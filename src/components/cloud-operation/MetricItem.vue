<template>
  <div class="metric-item" :class="{ compact }">
    <div class="metric-label">
      <van-icon v-if="metric.icon" :name="metric.icon" class="metric-icon" />
      <span>{{ metric.label }}</span>
    </div>
    <div class="metric-value-row">
      <strong class="metric-value">{{ formattedValue }}</strong>
      <span class="metric-unit">{{ metric.unit }}</span>
    </div>
    <div v-if="metric.trend" class="metric-trend">
      <span>{{ metric.trend.label }}</span>
      <span class="trend-value" :class="metric.trend.tone">
        <span class="trend-arrow">{{ trendArrow }}</span>
        {{ metric.trend.value }}{{ metric.trend.unit }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  metric: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const formattedValue = computed(() => {
  if (typeof props.metric.value === 'number') {
    return props.metric.value.toLocaleString('zh-CN')
  }

  return props.metric.value
})

const trendArrow = computed(() => {
  if (props.metric.trend.direction === 'up') {
    return '▲'
  }

  return '▼'
})
</script>

<style lang="less" scoped>
.metric-item {
  min-width: 0;
  padding: 3px 4px;
  position: relative;
}

.metric-item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 0;
  height: 58px;
  border-right: 1PX dashed #e5e6ee;
}

.metric-label {
  display: flex;
  align-items: center;
  min-height: 19px;
  color: #2c2357;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.metric-icon {
  flex-shrink: 0;
  margin-right: 3px;
  color: #5c4bc4;
  font-size: 18px;
}

.metric-value-row {
  display: flex;
  align-items: baseline;
  margin-top: 7px;
  white-space: nowrap;
}

.metric-value {
  color: #271c58;
  font-size: 19px;
  font-weight: 700;
  line-height: 28px;
}

.metric-unit {
  flex-shrink: 0;
  margin-left: 2px;
  color: #4e466c;
  font-size: 10px;
}

.metric-trend {
  display: flex;
  align-items: center;
  margin-top: 6px;
  color: #5e5873;
  font-size: 12px;
  white-space: nowrap;
}

.trend-value {
  margin-left: 3px;
}

.trend-arrow {
  font-size: 9px;
}

.trend-value.danger {
  color: #df5b72;
}

.trend-value.success {
  color: #1ba88a;
}

.compact {
  padding: 0 3px;
}

.compact .metric-label {
  color: #47405e;
  font-size: 12px;
  font-weight: 500;
}

.compact .metric-value-row {
  margin-top: 4px;
}

.compact .metric-value {
  font-size: 17px;
  font-weight: 500;
  line-height: 24px;
}

.compact .metric-trend {
  display: none;
}
</style>
