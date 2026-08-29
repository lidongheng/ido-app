<template>
  <div class="chart" ref="chartContainer"></div>
</template>

<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, onUnmounted, ref } from 'vue';
import { getLegend } from './useCharts';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const props = defineProps({
  options: {
    type: Object,
  },
});

const chartContainer = ref();
let myChart = null;
let isInitialized = false;

const initChart = () => {
  if (!chartContainer.value || isInitialized) return;

  try {
    myChart = echarts.init(chartContainer.value);
    isInitialized = true;

    // 设置初始配置
    if (props.options) {
      myChart.setOption(
        {
          legend: getLegend(props.options.series),
          ...props.options,
        },
        true
      );
    }
  } catch (error) {
    console.error('Error initializing chart:', error);
  }
};

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
    isInitialized = false;
  }
});
</script>

<style lang="less" scoped>
.chart {
  height: 180px;
  width: 100%;
}
</style>