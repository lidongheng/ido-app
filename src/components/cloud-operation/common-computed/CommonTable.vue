<template>
  <section class="common-table">
    <div class="table-title">{{ title }}</div>
    <table-list
      :table-column="columns"
      :table-data="rows"
      :default-sort="{}"
      :table-config="tableConfig"
    >
      <template #name="{ scope }">
        <data-link
          v-if="scope.row && scope.row.name !== undefined"
          :text="scope.row.name"
        />
      </template>
      <template #increase="{ scope }">
        <trend-value
          v-if="scope.row && scope.row.increase !== undefined"
          :value="scope.row.increase"
          :direction="scope.row.direction"
          unit=""
        />
      </template>
      <template #value="{ scope }">
        <trend-value
          v-if="scope.row && scope.row.value !== undefined"
          :value="scope.row.value"
          :direction="scope.row.direction"
          unit=""
        />
      </template>
      <template #status="{ scope }">
        <status-dot
          v-if="scope.row && scope.row.status !== undefined"
          :tone="scope.row.status"
          label="增长状态"
        />
      </template>
    </table-list>
  </section>
</template>

<script setup>
import DataLink from '@/components/cloud-operation/DataLink.vue';
import StatusDot from '@/components/cloud-operation/StatusDot.vue';
import TableList from '@/components/cloud-operation/TableList.vue';
import TrendValue from '@/components/cloud-operation/TrendValue.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  tableConfig: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="less" scoped>
.common-table {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.table-title {
  color: rgba(37, 43, 58, 1);
  font-family: 'Microsoft YaHei';
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
}
</style>
