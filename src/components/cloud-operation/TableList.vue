<template>
  <div>
    <div class="header-box">
      <slot name="select" />
      <div class="title-box" v-if="showSetting">
        <slot name="icons" />
        <el-popover :show-arrow="false" placement="left-start" width="auto" trigger="click">
          <template #reference>
            <div class="setting-icon com-icon">
              <el-icon class="box-icon com-icon">
                <Setting />
              </el-icon>
            </div>
          </template>
          <div class="setting-popover">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
              全部
            </el-checkbox>
            <el-checkbox-group v-model="checkList" @change="handleCheckedItemChange">
              <template v-for="i in tableColumn" :key="i.prop">
                <el-checkbox :value="i.prop">
                  <div>
                    {{ i.prop === 'expand' ? '展开' : i.label }}
                  </div>
                </el-checkbox>
                <br />
              </template>
            </el-checkbox-group>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="rg-table-box">
      <el-table
        class="rg-custom-table"
        ref="table"
        :data="tableDataByPage"
        :default-sort="defaultSort"
        :expand-row-keys="expands"
        :row-style="rowStyle"
        row-key="index"
        empty-text="暂无数据"
        @sort-change="sortChangeFunc"
        @filter-change="filterChangeFunc"
        @row-click="rowClick"
        v-bind="tableConfig"
      >
        <template v-for="item in showTableColumn" :key="item.prop">
          <el-table-column
            v-if="item.type === 'showExpand'"
            type="expand"
            class="expand-col"
            width="1"
          >
            <template v-slot="scope">
              <slot name="expand" :scope="scope" />
            </template>
          </el-table-column>
          <el-table-column v-else-if="!!item.children" :label="item.label" :align="item.align">
            <template v-for="child in item.children" :key="child.prop">
              <el-table-column
                :column-key="child.prop"
                :show-overflow-tooltip="child.showTooltip"
                :prop="child.prop"
                :label="child.label"
                :minWidth="child.width"
                :sortable="child.sortable"
                :formatter="child.formatterFun"
                :className="child.className"
                :filters="child.showFilter ? item.filterOptions || getFilters(child.prop, tableData) : null"
                :filter-method="child.showFilter ? child.filterMethod || filterHandler : null"
                :align="child.align"
              >
                <template v-if="child.showSlot" v-slot="scope">
                  <slot :name="child.prop" :scope="{ row: scope.row, index: scope.$index }"></slot>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.type === 'index'"
            type="index"
            :label="item.label"
            :align="item.align"
            :width="item.width"
          ></el-table-column>
          <el-table-column
            v-else
            :show-overflow-tooltip="item.showTooltip"
            :column-key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :minWidth="item.minWidth"
            :sortable="item.sortable"
            :formatter="item.formatterFun"
            :className="item.className"
            :filters="item.showFilter ? item.filterOptions || getFilters(item.prop, tableData) : null"
            :filter-method="item.showFilter ? item.filterMethod || filterHandler : null"
            :filtered-value="item.defaultFilters ? item.defaultFilters : null"
            :align="item.align"
          >
            <template #header>
              <span>{{ item.label }}</span>
            </template>
            <template v-if="item.showSlot" v-slot="scope">
              <slot :name="item.prop" :scope="{ row: scope.row, index: scope.$index }"></slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <el-pagination
        class="pages"
        v-if="showPage"
        :size="props.paginationSmall"
        :teleported="false"
        :background="true"
        :total="props.tableData.length"
        :current-page="pages.pageNo"
        :page-size="pages.pageSize"
        @current-change="pageCurrentChangeFun"
        @size-change="pageSizeChangeFun"
        :layout="pages.layout"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import { useForceCastTablePagination } from './useForceCastTablePagination';

const table = ref();
const props = defineProps([
  'tableColumn',
  'tableData',
  'sortChangeFunc',
  'filterChangeFunc',
  'rowStyle',
  'rowClick',
  'expands',
  'defaultSort',
  'tableConfig',
  'showPage',
  'paginationSmall',
  'pageSize',
  'pageNo',
  'showSetting',
]);

const emits = defineEmits(['resetTable', 'pageChange', 'checkListChange']);

const checkList = ref([]);
const checkAll = ref(true);
const isIndeterminate = ref(false);

const handleCheckAllChange = (val) => {
  checkList.value = val ? props.tableColumn?.map((v) => v.prop) : [];
  checkAll.value = !val;
  isIndeterminate.value = !checkAll.value;
};

const handleCheckedItemChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === props.tableColumn?.length;
  isIndeterminate.value = !checkAll.value;
};

const getFilters = (prop, data) => {
  Array.from(new Set(data.map((i) => i[prop]))).map((item) => ({
    text: item,
    value: item,
  }));
};

const filterHandler = (value, row, column) => row[column.property] === value;

const { pages, pageCurrentChange, pageSizeChange } = useForceCastTablePagination(props);

const pageCurrentChangeFun = (value) => {
  pageCurrentChange(value);
  emits('pageChange', pages);
};

const pageSizeChangeFun = (value) => {
  pageSizeChange(value);
  emits('pageChange', pages);
};

const tableDataByPage = computed(() => {
  if (!props.showPage) {
    return props.tableData;
  }
  return props.tableData?.slice((pages.pageNo - 1) * pages.pageSize, pages.pageNo * pages.pageSize);
});

const showTableColumn = computed(() => {
  return props.tableColumn?.filter((v) => checkList.value.includes(v.prop) || !props.showSetting);
});

watch(
  checkList,
  () => {
    emits('checkListChange', checkList.value);
  },
  {
    immediate: true,
  }
);
/**
 * 暴露table组件方法
 */
const sort = (...args) => table.value?.sort(...args);
const toggleRowExpansion = (...args) => table.value?.toggleRowExpansion(...args);
const clearSort = () => table.value?.clearSort();
const clearFilter = () => table.value?.clearFilter();
const resetTable = () => {
  clearFilter();
  clearSort();
  emits('resetTable');
};
defineExpose({
  sort,
  toggleRowExpansion,
  clearSort,
  clearFilter,
});
</script>

<style lang="less">
  .rg-custom-table {
    .el-table__header-wrapper {
      .el-table__cell {
        background: rgba(229, 237, 252, 1) !important;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        padding: 3px 5px;
      }
    }
    .cell {
      color: rgba(131, 131, 189, 1);
      font-family: 'Microsoft YaHei';
      font-style: Regular;
      font-size: 10px;
    }
  }
</style>