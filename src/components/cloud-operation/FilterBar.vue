<template>
  <header class="filter-bar">
    <div class="filter-left">
      <strong class="global-label">全球</strong>
      <button class="filter-button date-button" type="button" @click="openDatePicker">
        <span>时间：{{ selectedDate }}</span>
        <van-icon name="arrow-down" />
      </button>
    </div>
    <button class="filter-button region-button" type="button" @click="emit('open-region')">
      <span>{{ regionLabel }}</span>
      <van-icon name="arrow-down" />
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
import { ref } from 'vue'

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
  selectedDate: {
    type: String,
    required: true
  },
  regionLabel: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['date-change', 'open-region'])
const showDatePicker = ref(false)
const pendingDate = ref(parseDate(props.selectedDate))

function openDatePicker() {
  pendingDate.value = parseDate(props.selectedDate)
  showDatePicker.value = true
}

function confirmDate(value) {
  emit('date-change', formatDate(value))
  showDatePicker.value = false
}
</script>

<style lang="less" scoped>
.filter-bar {
  display: flex;
  min-height: 1.35rem;
  align-items: center;
  justify-content: space-between;
  padding: .21rem .43rem;
  border-bottom: 1PX solid #ececf2;
  background: #fff;
}

.filter-left {
  display: flex;
  min-width: 0;
  align-items: center;
}

.global-label {
  flex-shrink: 0;
  margin-right: .27rem;
  color: #241b4a;
  font-size: .4rem;
}

.filter-button {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: .08rem;
  color: #3e365f;
  background: transparent;
  font-size: .36rem;
  cursor: pointer;
}

.date-button span,
.region-button span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.region-button {
  max-width: 3.2rem;
  justify-content: flex-end;
  margin-left: .21rem;
}

:deep(.van-popup) {
  max-width: 500PX;
  left: 50%;
  transform: translateX(-50%);
}
</style>
