import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import { LabelLayout } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  LabelLayout,
  SVGRenderer,
]);

export function useECharts(containerRef, optionRef) {
  let chartInstance;
  let resizeObserver;

  function renderChart() {
    if (!chartInstance) {
      return;
    }

    chartInstance.setOption(optionRef.value, true);
  }

  onMounted(async () => {
    await nextTick();
    chartInstance = echarts.init(containerRef.value, null, {
      renderer: 'svg',
    });
    renderChart();

    // 图表容器会随移动端 rem 和抽屉尺寸变化，监听真实容器比只监听 window 更准确。
    resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });
    resizeObserver.observe(containerRef.value);
  });

  watch(
    optionRef,
    () => {
      renderChart();
    },
    {
      deep: true,
    },
  );

  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    chartInstance?.dispose();
  });
}
