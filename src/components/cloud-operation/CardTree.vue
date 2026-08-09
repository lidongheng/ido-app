<template>
  <div class="card-tree">
    <div
      :class="['tree-item', `h-${index === 0 ? 24 : props.cardHeight + 8}`]"
      v-for="(item, index) in data.length"
      :key="index"
    ></div>
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
  },
});
</script>

<style lang="less" scoped>
.h-24 {
  height: 24px;
}
.h-82 {
  height: 82px;
}
.card-tree {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.tree-item {
  border-left: 4px solid #e5e6ea;
  border-bottom: 4px solid #e5e6ea;
  width: 10px;
}
</style>
