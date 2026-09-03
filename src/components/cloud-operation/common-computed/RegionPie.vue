<template>
  <pie-chart :options="options" :title="`${name}(${unit})`" :value="total" />
</template>

<script setup>
import { computed, ref } from 'vue';
import PieChart from '@/components/region-view/Piechart.vue';
import {
  formatNumToLocalStringAndFiexd,
  formatterValue,
  formatRateValue,
} from '@/utils/index';
import { colors } from '@/views/cloud-operation/useCommonComputeOverview.js';

const props = defineProps({
  name: {
    type: String,
    default: '售卖总量',
  },
  unit: {
    type: String,
    default: '',
  },
  gap: {
    type: Number,
    default: 1,
  },
  fixed: {
    type: Number,
    default: 2,
  },
  data: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const getFormatterValue = (value, gap = 1, fixed = 2) => {
  return formatNumToLocalStringAndFiexd(formatterValue(value, gap), fixed);
};

const total = computed(() => {
  const sum = props.data?.reduce((sum, item) => sum + item.num, 0);
  return getFormatterValue(sum, props.gap, props.fixed);
});

const chartData = computed(() => {
  return props.data?.map((v, i) => {
    return {
      name: v.region,
      type: 'pie',
      color: colors[i] || '#806F8C',
      value: v.num || 0,
      percent: v.percent,
    };
  });
});

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item',
      position: 'inside',
      valueFormatter: (value, dataIndex) =>
        `${getFormatterValue(value, props.gap, props.fixed)}${props.unit}/${
          formatRateValue(
            chartData.value?.[dataIndex]?.percent,
            props.fixed
          )
        }%`,
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: props.name,
        type: 'pie',
        radius: ['60%', '75%'],
        avoidLabelOverlap: true,
        padAngle: 3,
        minAngle: 5,
        labelLine: {
          show: true,
          showAbove: false,
          length: 10,
          length2: 10,
        },
        data: chartData.value?.map((v) => {
          return {
            ...v,
            itemStyle: {
              color: v.color,
            },
            label: {
              bleedMargin: 0,
              formatter: function (params) {
                return `{cire|}{label|${params.name}} {value|${getFormatterValue(
                  params.value,
                  props.gap,
                  props.fixed
                )}}{unit|${props.unit}}/{rate|${params.percent.toFixed(props.fixed)}%`;
              },
              fontSize: 10,
              rich: {
                cire: {
                  width: 6,
                  height: 6,
                  backgroundColor: v.color,
                  borderRadius: 3,
                },
                label: {
                  color: '#595a8a',
                  fontSize: 10,
                  lineHeight: 16,
                },
                value: {
                  fontWeight: 600,
                },
                unit: {
                  fontWeight: 600,
                },
                rate: {
                  fontWeight: 600,
                  lineHeight: 16,
                },
              },
            },
          };
        }),
      },
    ],
  };
});
</script>