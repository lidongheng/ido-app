<template>
  <van-popup
    :show="visible"
    class="detail-popup"
    position="bottom"
    round
    closeable
    :z-index="40"
    :style="drawerStyle"
    @update:show="updateVisible"
  >
    <section ref="drawerRef" class="detail-drawer">
      <div
        class="drag-handle"
        role="separator"
        aria-label="调整抽屉高度"
        aria-orientation="horizontal"
        @pointerdown="handleDragStart"
        @pointermove="handleDragMove"
        @pointerup="handleDragEnd"
        @pointercancel="handleDragEnd"
        @lostpointercapture="handleDragEnd"
      >
        <span class="drag-handle-line"></span>
      </div>
      <div class="drawer-header">
        <h2>
          <span class="title-line"></span>
          {{ title }}
        </h2>
      </div>
      <div class="drawer-content">
        <table-list
          class="drawer-table"
          :table-column="drawerColumns"
          :table-data="rows"
          :default-sort="{}"
          :table-config="drawerTableConfig"
        />
      </div>
    </section>
  </van-popup>
</template>

<script setup>
import TableList from '@/components/cloud-operation/TableList.vue';
import { useDetailDrawer } from './useDetailDrawer.js';

const props = defineProps({
  detailType: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:visible']);
const {
  drawerColumns,
  drawerRef,
  drawerStyle,
  drawerTableConfig,
  handleDragEnd,
  handleDragMove,
  handleDragStart,
} = useDetailDrawer(
  () => props.visible,
  () => props.detailType
);

function updateVisible(value) {
  emit('update:visible', value);
}
</script>

<style lang="less" scoped>
:global(.detail-popup.van-popup--bottom) {
  right: auto;
  left: 50%;
  width: 100%;
  max-width: 500PX;
  overflow: hidden;
  background: #fff;
  transform: translateX(-50%);
}

.detail-drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
}

.drag-handle {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 36px;
  cursor: ns-resize;
  touch-action: none;
}

.drag-handle-line {
  width: 64px;
  height: 5px;
  border-radius: 3px;
  background: #d8dce8;
}

.drawer-header {
  flex-shrink: 0;
  padding: 10px 44px 12px 16px;
}

.drawer-header h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #252b3a;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

.title-line {
  width: 4px;
  height: 18px;
  border-radius: 2px;
  background: #3d7eff;
}

.drawer-content {
  flex: 1;
  min-height: 0;
  /* 为悬浮在抽屉上方的底部导航预留完整滚动空间。 */
  padding: 0 14px calc(74px + env(safe-area-inset-bottom));
  overflow-y: auto;
}

.drawer-table {
  overflow: hidden;
  border: 1px solid #e5edfc;
  border-radius: 10px;
}

:deep(.drawer-table .header-box) {
  display: none;
}

:deep(.drawer-table .rg-table-box) {
  width: 100%;
}

:deep(.drawer-table .el-table) {
  --el-table-border-color: #e8ebf3;
  --el-table-header-bg-color: #edf2ff;
  --el-table-row-hover-bg-color: #fff;
}

:deep(.drawer-table .el-table::before) {
  display: none;
}

:deep(.drawer-table .el-table__header-wrapper .el-table__cell) {
  height: 54px;
  padding: 0 2px;
  background: #edf2ff !important;
  border-right: 1px solid #fff;
  border-bottom: 0;
}

:deep(.drawer-table .el-table__header-wrapper .el-table__cell:last-child) {
  border-right: 0;
}

:deep(.drawer-table .el-table__header-wrapper .cell) {
  padding: 0;
  color: #7079a6;
  font-size: 12px;
  font-weight: 400;
  line-height: 19px;
  white-space: pre-line;
}

:deep(.drawer-table .el-table__body-wrapper .el-table__cell) {
  height: 48px;
  padding: 0 2px;
  background: #fff;
  border-bottom: 1px solid #e8ebf3;
}

:deep(.drawer-table .el-table__body-wrapper tr:last-child .el-table__cell) {
  border-bottom: 0;
}

:deep(.drawer-table .el-table__body-wrapper .cell) {
  padding: 0;
  color: #363d63;
  font-size: 14px;
  line-height: 20px;
}

:global(.detail-popup .van-popup__close-icon) {
  top: 14px;
  right: 14px;
  color: #313965;
  font-size: 25px;
}
</style>
