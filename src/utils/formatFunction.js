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


export const formatNumToLocalStringAndFiexd = (num, fixed = 2) => {
    if ((!num && num !== 0) || num === '--') {
      return '-';
    }
    
    if (num === '*') {
      return '*';
    }
  
    if (num === '') {
      return '';
    }
  
    if (num === '0') {
      return '0';
    }
  
    return Number(Number(num).toFixed(fixed)).toLocaleString('en-US');
  };