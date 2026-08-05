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
};

export default api;
