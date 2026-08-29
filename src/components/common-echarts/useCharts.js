const iconMap = {
  bar: 'circle',
};

export const getLegend = (data) => {
  const legendData = data.map((v) => ({
    name: v.name,
    icon: iconMap[v.type],
  }));
  return {
    right: 0,
    top: 0,
    itemWidth: 16,
    itemHeight: 8,
    data: legendData,
  };
};