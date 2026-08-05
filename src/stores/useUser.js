import { defineStore } from 'pinia';

export const useUser = defineStore('user', {
  state: () => ({
    ready: false,
    deviceInfo: null,
    appInfo: null,
    userInfo: null,
    uid: null,
    wecodeInfo: null,
    tenant: null,
  }),
  actions: {
    setDeviceInfo(deviceInfo) {
      this.deviceInfo = deviceInfo;
    },
    setAppInfo(appInfo) {
      this.appInfo = appInfo;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      this.uid = userInfo.uid;
    },
    setWecodeInfo(wecodeInfo) {
      this.wecodeInfo = wecodeInfo;
    },
    setTenant(tenant) {
      this.tenant = tenant;
    },
    setReady(ready) {
      this.ready = ready;
    },
  },
});
