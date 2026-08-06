<template>
<div class="card-tree">
  <div v-for="(item, index) in data" :key="index" class="tree-item"></div>
</div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  cardHeight: {
    type: Number,
    default: 0,
  }
});
</script>

<style lang="less" scoped>
.card-tree {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.tree-item {
  border-left: 4px solid #e5e6ea;
  border-bottom: 4px solid #e5e6ea;
  // height: var(--card-height);
  height: 82px; // 74 + 8
  width: 10px;
  &:first-child {
    height: 24px;
  }
}
</style>
