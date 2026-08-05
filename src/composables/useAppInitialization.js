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

      await router.replace({ name: 'resource' });
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
