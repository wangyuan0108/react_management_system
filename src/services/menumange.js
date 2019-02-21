import request from '@/utils/request';

export async function getMenuList(params) {
  return request('/sys/getPermissionInfoList', {
    method: 'POST',
    body: params,
  });
}

export async function delMenu(params) {
  return request('/sys/delPermissionInfoById', {
    method: 'POST',
    body: params,
  });
}

export async function addMenu(params) {
  return request('/sys/addPermissionInfo', {
    method: 'POST',
    body: params,
  });
}

export async function getPermissionInfoById(params) {
  return request('/sys/getPermissionInfoById', {
    method: 'POST',
    body: params,
  });
}
export async function updateMenu(params) {
  return request('/sys/updatePermissionInfoById', {
    method: 'POST',
    body: params,
  });
}
