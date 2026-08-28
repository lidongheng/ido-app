<template>
  <div ref="chartRef" class="trend-chart" :style="chartStyle"></div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useECharts } from '@/composables/useECharts.js';

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  series: {
    type: Array,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});

const chartRef = ref();
const chartStyle = computed(() => {
  return {
    height: `${props.height}px`,
  };
});

const option = computed(() => {
  return {
    animation: false,
    color: props.series.map((item) => item.color),
    legend: {
      top: 0,
      right: 0,
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 8,
      textStyle: {
        color: '#716b85',
        fontSize: 10,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: 36,
      right: 8,
      bottom: 22,
      left: 32,
    },
    xAxis: {
      type: 'category',
      data: props.categories,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#d9dcee',
        },
      },
      axisLabel: {
        color: '#716b85',
        fontSize: 10,
      },
    },
    yAxis: {
      type: 'value',
      name: props.unit,
      nameTextStyle: {
        color: '#8e919d',
        fontSize: 10,
        padding: [0, 0, 0, -22],
      },
      axisLabel: {
        color: '#8e919d',
        fontSize: 10,
      },
      splitLine: {
        lineStyle: {
          color: '#eceef7',
          type: 'dashed',
        },
      },
    },
    series: props.series.map((item) => {
      const isLine = item.type === 'line';
      return {
        name: item.name,
        type: item.type,
        data: item.data,
        barWidth: isLine ? undefined : 8,
        barGap: '15%',
        barCategoryGap: '30%',
        smooth: false,
        symbol: isLine ? 'circle' : undefined,
        symbolSize: isLine ? 6 : undefined,
        lineStyle: isLine
          ? {
              width: 2,
            }
          : undefined,
        label: {
          show: true,
          position: 'top',
          distance: 2,
          color: '#353575',
          fontSize: 8.5,
        },
        itemStyle: {
          color: item.color,
          borderRadius: isLine ? 0 : [2, 2, 0, 0],
          borderWidth: isLine ? 1.5 : 0,
          borderColor: isLine ? '#fff' : undefined,
        },
      };
    }),
  };
});

useECharts(chartRef, option);
</script>

<style lang="less" scoped>
.trend-chart {
  width: 100%;
  min-width: 0;
}
</style>
