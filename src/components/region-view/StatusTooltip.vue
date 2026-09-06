<template>
  <div class="status-tooltip">
    <div v-for="item in statusItems" :key="item.label" class="status-item">
      <span class="status-dot" :class="item.tone"></span>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
const statusItems = [
  { label: '正常', tone: 'success' },
  { label: '关注', tone: 'warning' },
  { label: '风险', tone: 'danger' },
];
</script>

<style lang="less" scoped>
.status-tooltip {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 52px;
  color: #353575;
  font-size: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.success {
  background: #20b486;
}

.status-dot.warning {
  background: #f5a623;
}

.status-dot.danger {
  background: #e85b72;
}
</style>
