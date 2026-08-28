<template>
  <button class="data-link" type="button" @click="emit('click')">{{ text }}</button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['click']);
</script>

<style lang="less" scoped>
.data-link {
  color: #5e65a8;
  background: transparent;
  font-size: inherit;
  line-height: inherit;
  text-align: left;
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
