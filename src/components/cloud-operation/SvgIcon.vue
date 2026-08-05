<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  iconName: {
    required: true,
    type: String
  }
})
const iconName = computed(() => `#icon-${props.iconName}`)
</script>

<style scoped lang="less">
.svg-icon {
  width: 16px;
  min-width: 16px;
  height: 16px;
  min-height: 16px;
  vertical-align: -2.4px;
  fill: currentColor;
  overflow: hidden;
}
</style>
