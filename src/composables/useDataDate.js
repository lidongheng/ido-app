import api from '@/api/index.js';
import { useCurrentDate } from '@/stores/useCurrentDate.js';

const DATA_TYPE_BY_ROUTE = {
  commonCompute: '通算',
  aiCompute: '智算',
  dc: 'DC'
};

function formatDataDate(dataDate) {
  return `${dataDate.slice(0, 4)}-${dataDate.slice(4, 6)}-${dataDate.slice(6, 8)}`;
}

export function useDataDate() {
  const currentDate = useCurrentDate();

  async function loadDataDate(routeName) {
    const dataType = DATA_TYPE_BY_ROUTE[routeName];

    if (!dataType || currentDate.dataDateRequested[routeName]) {
      return;
    }

    // 每个模块在本次会话只查询一次，失败时也继续沿用模块当前日期。
    currentDate.markDataDateRequested(routeName);

    try {
      const response = await api.operate.getDataDate({ datatype: dataType });

      if (response.status === 200) {
        currentDate.setModuleDate(routeName, formatDataDate(response.data));
      }
    } catch (error) {
      console.error(`${dataType}数据库日期接口请求失败:`, error);
    }
  }

  return {
    loadDataDate
  };
}
