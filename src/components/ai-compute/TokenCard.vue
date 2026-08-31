<template>
  <div class="token-metrics">
    <template v-for="(metric, index) in metrics" :key="metric.label">
      <div class="token-metric">
        <div class="token-metric-value-row">
          <span class="token-metric-value">{{ metric.value }}</span>
          <span class="token-metric-unit">{{ metric.unit }}</span>
        </div>
        <div class="token-metric-label">{{ metric.label }}</div>
      </div>
      <div v-if="index !== metrics.length - 1" class="token-metric-divider"></div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  metrics: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.token-metrics {
  display: flex;
  min-height: 72px;
  gap: 0;
  margin-top: 10px;
  padding: 9px 0;
  overflow: hidden;
  border: 1.6px solid #e5edfc;
  border-radius: 8px;
}

.token-metric {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 14px;
}

.token-metric-value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  white-space: nowrap;
}

.token-metric-value {
  color: #33336b;
  font-family: 'Microsoft YaHei';
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
}

.token-metric-unit {
  color: #595a8a;
  font-family: 'Microsoft YaHei';
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.token-metric-label {
  min-height: 0;
  margin-top: 7px;
  color: #5d5874;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  white-space: nowrap;
}

.token-metric-divider {
  width: 1px;
  margin: 4px 0;
  border-right: 1px dashed #e5e6ee;
}
</style>
