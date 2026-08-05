export async function getDeviceInfo() {
  return {
    deviceId: 'mock-device-001',
    deviceModel: 'Mock Device',
    platform: 'Mock Platform',
  };
}

export async function getAppInfo() {
  return {
    appId: 'ido-app',
    appName: 'IDO',
    version: '0.1.0',
  };
}

export async function getUserInfo() {
  return {
    uid: 'mock-user-001',
    userName: 'Mock User',
  };
}

export async function getWecodeInfo() {
  return {
    wecodeId: 'mock-wecode-001',
    wecodeName: 'IDO运营看板',
  };
}
