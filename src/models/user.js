import { message } from 'antd';
import { routerRedux } from 'dva/router';
import {
  query as queryUsers,
  queryCurrent,
  getCaptchaUrl,
  forgetPassword,
  modifyUserInfoByToken,
  changePassword,
  getCaptcha4ForgetPassword,
} from '@/services/user';
import { stringify } from 'qs';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    test: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    
    *forgetPassword({ payload }, { call, put }) {
      const response = yield call(forgetPassword, payload);
      if (response.code === '200') {
        message.success('修改密码成功');
        yield put({
          type: 'saveforgetPassword',
          payload: response,
        });
      }
    },
    *modifyUserInfoByToken({ payload }, { call }) {
      const response = yield call(modifyUserInfoByToken, payload);
      if (response.code === '200') {
        message.success('更新个人状态成功');
      }
    },
    *changePassword({ payload }, { call, put }) {
      const response = yield call(changePassword, payload);
      if (response.code === '200') {
        message.success('修改密码成功');
        sessionStorage.setItem('x-access-token', '');
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
    *getCaptcha4ForgetPassword({ payload }, { call, put }) {
      const response = yield call(getCaptcha4ForgetPassword, payload);
      if (response.code === '200') {
        message.success('获取验证码成功');
        yield put({
          type: 'saveResponseKey',
          payload: response,
        });
      }
    },
    *changeState(_,{put}){
      yield put({
        type: 'saveforgetPassword',
        payload: {},
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: typeof action.payload.result  ? action.payload.result.sysUserVo : {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    
    saveforgetPassword(state, action) {
      return {
        ...state,
        forgetPasswordResponse: action.payload || {},
      };
    },
    saveResponseKey(state, action) {
     const  timestamp = Date.parse(new Date());
      return {
        ...state,
        saveResponseKey: action.payload.result.key || {},
        timestampI:timestamp
      };
    },
    
  },
};
