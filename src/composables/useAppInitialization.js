import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import api from '@/api/index.js';
import {
  getAppInfo,
  getDeviceInfo,
  getUserInfo,
  getWecodeInfo,
} from '@/mock/cordova.js';
import { useUser } from '@/stores/useUser.js';
import { useDataDate } from './useDataDate.js';
import { useRoleNavigation } from './useRoleNavigation.js';

export function useAppInitialization() {
  const router = useRouter();
  const userStore = useUser();
  const { ready } = storeToRefs(userStore);
  const { loadDataDate } = useDataDate();
  const { businessRoute, canAccessRoute } = useRoleNavigation();

  async function initialization() {
    try {
      const deviceInfo = await getDeviceInfo();
      userStore.setDeviceInfo(deviceInfo);

      const appInfo = await getAppInfo();
      userStore.setAppInfo(appInfo);

      const userInfo = await getUserInfo();
      userStore.setUserInfo(userInfo);

      const wecodeInfo = await getWecodeInfo();
      userStore.setWecodeInfo(wecodeInfo);

      await api.authmgt.logout();
      const tokenRes = await api.authmgt.getToken(userStore.uid);
      userStore.setTenant(tokenRes.data['iam-tenant']);
      api.home.appendHeaders(tokenRes.data);

      // 必须在登录后、页面渲染前取得角色，避免先展示无权限的业务页面。
      const roleRes = await api.authmgt.getUserRole(userStore.uid);
      userStore.setRole(roleRes.data.role);

      await router.isReady();
      // 同时限制直接输入地址和后续跳转；Region 角色保留 Region 详情访问权限。
      router.beforeEach((to) => {
        if (!canAccessRoute(to.name)) {
          return { name: businessRoute.value, replace: true };
        }
      });

      if (!canAccessRoute(router.currentRoute.value.name)) {
        await router.replace({ name: businessRoute.value });
      }

      await loadDataDate(router.currentRoute.value.name);
      userStore.setReady(true);
    } catch (error) {
      console.error('应用初始化失败:', error);
    }
  }

  initialization();

  return {
    ready,
  };
}
