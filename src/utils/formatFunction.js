export const formatRateValue = (value, fixed = 2) => {
  if (value === '--') {
      return '--';
  }
  if (value === '**') {
      return '**';
  }
  if (value === 0) {
      return 0;
  }
  if (!value) {
      return '--';
  }
  return (Number(value) * 100).toFixed(fixed);
};

export const formatterValue = (value, unit, fixed = 2) => {
  if ((!value && value !== 0) || value === '--') {
      return '--';
  }
  if (value === '**') {
      return '**';
  }

  if (value === 0) {
      return 0;
  }

  if (!unit) {
      return Number(value).toFixed(fixed);
  }
  return Number(value / unit ?? 1e8).toFixed(fixed);
};