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

export function useAppInitialization() {
  const router = useRouter();
  const userStore = useUser();
  const { ready } = storeToRefs(userStore);

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

      // 只处理根路径的默认入口，保留用户直接访问具体子路由的能力。
      if (router.currentRoute.value.path === '/') {
        await router.replace({ name: 'commonCompute' });
      }
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
