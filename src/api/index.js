import * as operate from '@/views/cloud-operation/overviewMock.js';

const authmgt = {
  async logout() {
    return {
      status: 200,
    };
  },
  async getToken(uid) {
    return {
      data: {
        'iam-tenant': 'mock-tenant-001',
        'X-Auth-Token': 'mock-token',
      },
    };
  },
  async getUserRole(uid) {
    // Mock 角色接口：修改 role 可验证 1/2/3、其他角色和空角色的入口权限。
    return {
      status: 200,
      data: {
        role: 1,
      },
    };
  },
};

const home = {
  headers: null,
  appendHeaders(headers) {
    this.headers = headers;
  },
};

const api = {
  authmgt,
  home,
  operate,
};

export default api;
