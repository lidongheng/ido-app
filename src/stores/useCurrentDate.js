import { defineStore } from 'pinia';

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getCurrentDate(currentDate) {
  const yesterday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 1
  );

  return formatDate(yesterday);
}

function getRegionDate(currentDate) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const targetMonth = currentDate.getDate() >= 15 ? month : month - 1;

  return new Date(year, targetMonth, 0);
}

const MODULE_ROUTE_NAMES = ['commonCompute', 'aiCompute', 'dc'];

export const useCurrentDate = defineStore('currentDate', {
  state: () => {
    const currentDate = getCurrentDate(new Date());

    return {
      activeRouteName: null,
      // 时间筛选组件当前展示的日期，会随用户手动选择而变化。
      date: currentDate,
      // 标记三个模块是否已经尝试查询数据库日期，成功或失败都不会在本次会话重复请求。
      dataDateRequested: {
        commonCompute: false,
        aiCompute: false,
        dc: false
      },
      // 分别保存三个模块当前的筛选日期，切换路由时恢复，避免模块之间相互覆盖。
      moduleDates: {
        commonCompute: currentDate,
        aiCompute: currentDate,
        dc: currentDate
      },
      // 单独保存接口返回的数据库最新日期，不能被用户后续修改筛选日期时覆盖。
      // 值为 null 表示日期接口未成功返回，此时不限制传给业务接口的日期。
      moduleDataDates: {
        commonCompute: null,
        aiCompute: null,
        dc: null
      }
    };
  },
  getters: {
    dataForApi(state) {
      const moduleDataDate = state.moduleDataDates[state.activeRouteName];

      // date 和 moduleDataDate 都是 YYYY-MM-DD，相同格式下可以直接比较日期先后。
      // 筛选组件仍展示用户选择的 date，只在组装业务请求参数时限制最大日期，
      // 防止用户选择数据库尚未入库的日期后，请求到空数据。
      if (moduleDataDate && state.date > moduleDataDate) {
        return moduleDataDate.replaceAll('-', '');
      }

      // 用户选择未超过数据库日期，或日期接口失败没有上限时，按当前筛选日期请求。
      return state.date.replaceAll('-', '');
    }
  },
  actions: {
    setDateByRoute(routeName) {
      const currentDate = new Date();

      // 离开模块前保存用户最后选择的日期，再次进入时继续展示该值。
      if (MODULE_ROUTE_NAMES.includes(this.activeRouteName)) {
        this.moduleDates[this.activeRouteName] = this.date;
      }

      this.activeRouteName = routeName;

      if (MODULE_ROUTE_NAMES.includes(routeName)) {
        this.date = this.moduleDates[routeName];
        return;
      }

      // Region 数据按月结算，进入概览时使用对应账期，离开后恢复昨天。
      this.date = routeName === 'Region'
        ? formatDate(getRegionDate(currentDate))
        : getCurrentDate(currentDate);
    },
    setModuleDataDate(routeName, date) {
      // 接口日期既是模块首次进入时的默认筛选日期，也是业务请求允许的日期上限。
      this.moduleDataDates[routeName] = date;
      this.moduleDates[routeName] = date;

      // 首屏初始化时页面可能尚未激活；只有当前模块已激活时才同步更新展示日期。
      if (this.activeRouteName === routeName) {
        this.date = date;
      }
    },
    markDataDateRequested(routeName) {
      this.dataDateRequested[routeName] = true;
    }
  }
});
