import { computed } from 'vue';
import { useUser } from '@/stores/useUser.js';

export function useRoleNavigation() {
  const userStore = useUser();

  // 角色接口的 data.role 决定唯一业务入口；其他角色及空角色按需求进入智算。
  const businessRoute = computed(() => {
    switch (String(userStore.role)) {
      case '1':
        return 'commonCompute';
      case '2':
        return 'Region';
      case '3':
        // saleable 复用现有 DC 页面和筛选、日期逻辑。
        return 'dc';
      default:
        return 'aiCompute';
    }
  });

  function canAccessRoute(routeName) {
    return routeName === businessRoute.value
      || (businessRoute.value === 'Region' && routeName === 'RegionDetail');
  }

  return {
    businessRoute,
    canAccessRoute
  };
}
