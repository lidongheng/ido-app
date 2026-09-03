<template>
  <div class="template">
    <div class="pie-chart">
      <CommonEcharts :options="options" :label-renderer="labelRenderer" />
      <div class="pie-text">
        <div class="pie-value" v-if="value">{{ value }}</div>
        <div class="pie-title" v-if="title">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CommonEcharts from '@/components/common-echarts/index.vue';

const props = defineProps({
  options: {
    type: Object,
  },
  title: {
    type: String,
  },
  value: {
    type: String,
  },
  labelRenderer: {
    type: Function,
    default: null,
  },
});
</script>

<style lang="less" scoped>
.pie-chart {
  position: relative;
  .pie-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .pie-value {
      color: rgba(51, 51, 107, 1);
      font-family: 'Microsoft YaHei';
      font-style: Bold;
      font-size: 20px;
      font-weight: 700;
    }
    .pie-title {
      color: rgba(89, 90, 138, 1);
      font-family: 'Microsoft YaHei';
      font-style: Regular;
      font-size: 12px;
      font-weight: 400;
    }
  }
}
</style>