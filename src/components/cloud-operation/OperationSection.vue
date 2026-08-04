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
  margin-bottom: .64rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: .19rem;
  margin-bottom: .27rem;
  color: #251c4e;
  font-size: .45rem;
  font-weight: 700;
  line-height: .64rem;
}

.section-mark {
  width: .11rem;
  height: .59rem;
  border-radius: .08rem;
  background: #536ee7;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: .27rem;
}
</style>
