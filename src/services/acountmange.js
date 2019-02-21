import request from '@/utils/request';
import { func } from 'prop-types';

export async function getUserInfoList(params) {
  return request('/sys/getUserInfoList', {
    method: 'POST',
    body: params,
  });
}

export async function addUser(params) {
  return request('/sys/addAdministrator', {
    method: 'POST',
    body: params,
  });
}

export async function getSerialInfoList(params) {
  return request('/sys/getSerialList', {
    method: 'POST',
    body: params,
  });
}

export async function getRoleInfoListBySerialId(params) {
  return request('/sys/getRoleInfoListBySerialId', {
    method: 'POST',
    body: params,
  });
}

export async function delUser(params) {
  return request('/sys/delAdministrator', {
    method: 'POST',
    body: params,
  });
}

export async function editUser(params) {
  return request('/sys/modifyUserInfoByUserId', {
    method: 'POST',
    body: params,
  });
}

export async function getUserDetail(params) {
  return request('/sys/queryUserInfo', {
    method: 'POST',
    body: params,
  });
}

export async function activateAdministrator(params) {
  return request('/sys/activateAdministrator', {
    method: 'POST',
    body: params,
  });
}

export async function cancelAdministrator(params) {
  return request('/sys/cancelAdministrator', {
    method: 'POST',
    body: params,
  });
}
