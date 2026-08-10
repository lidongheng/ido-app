<template>
  <div class="skeleton-box">
    <div
      v-if="loading"
      :class="{
        'skeleton-content': true,
        circle: variant === 'circle'
      }"
      :style="styleValue"
    ></div>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    styleValue() {
      let height = 0;
      if (this.variant === 'circle') {
        height = this.width ? `${this.width}px` : '100%';
      } else {
        height = this.height ? `${this.height}px` : '100%';
      }
      const styleValue = {
        width: this.width ? `${this.width}px` : '100%',
        height: height,
      };
      return styleValue;
    },
  },
};
</script>

<style lang="less" scoped>
.skeleton-box {
  width: inherit;
  height: inherit;
}
.skeleton-content {
  width: 60%;
  height: 18px;
  background: #f0f2f5;
  border-radius: 4px;
  animation: skeleton-loading 1.5s infinite ease-in-out;
}
.circle {
  border-radius: 50% !important;
}

@keyframes skeleton-loading {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>