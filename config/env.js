const configs = {
  // 本地
  local: {
    HTTP_SERVER: '',
  },
  // 开发
  develop: {
    HTTP_SERVER: 'http://36.155.127.23:36101/',
  },
  // 测试
  test: {
    HTTP_SERVER: 'http://36.155.127.23:46101/',
  },
  // 沙箱环境
  preProd: {
    HTTP_SERVER: 'http://36.155.127.23:8080',
  },

  // 生产环境
  prod: {
    HTTP_SERVER: 'http://36.155.127.23:8080',
  },
};

const API_ENV = process.env.API_ENV ? process.env.API_ENV : 'local';

export const env = configs[API_ENV];
