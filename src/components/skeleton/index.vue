<template>
  <span
    :class="loading ? 'skeleton-block' : 'skeleton-content'"
    :style="loading ? skeletonStyle : null"
  >
    <slot v-if="!loading"></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  width: {
    type: [Number, String],
    required: true,
  },
  height: {
    type: [Number, String],
    required: true,
  },
});

function getSize(value) {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
}

const skeletonStyle = computed(() => {
  return {
    width: getSize(props.width),
    height: getSize(props.height),
  };
});
</script>

<style lang="less" scoped>
.skeleton-block {
  display: block;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #f1f2f5 25%,
    #e4e6eb 37%,
    #f1f2f5 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.skeleton-content {
  display: contents;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
