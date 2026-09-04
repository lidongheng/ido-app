<template>
  <div class="chart" ref="chartContainer"></div>
</template>

<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart } from 'echarts/charts';
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
import {
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
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
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const props = defineProps({
  options: {
    type: Object,
  },
  labelRenderer: {
    type: Function,
    default: null,
  },
});

const chartContainer = ref();
let myChart = null;
let isInitialized = false;
let resizeFrame = null;
let resizeListenerActive = false;

const resizeChart = () => {
  resizeFrame = null;

  if (!myChart || !chartContainer.value) return;

  const width = chartContainer.value.clientWidth;
  const height = chartContainer.value.clientHeight;

  if (!width || !height) return;
  if (myChart.getWidth() === width && myChart.getHeight() === height) return;

  myChart.resize();
};

// 折叠屏切换会连续触发 resize，合并到下一帧后再按最终容器尺寸重绘。
const scheduleChartResize = () => {
  if (!resizeListenerActive || resizeFrame !== null) return;

  resizeFrame = window.requestAnimationFrame(resizeChart);
};

const startResizeListener = () => {
  if (resizeListenerActive) return;

  window.addEventListener('resize', scheduleChartResize);
  resizeListenerActive = true;
};

const stopResizeListener = () => {
  if (resizeListenerActive) {
    window.removeEventListener('resize', scheduleChartResize);
    resizeListenerActive = false;
  }

  if (resizeFrame !== null) {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = null;
  }
};

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

// 监听 options 变化，重新渲染
watch(
  () => props.options,
  () => {
    if (myChart && props.options) {
      myChart.setOption({
        legend: getLegend(props.options.series),
        ...props.options,
      }, true);
    }
  },
  { deep: true }
);

onMounted(() => {
  initChart();
  startResizeListener();
});

onActivated(() => {
  startResizeListener();
  nextTick(() => {
    scheduleChartResize();
  });
});

onDeactivated(() => {
  stopResizeListener();
});

onUnmounted(() => {
  stopResizeListener();

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
