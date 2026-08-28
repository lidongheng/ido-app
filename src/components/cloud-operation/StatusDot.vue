<template>
  <span class="status-dot" :class="tone" :aria-label="label"></span>
</template>

<script setup>
defineProps({
  tone: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.status-dot {
  display: inline-block;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(35, 33, 77, 0.18);
}

.status-dot.success {
  background: #14bea9;
}

.status-dot.warning {
  background: #f2ab31;
}

.status-dot.danger {
  background: #ef5570;
}
</style>
