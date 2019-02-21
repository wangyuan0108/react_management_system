import {
  getRoleData,
  getRoleInfo,
  delRoleInfo,
  getSerialInfoList,
  addRoldInfo,
  getPermissionInfo,
  updateRoleInfo,
} from '@/services/role';
import router from 'umi/router';

export default {
  namespace: 'role',
  state: {
    roleData: [], /* 角色信息 */
    treeData: [], /* 新增角色耶权限数据 */
    editTreeData:[], /* 权限管理页数据 */
    roleId: [], /* 角色ID */
    delRoleData: [],
    pageInfo:{ /* 翻页信息 */
      pageNum:1, 
      pageSize:10,
    },
    systemInfo:[]
  },

  effects: {
    *getRoleData({ payload }, { call, put }) {
      const response = yield call(getRoleData, payload);
      yield put({
        type: 'saveRoleData',
        payload: response,
      });   
    },
    /* 权限管理页数据获取 */
    *getRoleInfo({payload,getDefaultId},{ call,put }) {
     let response = yield call(getRoleInfo,payload);
        const id = response.result.prmissionIdList
        const serialId = response.result.roleInfo && response.result.roleInfo.serialId
        yield put({
          type: 'editTreeData',
          payload: response
        });
        getDefaultId(id,serialId)
    },
    *delRoleInfo({ payload,cb }, { call, put }) {
       console.log("payload",payload)
       const response = yield call(delRoleInfo, payload.id);
       if (response.code === '200') {
       const response = yield call(getRoleData,payload);
       if(response)cb();
       yield put({
        type: 'saveRoleData',
        payload: response,
       });
      }
    },
    *getSerialInfoList({ payload }, { call, put }){
        const response = yield call(getSerialInfoList);
        yield put({
          type: 'saveSystemData',
          payload: response.result.serialVoList
        });
    },
    *addRoldInfo({ payload,cb }, { call }){
      console.log("payload",payload)
      const response = yield call(addRoldInfo,payload);
      if(response.code==="200")cb();
    },
    *getPermissionInfo({ payload }, { call, put }){
      console.log("系统管理",payload);
      const response = yield call(getPermissionInfo,payload);
      yield put({
        type: 'saveRoleTree',
        payload: response.result.sysSerialPermissionsTreeVoList,
      });
    },
    *updateRoleInfo({payload,success},{call}){
      console.log("payload",payload)
      const response = yield call(updateRoleInfo,payload);
      if(response.code==="200")success();
      console.log("updateRoleInfo",response)
    }
  },
  reducers: {
    saveRoleData(state, action) {
      return {
        ...state,
        roleData: action.payload || {},
      };
    },
    saveRoleTree(state, action) {
      console.log("payload",action.payload)
      return {
        ...state,
        treeData: action.payload || []
      }
    },
    roleId(state, action) {
      return {
        ...state,
        roleId: action.payload || []
      }
    },
    /* 跟新翻页信息 */
    upDatePageInfo(state,action){ 
        console.log("翻页",action.payload);
        return {
          ...state,
          pageInfo: action.payload || []
        }
    },
    saveSystemData(state,action){
      return {
        ...state,
        systemInfo: action.payload
      }
    },
    editTreeData(state,action){
      return {
        ...state,
        editTreeData: action.payload || []
      }
    },
    cleanTreeData(state,action){
      return {
        ...state,
        treeData: action.payload
      }
    }
  }
 
};
