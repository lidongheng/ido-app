import api from '@/api/index.js';
import { useCurrentDate } from '@/stores/useCurrentDate.js';

const DATA_TYPE_BY_ROUTE = {
  commonCompute: '通算',
  aiCompute: '智算',
  dc: 'DC'
};

// 接口返回 YYYYMMDD，筛选组件和日期 Store 统一使用 YYYY-MM-DD。
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

    // 每个模块在本次会话只查询一次。先标记再发请求，避免快速重复点击产生并发请求；
    // 请求失败时不写入数据库日期上限，后续业务请求继续沿用模块当前筛选日期。
    currentDate.markDataDateRequested(routeName);

    try {
      const response = await api.operate.getDataDate({ datatype: dataType });

      if (response.status === 200) {
        // 同时写入模块默认日期和数据库日期上限，具体的请求截断由 dataForApi 统一处理。
        currentDate.setModuleDataDate(routeName, formatDataDate(response.data));
      }
    } catch (error) {
      console.error(`${dataType}数据库日期接口请求失败:`, error);
    }
  }

  return {
    loadDataDate
  };
}
