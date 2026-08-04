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
  padding: .08rem .11rem;
  position: relative;
}

.metric-item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: .05rem;
  right: 0;
  height: 1.55rem;
  border-right: 1PX dashed #e5e6ee;
}

.metric-label {
  display: flex;
  align-items: center;
  min-height: .51rem;
  color: #2c2357;
  font-size: .34rem;
  font-weight: 600;
  white-space: nowrap;
}

.metric-icon {
  flex-shrink: 0;
  margin-right: .09rem;
  color: #5c4bc4;
  font-size: .48rem;
}

.metric-value-row {
  display: flex;
  align-items: baseline;
  margin-top: .19rem;
  white-space: nowrap;
}

.metric-value {
  color: #271c58;
  font-size: .51rem;
  font-weight: 700;
  line-height: .75rem;
}

.metric-unit {
  flex-shrink: 0;
  margin-left: .05rem;
  color: #4e466c;
  font-size: .27rem;
}

.metric-trend {
  display: flex;
  align-items: center;
  margin-top: .16rem;
  color: #5e5873;
  font-size: .31rem;
  white-space: nowrap;
}

.trend-value {
  margin-left: .08rem;
}

.trend-arrow {
  font-size: .24rem;
}

.trend-value.danger {
  color: #df5b72;
}

.trend-value.success {
  color: #1ba88a;
}

.compact {
  padding: 0 .08rem;
}

.compact .metric-label {
  color: #47405e;
  font-size: .32rem;
  font-weight: 500;
}

.compact .metric-value-row {
  margin-top: .11rem;
}

.compact .metric-value {
  font-size: .45rem;
  font-weight: 500;
  line-height: .64rem;
}

.compact .metric-trend {
  display: none;
}
</style>
