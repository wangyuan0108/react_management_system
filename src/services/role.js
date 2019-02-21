import request from '@/utils/request';

//获取角色信息
export async function getRoleData({pageNum,pageSize,roleName}) {
  return request('/sys/getRoleInfoList',{
    "method":"POST",
    "body":{
      "pageNum": pageNum, 
      "pageSize": pageSize,
      "roleName": roleName,
    }
  });
}

//获取树
export async function getRoleInfo({roleId}) {
  return request('/sys/getRoleInfoById',{
    "method":"POST",
    "body":{roleId}
  });
}

//删除角色信息
export async function delRoleInfo(payload) {
  return request('/sys/delRoldInfo',{
    "method":"POST",
    "body":{
      "roleId":payload
    }
  });
}



//系统选择
export async function getSerialInfoList() {
  return request('/sys/getSerialList',{
    "method":"POST"
  });
}


//新增角色
export async function addRoldInfo(payload) {
  return request('/sys/addRoldInfo',{
    "method":"POST",
    "body":payload
  });
}


export async function getPermissionInfo(payload) {
  return request('/sys/getPermissionInfoListById',{
    "method":"POST",
    "body":{ serialId:payload }
  });
}


export async function updateRoleInfo(payload) {
  return request('/sys/updateRoleInfo',{
    "method":"POST",
    "body":{...payload}
  });
}













