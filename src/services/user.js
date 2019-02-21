import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/sys/queryUserInfoByToken', {
    method: 'POST',
    body: {},
  });
}
export async function getCaptchaUrl(params) {
  return request('/captcha/getCaptcha', {
    method: 'POST',
    body: params,
  });
}
export async function forgetPassword(params) {
  return request('/sys/forgetPassword', {
    method: 'POST',
    body: params,
  });
}
export async function modifyUserInfoByToken(params) {
  return request('/sys/modifyUserInfoByToken', {
    method: 'POST',
    body: params,
  });
}

export async function changePassword(params) {
  return request('/sys/changePassword', {
    method: 'POST',
    body: params,
  });
}
export async function getCaptcha4ForgetPassword(params) {
  return request('/sys/getCaptcha4ForgetPassword', {
    method: 'POST',
    body: params,
  });
}
