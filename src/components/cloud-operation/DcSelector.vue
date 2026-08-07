<template>
  <teleport to="body">
    <div v-if="visible" class="dc-layer">
      <button class="dc-mask" type="button" aria-label="关闭筛选" @click="cancel"></button>
      <section class="dc-panel">
        <van-search v-model="keyword" placeholder="请输入城市搜索" shape="round" />

        <div class="filter-group">
          <h3>区域</h3>
          <div class="chip-list scope-chips">
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

        <div class="city-list-title">城市</div>
        <div class="city-list">
          <div
            v-if="visibleTree.length > 0"
            class="dc-tree"
          >
            <div
              v-for="city in visibleTree"
              :key="city.id"
              class="city-group"
            >
              <div
                class="tree-option city-option"
                :class="{
                  active: isCitySelected(city),
                  partial: isCityIndeterminate(city)
                }"
                @click="toggleItem(city, true)"
              >
                <el-checkbox
                  :model-value="isCitySelected(city)"
                  :indeterminate="isCityIndeterminate(city)"
                  @click.stop="toggleItem(city, true)"
                >
                  {{ city.name }}
                </el-checkbox>
                <van-icon
                  class="expand-icon"
                  :name="isCityExpanded(city) ? 'arrow-up' : 'arrow-down'"
                  @click.stop="toggleCityExpanded(city)"
                />
              </div>

              <div v-if="isCityExpanded(city)" class="children-list">
                <div
                  v-for="dataCenter in city.visibleChildren"
                  :key="dataCenter.id"
                  class="tree-option child-option"
                >
                  <el-checkbox
                    :model-value="isDataCenterSelected(dataCenter)"
                    @click.stop="toggleItem(dataCenter, false)"
                  >
                    {{ dataCenter.name }}
                  </el-checkbox>
                </div>
              </div>
            </div>
          </div>

          <van-empty v-else description="未找到匹配的城市" />
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
import { useDcSelector } from './useDcSelector.js';

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
  isAreaIndeterminate,
  isAreaSelected,
  isCityExpanded,
  isCityIndeterminate,
  isCitySelected,
  isDataCenterSelected,
  isScopeIndeterminate,
  isScopeSelected,
  keyword,
  pendingIds,
  scopeOptions,
  toggleArea,
  toggleCityExpanded,
  toggleItem,
  toggleScope,
  visibleTree
} = useDcSelector(props, emit);
</script>

<style lang="less" scoped>
.dc-layer {
  position: fixed;
  top: 51px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
  display: flex;
  justify-content: center;
}

.dc-mask {
  position: absolute;
  inset: 0;
  background: rgba(20, 17, 38, .52);
  touch-action: none;
}

.dc-panel {
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
.city-list-title {
  margin-bottom: 5px;
  color: #2a2153;
  font-size: 15px;
  font-weight: 700;
}

.chip-list {
  display: grid;
  gap: 5px;
}

.scope-chips {
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

.filter-chip.partial,
.city-option.partial {
  border-color: #a99fe0;
  color: #5f4cc4;
  background: #faf8ff;
}

.city-option.active {
  background: #f5f2ff;
}

.city-list-title {
  margin-top: 1px;
}

.city-list {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  border-top: 1PX solid #ececf2;
  -webkit-overflow-scrolling: touch;
}

.tree-option {
  width: 100%;
  height: 40PX;
  min-height: 40PX;
  padding: 0 8PX;
  border-bottom: 1PX solid #eeeef3;
  background: #fff;
  text-align: left;
}

.tree-option {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.dc-tree,
.children-list {
  position: relative;
}

.city-option {
  padding-left: 8PX;
}

.children-list {
  margin-left: 16PX;
}

.children-list::before {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 20PX;
  left: 0;
  width: 2px;
  background: #d8d5e4;
  content: '';
}

.child-option {
  padding-left: 14PX;
}

.child-option::before {
  position: absolute;
  z-index: 1;
  top: 19PX;
  left: 0;
  width: 10PX;
  height: 2px;
  background: #d8d5e4;
  content: '';
}

.expand-icon {
  flex-shrink: 0;
  color: #4e4664;
  font-size: 16px;
}

:deep(.el-checkbox__label) {
  color: #3b315e;
  font-size: 13px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner),
:deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  border-color: #5c49c3;
  background: #5c49c3;
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #3b315e;
}

.panel-actions {
  padding-top: 8px;
}

.confirm-button {
  width: 100%;
  min-height: 32px;
  border-radius: 5px;
  color: #fff;
  background: #5b49c2;
  font-size: 14px;
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
