import { defineStore } from 'pinia';

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getCurrentDate() {
  return formatDate(new Date());
}

function getRegionDate(currentDate) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const targetMonth = currentDate.getDate() >= 15 ? month : month - 1;

  return new Date(year, targetMonth, 0);
}

export const useCurrentDate = defineStore('currentDate', {
  state: () => ({
    date: getCurrentDate()
  }),
  actions: {
    setDateByRoute(routeName) {
      const currentDate = new Date();

      // Region 数据按月结算，进入概览时使用对应账期，离开后恢复当天。
      this.date = routeName === 'Region'
        ? formatDate(getRegionDate(currentDate))
        : formatDate(currentDate);
    }
  }
});
