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
              :class="{
                active: isScopeSelected(item.value),
                partial: isScopeIndeterminate(item.value)
              }"
              type="button"
              @click="toggleScope(item.value)"
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
              :class="{
                active: isAreaSelected(item),
                partial: isAreaIndeterminate(item)
              }"
              type="button"
              @click="toggleArea(item)"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <div class="region-list-title">Region</div>
        <div ref="regionListRef" class="region-list">
          <van-checkbox
            :model-value="isAllSelected()"
            shape="square"
            class="region-row"
            @click="toggleAll"
          >
            全部
          </van-checkbox>

          <van-checkbox
            v-for="option in visibleOptions"
            :key="option.id"
            :data-selector-id="option.id"
            :model-value="isRegionSelected(option)"
            shape="square"
            class="region-row"
            @click="toggleRegion(option)"
          >
            {{ option.name }}
          </van-checkbox>

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
import { useRegionSelector } from './useRegionSelector.js';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  selectedIds: {
    type: Array,
    required: true
  },
  allMode: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['cancel', 'confirm']);
const {
  areaOptions,
  cancel,
  confirm,
  isAllSelected,
  isAreaIndeterminate,
  isAreaSelected,
  isRegionSelected,
  isScopeIndeterminate,
  isScopeSelected,
  keyword,
  pendingIds,
  regionListRef,
  scopeOptions,
  toggleArea,
  toggleAll,
  toggleRegion,
  toggleScope,
  visibleOptions
} = useRegionSelector(props, emit);
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
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 5px;
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

.filter-chip.partial {
  border-color: #a99fe0;
  color: #5f4cc4;
  background: #faf8ff;
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

.region-row {
  width: 100%;
  min-height: 38px;
  padding: 7px 6px;
  border-bottom: 1PX solid #eeeeF3;
  background: #fff;
  text-align: left;
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
