<template>
  <common-table
    title="流量高地"
    :columns="columns"
    :rows="rows"
    :table-config="tableConfig"
  />
</template>

<script setup>
import CommonTable from './CommonTable.vue';

defineProps({
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
