<template>
  <div class="token-card">
    <div class="token-card-body">
      <div class="token-card-title">
        <span class="blue-line"></span>
        <p class="label-text black small bold">Tokens</p>
      </div>

      <div class="token-metrics">
        <template v-for="(metric, index) in metrics" :key="metric.label">
          <div class="token-metric">
            <div class="token-metric-value-row">
              <span class="token-metric-value">{{ metric.value }}</span>
              <span class="token-metric-unit">{{ metric.unit }}</span>
            </div>
            <div class="token-metric-label">{{ metric.label }}</div>
          </div>
          <div v-if="index !== metrics.length - 1" class="token-metric-divider"></div>
        </template>
      </div>

      <div class="token-table-shell">
        <el-table
          class="token-table"
          :data="rows"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
          row-key="id"
          v-bind="tableConfig"
        >
          <el-table-column
            v-for="column in columns"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :min-width="column.minWidth"
            :align="column.align"
            :sortable="column.sortable"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  metrics: {
    type: Array,
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

const headerCellStyle = {
  height: '34px',
  padding: '3px 5px',
  color: '#6e6a91',
  background: '#eaf0fd',
  fontSize: '12px',
  fontWeight: 400,
};

const cellStyle = {
  height: '38px',
  padding: '4px 5px',
  color: '#28234f',
  borderBottomColor: '#dfe3ec',
  fontSize: '14px',
  fontWeight: 600,
};
</script>

<style lang="less" scoped>
.token-card {
  margin-bottom: 8px;
}

.token-card-body {
  padding: 8px 8px 10px;
  overflow: hidden;
  background: #fff;
  border-radius: .21rem;
}

.token-card-title {
  display: flex;
  align-items: center;
  width: 100%;
  line-height: .68rem;
}

.blue-line {
  display: inline-block;
  width: .08rem;
  height: .43rem;
  margin-right: .21rem;
  background: #5f7de0;
  border-radius: .04rem;
  vertical-align: middle;
}

.token-metrics,
.token-table-shell {
  margin-top: 10px;
}

.token-metrics {
  display: flex;
  min-height: 72px;
  gap: 0;
  padding: 9px 0;
  overflow: hidden;
  border: 1.6px solid #e5edfc;
  border-radius: 8px;
}

.token-metric {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0 14px;
}

.token-metric-value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  white-space: nowrap;
}

.token-metric-value {
  color: #33336b;
  font-family: 'Microsoft YaHei';
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
}

.token-metric-unit {
  color: #595a8a;
  font-family: 'Microsoft YaHei';
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.token-metric-label {
  min-height: 0;
  margin-top: 7px;
  color: #5d5874;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  white-space: nowrap;
}

.token-metric-divider {
  width: 1px;
  margin: 4px 0;
  border-right: 1px dashed #e5e6ee;
}

.token-table-shell {
  overflow: hidden;
  border: 1PX solid #e1e7f3;
  border-radius: 9px;
}
</style>
