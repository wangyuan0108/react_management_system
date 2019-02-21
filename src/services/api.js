import request from '@/utils/request';
import { func } from 'prop-types';

export async function fakeAccountLogin(params) {
  return request('/sys/login', {
    method: 'POST',
    body: params,
  });
}
export async function fakeAccountLoginOut(params) {
  return request('/sys/logout', {
    method: 'POST',
    body: params,
  });
}
export async function changePasswordByAccount(params) {
  return request('/sys/changePasswordByAccount', {
    method: 'POST',
    body: params,
  });
}
export async function getUserPermissionList() {
  return request('/sys/getUserPermissionList', {
    method: 'POST',
    body: {},
  });
}
