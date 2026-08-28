<template>
  <div class="card-tree">
    <div class="p-relative">
      <div class="vertical-gradient-bar" v-if="hasDynamic"></div>
      <div
        :class="['tree-item', `h-${index === 0 ? 24 : props.cardHeight + 8}`]"
        v-for="(item, index) in data.length"
        :key="index"
      >
        <div class="horizontal-gradient-bar" v-if="hasDynamic"></div>
      </div>
    </div>
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
  // 动态效果
  hasDynamic: {
    type: Boolean,
    default: false,
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
  position: relative;
  border-left: 4px solid #e5e6ea;
  border-bottom: 4px solid #e5e6ea;
  width: 10px;
}

.p-relative {
  position: relative;
  overflow: hidden;
}

.vertical-gradient-bar {
  width: 4px;
  height: 30px;
  border-radius: 2px;
  background: linear-gradient(to bottom, #e5e6ea, #4495f3);
  position: absolute;
  top: 0;
  animation: vertical-move-down 4s infinite;
  z-index: 2;
}

@keyframes vertical-move-down {
  0% {
    top: -40px;
  }
  100% {
    top: 100%;
  }
}

.horizontal-gradient-bar {
  width: 5px;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(to right, #e5e6ea, #4495f3);
  position: absolute;
  bottom: -4px;
  animation: horizontal-move-down 4s infinite;
  z-index: 2;
}

@keyframes horizontal-move-down {
  0% {
    left: -4px;
  }
  100% {
    left: 10px;
  }
}
</style>
