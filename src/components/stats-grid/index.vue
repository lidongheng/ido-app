<template>
  <div class="stats-grid" :class="[`columns-${columns}`, `gap-${gap}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'StatsGrid',
  props: {
    columns: {
      type: [Number, String],
      default: 2,
      validator: (value) => [1, 2, 3, 4].includes(Number(value))
    },
    gap: {
      type: String,
      default: 'medium', // small, medium, large
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  }
}
</script>

<style lang="less" scoped>
.stats-grid {
  display: grid;
  
  &.columns-1 {
    grid-template-columns: 1fr;
  }
  
  &.columns-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  &.columns-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  
  &.columns-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  
  &.gap-small {
    gap: .27rem;
  }
  
  &.gap-medium {
    gap: .43rem;
  }
  
  &.gap-large {
    gap: .64rem;
  }
}
</style>

