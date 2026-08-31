const RESOURCE_POOL_DETAIL_ROWS = [
  { computeType: '17.8', total: '17.8', assigned: '1,232', usage: '90.1%', coreUsage: '89.8%' },
  { computeType: '17.8', total: '17.8', assigned: '2,156', usage: '90.1%', coreUsage: '89.8%' },
  { computeType: '17.8', total: '17.8', assigned: '2,156', usage: '90.1%', coreUsage: '89.8%' },
  { computeType: '17.8', total: '17.8', assigned: '2,156', usage: '90.1%', coreUsage: '89.8%' },
  { computeType: '17.8', total: '17.8', assigned: '3,225', usage: '90.1%', coreUsage: '89.8%' },
];

export function createResourcePoolDetailRows(prefix) {
  return RESOURCE_POOL_DETAIL_ROWS.map((row, index) => {
    return {
      ...row,
      id: `${prefix}-resource-pool-${index + 1}`,
    };
  });
}
