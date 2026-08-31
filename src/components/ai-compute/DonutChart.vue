<template>
  <common-echarts class="donut-chart" :options="option" :style="chartStyle" />
</template>

<script setup>
import { computed } from 'vue';
import CommonEcharts from '@/components/common-echarts/index.vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  centerValue: {
    type: String,
    required: true,
  },
  centerLabel: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});

const chartStyle = computed(() => {
  return {
    height: `${props.height}px`,
  };
});

const option = computed(() => {
  return {
    animation: false,
    color: props.data.map((item) => item.color),
    title: {
      left: 'center',
      top: '38%',
      text: props.centerValue,
      subtext: props.centerLabel,
      itemGap: 3,
      textStyle: {
        color: '#241c4f',
        fontSize: 22,
        fontWeight: 700,
        lineHeight: 26,
      },
      subtextStyle: {
        color: '#716b85',
        fontSize: 12,
        fontWeight: 400,
      },
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: ['42%', '58%'],
        center: ['50%', '50%'],
        minAngle: 4,
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          alignTo: 'none',
          formatter(params) {
            const item = props.data.find((dataItem) => dataItem.name === params.name) || {};
            const displayVal = item.displayValue || `${params.percent}%`;
            return `{dot|●} {name|${params.name}}\n{value|${displayVal}}`;
          },
          rich: {
            dot: {
              fontSize: 9,
              lineHeight: 14,
            },
            name: {
              color: '#595a8a',
              fontSize: 11,
              lineHeight: 14,
            },
            value: {
              color: '#241c4f',
              fontSize: 9,
              fontWeight: 600,
              lineHeight: 14,
              padding: [0, 0, 0, 10],
            },
          },
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 10,
          smooth: 0.1,
          lineStyle: {
            color: '#9aa0b8',
            width: 1,
          },
        },
        data: props.data.map((item) => {
          return {
            name: item.name,
            value: item.value,
            label: {
              rich: {
                dot: {
                  color: item.color,
                  fontSize: 9,
                  lineHeight: 14,
                },
                name: {
                  color: '#595a8a',
                  fontSize: 11,
                  lineHeight: 14,
                },
                value: {
                  color: '#241c4f',
                  fontSize: 9,
                  fontWeight: 600,
                  lineHeight: 14,
                  padding: [0, 0, 0, 10],
                },
              },
            },
            itemStyle: {
              color: item.color,
            },
          };
        }),
      },
    ],
  };
});
</script>

<style lang="less" scoped>
.donut-chart {
  width: 100%;
  min-width: 0;
}
</style>
