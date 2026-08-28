<template>
  <div class="segment-tabs" :class="variant">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="{ active: option.value === modelValue }"
      @click="selectOption(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

function selectOption(value) {
  emit('update:modelValue', value);
}
</script>

<style lang="less" scoped>
.segment-tabs {
  display: flex;
  align-items: center;
}

.segment-tabs button {
  position: relative;
  color: #706a86;
  background: transparent;
  font-size: 14px;
}

.segment-tabs.underline {
  gap: 24px;
}

.segment-tabs.underline button {
  padding: 8px 3px;
}

.segment-tabs.underline button.active {
  color: #241c4f;
  font-weight: 700;
}

.segment-tabs.underline button.active::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  border-radius: 2px;
  background: #536ee7;
  content: '';
}

.segment-tabs.block {
  gap: 2px;
  padding: 2px;
  border-radius: 4px;
  background: #f1f3fa;
}

.segment-tabs.block button {
  min-width: 34px;
  padding: 4px 8px;
  border-radius: 3px;
}

.segment-tabs.block button.active {
  color: #fff;
  background: #526be1;
}
</style>
