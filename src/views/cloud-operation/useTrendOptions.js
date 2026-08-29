export function useTrendOptions(categories, series, unit) {
  return {
    animation: false,
    color: series.map((item) => item.color),
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
      data: categories,
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
      name: unit,
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
    series: series.map((item) => {
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
}
