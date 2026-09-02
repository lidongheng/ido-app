<template>
  <header class="filter-bar">
    <div class="filter-left">
      <button class="filter-button date-button" type="button" @click="openDatePicker">
        <span>时间：{{ selectedDate }}</span>
        <van-icon name="arrow-down" />
      </button>
    </div>
    <button
      class="filter-button region-button"
      type="button"
      :disabled="regionDisabled"
      @click="emit('open-region')"
    >
      <span class="region-label">
        <span class="region-name">{{ displayRegionLabel }}</span>
        <span v-if="regionCountLabel" class="region-count">{{ regionCountLabel }}</span>
      </span>
      <van-icon :name="regionOpen ? 'arrow-up' : 'arrow-down'" />
    </button>

    <van-popup v-model:show="showDatePicker" position="bottom" round>
      <van-datetime-picker
        v-model="pendingDate"
        type="date"
        title="选择日期"
        @confirm="confirmDate"
        @cancel="showDatePicker = false"
      />
    </van-popup>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentDate } from '@/stores/useCurrentDate.js'

function parseDate(value) {
  return new Date(`${value}T00:00:00`)
}

function formatDate(value) {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const props = defineProps({
  regionCountLabel: {
    type: String,
    required: true
  },
  regionLabel: {
    type: String,
    required: true
  },
  regionOpen: {
    type: Boolean,
    required: true
  },
  regionDisabled: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['open-region'])
const currentDate = useCurrentDate()
const { date: selectedDate } = storeToRefs(currentDate)
const showDatePicker = ref(false)
const pendingDate = ref(parseDate(selectedDate.value))
const displayRegionLabel = computed(() => {
  if (props.regionLabel === '全部') {
    return '全球';
  }

  return props.regionLabel;
});

function openDatePicker() {
  pendingDate.value = parseDate(selectedDate.value)
  showDatePicker.value = true
}

function confirmDate(value) {
  selectedDate.value = formatDate(value)
  showDatePicker.value = false
}
</script>

<style lang="less" scoped>
.filter-bar {
  position: relative;
  z-index: 30;
  display: flex;
  width: 100%;
  max-width: 500PX;
  min-height: 32px;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1PX solid #ececf2;
  background: #fff;
  margin: 0 auto;
}

.filter-left {
  display: flex;
  min-width: 0;
  align-items: center;
}

.filter-button {
  display: flex;
  min-width: 0;
  align-items: flex-end;
  gap: 3px;
  color: #3e365f;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
}

.date-button span,
.region-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.region-label {
  display: flex;
  min-width: 0;
  align-items: flex-end;
}

.region-name {
  min-width: 0;
}

.region-count,
.region-button .van-icon {
  flex-shrink: 0;
}

.region-button {
  max-width: 120px;
  justify-content: flex-end;
  margin-left: 8px;
}

.region-button:disabled {
  color: #9a96aa;
  cursor: default;
}

:deep(.van-popup) {
  max-width: 500PX;
  left: 50%;
  transform: translateX(-50%);
}
</style>
