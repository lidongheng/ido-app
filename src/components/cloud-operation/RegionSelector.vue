<template>
  <teleport to="body">
    <div v-if="visible" class="region-layer">
      <button class="region-mask" type="button" aria-label="关闭筛选" @click="cancel"></button>
      <section class="region-panel">
        <van-search v-model="keyword" placeholder="请输入Region搜索" shape="round" />

        <div class="filter-group">
          <h3>区域</h3>
          <div class="chip-list region-chips">
            <button
              v-for="item in scopeOptions"
              :key="item.value"
              class="filter-chip"
              :class="{ active: activeScope === item.value }"
              type="button"
              @click="activeScope = item.value"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div class="filter-group">
          <h3>大区</h3>
          <div class="chip-list area-chips">
            <button
              v-for="item in areaOptions"
              :key="item"
              class="filter-chip"
              :class="{ active: activeArea === item }"
              type="button"
              @click="activeArea = item"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <div class="region-list-title">Region</div>
        <div class="region-list">
          <button class="select-all-row" type="button" @click="selectAll">
            <van-checkbox :model-value="allSelected" shape="square" @click.stop="selectAll">
              全部
            </van-checkbox>
          </button>

          <van-checkbox-group v-model="pendingIds">
            <van-checkbox
              v-for="option in visibleOptions"
              :key="option.id"
              :name="option.id"
              shape="square"
              class="region-row"
            >
              {{ option.name }}
            </van-checkbox>
          </van-checkbox-group>

          <van-empty v-if="visibleOptions.length === 0" description="未找到匹配的 Region" />
        </div>

        <footer class="panel-actions">
          <button
            class="confirm-button"
            type="button"
            :disabled="pendingIds.length === 0"
            @click="confirm"
          >
            确定
          </button>
        </footer>
      </section>
    </div>
  </teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSelectedRegion } from '@/stores/useSelectedRegion.js'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['cancel', 'confirm'])
const { regionIds: selectedRegionIds } = storeToRefs(useSelectedRegion())
const keyword = ref('')
const activeScope = ref('全部')
const activeArea = ref('全部')
const pendingIds = ref([])
let lockedScrollTop = 0
const scopeOptions = [
  { label: '全部', value: '全部' },
  { label: '国内', value: '国内' },
  { label: '海外', value: '海外' }
]
const areaOptions = [
  '全部',
  '华北',
  '华东',
  '西南',
  '西北',
  '亚太',
  '中东',
  '非洲',
  '拉美',
  '欧洲',
  '土耳其'
]

const allSelected = computed(() => pendingIds.value.length === props.options.length)

const visibleOptions = computed(() => {
  return props.options.filter((option) => {
    const matchesKeyword = option.name.includes(keyword.value.trim())
    const matchesScope = activeScope.value === '全部' || option.scope === activeScope.value
    const matchesArea = activeArea.value === '全部' || option.area === activeArea.value

    return matchesKeyword && matchesScope && matchesArea
  })
})

watch(() => props.visible, (value) => {
  if (!value) {
    unlockPageScroll()
    return
  }

  lockPageScroll()
  pendingIds.value = [...selectedRegionIds.value]
  keyword.value = ''
  activeScope.value = '全部'
  activeArea.value = '全部'
})

onBeforeUnmount(() => {
  if (props.visible) {
    unlockPageScroll()
  }
})

function lockPageScroll() {
  lockedScrollTop = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${lockedScrollTop}px`
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
}

function unlockPageScroll() {
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  document.body.style.overflow = ''
  window.scrollTo(0, lockedScrollTop)
}

function selectAll() {
  pendingIds.value = props.options.map((option) => option.id)
}

function cancel() {
  emit('cancel')
}

function confirm() {
  if (pendingIds.value.length === 0) {
    return
  }

  // 保持 Region 固定顺序，顶部摘要和请求参数不会随点击顺序变化。
  const selectedSet = new Set(pendingIds.value)
  const orderedIds = props.options
    .filter((option) => selectedSet.has(option.id))
    .map((option) => option.id)

  selectedRegionIds.value = orderedIds
  emit('confirm')
}
</script>

<style lang="less" scoped>
.region-layer {
  position: fixed;
  top: 51px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
  display: flex;
  justify-content: center;
}

.region-mask {
  position: absolute;
  inset: 0;
  background: rgba(20, 17, 38, 0.52);
  touch-action: none;
}

.region-panel {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(100%, 500PX);
  height: 75vh;
  max-height: calc(100vh - 51px);
  flex-direction: column;
  overflow: hidden;
  padding: 8px 12px 10px;
  border-radius: 0 0 10px 10px;
  background: #fff;
}

:deep(.van-search) {
  padding: 0 0 7px;
}

:deep(.van-search__content) {
  background: #f5f5f8;
}

.filter-group {
  margin-bottom: 7px;
}

.filter-group h3,
.region-list-title {
  margin-bottom: 5px;
  color: #2a2153;
  font-size: 15px;
  font-weight: 700;
}

.chip-list {
  display: grid;
  gap: 5px;
}

.region-chips {
  grid-template-columns: repeat(3, 1fr);
}

.area-chips {
  grid-template-columns: repeat(5, 1fr);
}

.filter-chip {
  min-height: 26px;
  padding: 2px 4px;
  border: 1PX solid transparent;
  border-radius: 4px;
  color: #4e4664;
  background: #f8f8fa;
  font-size: 13px;
}

.filter-chip.active {
  border-color: #5f4cc4;
  color: #4a38ad;
  background: #f5f2ff;
}

.region-list-title {
  margin-top: 1px;
}

.region-list {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  border-top: 1PX solid #ececf2;
  -webkit-overflow-scrolling: touch;
}

.select-all-row,
.region-row {
  width: 100%;
  min-height: 38px;
  padding: 7px 6px;
  border-bottom: 1PX solid #eeeeF3;
  background: #fff;
  text-align: left;
}

.select-all-row {
  border: 1PX solid #5c49c3;
  border-radius: 5px;
}

:deep(.van-checkbox__label) {
  color: #3b315e;
  font-size: 13px;
}

:deep(.van-checkbox__icon--checked .van-icon) {
  border-color: #5c49c3;
  background: #5c49c3;
}

.panel-actions {
  padding-top: 8px;
}

.panel-actions button {
  width: 100%;
  min-height: 32px;
  border-radius: 5px;
  font-size: 14px;
}

.confirm-button {
  color: #fff;
  background: #5b49c2;
}

.confirm-button:disabled {
  opacity: .45;
}

@media (max-width: 360px) {
  .area-chips {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
