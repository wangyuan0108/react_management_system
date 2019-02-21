import {
  getUserInfoList,
  addUser,
  getSerialInfoList,
  getRoleInfoListBySerialId,
  delUser,
  activateAdministrator,
  cancelAdministrator,
  editUser,
  getUserDetail,
} from '@/services/acountmange';
import { message } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'acountmange',
  state: {
    list: [],
    serialList: [],
    roleList: [],
    userDetail: {},
  },
  effects: {
    *getUserList({ payload }, { call, put }) {
      const response = yield call(getUserInfoList, payload);
      yield put({
        type: 'saveUserList',
        payload: response,
      });
    },
    *addUser({ payload }, { call, put }) {
      const response = yield call(addUser, payload);
      if (Number(response.code) === 200) {
        message.success('添加用户成功');
        router.push('/systemmange/acountmange/acountmange');
      }
      yield put({
        type: 'saveAddUser',
        payload: response,
      });
    },
    *getSerialInfoList({ payload }, { call, put }) {
      const response = yield call(getSerialInfoList, payload);
      yield put({
        type: 'saveSerialInfoList',
        payload: response,
      });
    },
    *getRoleInfoListBySerialId({ payload }, { call, put }) {
      const response = yield call(getRoleInfoListBySerialId, payload);
      yield put({
        type: 'saveRoleList',
        payload: response,
      });
    },
    *delUser({ payload }, { call, put }) {
      const response = yield call(delUser, payload);
      yield put({
        type: 'setUser',
        payload: response,
      });
    },
    *editUser({ payload }, { call, put }) {
      const response = yield call(editUser, payload);
      if (Number(response.code) === 200) {
        message.success('编辑用户成功');
        router.push('/systemmange/acountmange/acountmange');
      }
      yield put({
        type: 'editSetUser',
        payload: response,
      });
    },
    *getUserDetail({ payload }, { call, put }) {
      const response = yield call(getUserDetail, payload);
      yield put({
        type: 'saveUserDetail',
        payload: response,
      });
      return response;
    },
    *clearUserDetail(_, { put }) {
      console.log(66);

      yield put({
        type: 'clearDetail',
        payload: [],
      });
    },
    *activeUser({ payload }, { call, put }) {
      const response = yield call(activateAdministrator, payload);
      yield put({
        type: 'setStatus',
        payload: response,
      });
    },
    *cancelUser({ payload }, { call, put }) {
      const response = yield call(cancelAdministrator, payload);
      yield put({
        type: 'setStatus',
        payload: response,
      });
    },
  },
  reducers: {
    saveUserList(state, action) {
      return {
        ...state,
        list: action.payload.result,
      };
    },
    saveAddUser(state) {
      return {
        ...state,
      };
    },
    saveSerialInfoList(state, action) {
      return {
        ...state,
        serialList: action.payload.result,
      };
    },
    saveRoleList(state, action) {
      return {
        ...state,
        roleList: action.payload.result,
      };
    },
    setUser(state) {
      return {
        ...state,
      };
    },
    editSetUser(state) {
      return {
        ...state,
      };
    },
    saveUserDetail(state, action) {
      return {
        ...state,
        userDetail: action.payload.result,
      };
    },
    setStatus(state) {
      return {
        ...state,
      };
    },
    clearDetail(state, action) {
      return {
        ...state,
        userDetail: action.payload,
      };
    },
  },
};
