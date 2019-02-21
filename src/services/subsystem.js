import request from '@/utils/request';

//获取角色信息
export async function getSubRoleData(payload) {
    console.log(payload)
  return request('/sys/getSerialInfoList',{
    "method":"POST",
    "body":{
       ...payload
      }
  })
}

export async function addSerialInfo(payload) {
  return request('/sys/addSerialInfo',{
    "method":"POST",
    "body":{...payload}
  })
}
export async function getSerialInfo(payload) {
  return request('/sys/getSerialInfo',{
    "method":"POST",
    "body":payload
  })
}

export async function updateSerialInfo(payload) {
  return request('/sys/updateSerialInfo',{
    "method":"POST",
    "body":payload
  })
}
export async function onOffSerial(payload) {
  return request('/sys/onOffSerial',{
    "method":"POST",
    "body":payload
  })
}






