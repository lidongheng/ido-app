<template>
  <div class="table-list">
    <el-table
      ref="tableRef"
      class="mobile-data-table"
      :data="data"
      :row-key="rowKey"
      :default-sort="defaultSort"
      :row-class-name="getRowClassName"
      v-bind="tableConfig"
      @sort-change="handleSortChange"
      @row-click="handleRowClick"
      @cell-click="handleCellClick"
    >
      <template v-for="column in columns" :key="column.prop || column.label">
        <el-table-column
          v-if="column.children"
          :label="column.label"
          :align="column.align || 'center'"
        >
          <el-table-column
            v-for="child in column.children"
            :key="child.prop"
            :prop="child.prop"
            :label="child.label"
            :width="child.width"
            :min-width="child.minWidth"
            :align="child.align || 'right'"
            :sortable="child.sortable"
            :formatter="child.formatter"
            :class-name="child.className"
          >
            <template v-if="child.slotName" #default="scope">
              <slot
                v-if="scope.row && scope.row[child.prop] !== undefined"
                :name="child.slotName"
                :row="scope.row"
                :index="scope.$index"
              ></slot>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          v-else
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :align="column.align || 'left'"
          :sortable="column.sortable"
          :formatter="column.formatter"
          :class-name="column.className"
        >
          <template v-if="column.slotName" #default="scope">
            <slot
              v-if="scope.row && scope.row[column.prop] !== undefined"
              :name="column.slotName"
              :row="scope.row"
              :index="scope.$index"
            ></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  rowKey: {
    type: String,
    required: true,
  },
  defaultSort: {
    type: Object,
    default: () => ({}),
  },
  tableConfig: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['sort-change', 'row-click', 'cell-click']);
const tableRef = ref();

function getRowClassName({ row }) {
  if (row.isSummary) {
    return 'summary-table-row';
  }
  return '';
}

function handleSortChange(payload) {
  emit('sort-change', payload);
}

function handleRowClick(row, column, event) {
  emit('row-click', row, column, event);
}

function handleCellClick(row, column, cell, event) {
  emit('cell-click', row, column, cell, event);
}

defineExpose({
  clearSort: () => tableRef.value.clearSort(),
  sort: (...args) => tableRef.value.sort(...args),
});
</script>

<style lang="less" scoped>
.table-list {
  width: 100%;
  overflow: hidden;
  border: 1PX solid #e3e7f3;
  border-radius: 9px;
  background: #fff;
}

.mobile-data-table {
  width: 100%;
  --el-table-border-color: #e4e7f1;
  --el-table-header-bg-color: #eef2ff;
  --el-table-row-hover-bg-color: #f7f9ff;
  --el-table-text-color: #353575;
  --el-table-header-text-color: #7176ae;
}

:deep(.el-table__inner-wrapper::before) {
  display: none;
}

:deep(.el-table__header-wrapper th.el-table__cell) {
  height: 40px;
  padding: 4px 0;
  background: #eef2ff;
  font-size: 11px;
  font-weight: 500;
  line-height: 15px;
}

:deep(.el-table__header-wrapper .cell) {
  white-space: pre-line;
}

:deep(.el-table__body-wrapper td.el-table__cell) {
  height: 40px;
  padding: 5px 0;
  border-bottom-color: #e4e7f1;
  font-size: 12px;
  line-height: 16px;
}

:deep(.summary-table-row td.el-table__cell) {
  font-weight: 700;
  color: #241c4f;
  background-color: #fafbfe;
}

:deep(.cell) {
  padding: 0 6px;
  white-space: normal;
  word-break: keep-all;
}

:deep(.caret-wrapper) {
  width: 10px;
}
</style>
