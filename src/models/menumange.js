import {
  getMenuList,
  delMenu,
  addMenu,
  getPermissionInfoById,
  updateMenu,
} from '@/services/menumange';
import { message } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'menumange',
  state: {
    list: [],
    permissionInfo: {},
  },
  effects: {
    *getMenuList({ payload }, { call, put }) {
      const response = yield call(getMenuList, payload);
      yield put({
        type: 'saveMenuList',
        payload: response,
      });
    },
    *delMenu({ payload }, { call, put }) {
      const response = yield call(delMenu, payload);
      yield put({
        type: 'saveDelMenuData',
        payload: response,
      });
    },
    *addMenu({ payload }, { call, put }) {
      const response = yield call(addMenu, payload);
      if (response.code === '200') {
        message.success('添加成功');
        router.push('/systemmange/menumange/menumange');
      }
      yield put({
        type: 'saveAddMenuData',
        payload: response,
      });
    },
    *getPermissionInfoById({ payload }, { call, put }) {
      const response = yield call(getPermissionInfoById, payload);
      console.log('response', response);

      yield put({
        type: 'savePermissionInfo',
        payload: response,
      });
    },
    *updateMenu({ payload }, { call, put }) {
      const response = yield call(updateMenu, payload);
      yield put({
        type: 'saveUpdataMenuData',
        payload: response,
      });
    },
  },
  reducers: {
    saveMenuList(state, action) {
      return {
        ...state,
        list: action.payload.result,
      };
    },
    saveDelMenuData(state) {
      return {
        ...state,
      };
    },
    saveAddMenuData(state) {
      return {
        ...state,
      };
    },
    savePermissionInfo(state, action) {
      return {
        ...state,
        permissionInfo: action.payload.result.sysSerialPermissionsVo,
      };
    },
    saveUpdataMenuData(state) {
      return {
        ...state,
      };
    },
  },
};
