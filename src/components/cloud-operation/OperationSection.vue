<template>
  <section class="operation-section">
    <h2 class="section-title">
      <span class="section-mark"></span>
      <span>{{ title }}</span>
    </h2>
    <div class="section-content">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style lang="less" scoped>
.operation-section {
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;
  color: #251c4e;
  font-size: 17px;
  font-weight: 700;
  line-height: 24px;
}

.section-mark {
  width: 4px;
  height: 22px;
  border-radius: 3px;
  background: #536ee7;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
