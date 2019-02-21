import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import {
  fakeAccountLogin,
  getFakeCaptcha,
  changePasswordByAccount,
  fakeAccountLoginOut,
  getUserPermissionList,
} from '@/services/api';
import { getCaptchaUrl } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: { currentAuthority: 'admin', ...response },
      });
      // Login successfully
      if (response.code === '200') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        const UserPermissionResponse = yield call(getUserPermissionList);
        if (UserPermissionResponse.code === '200') {
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.startsWith('/oms')) {
                redirect = redirect.substr(redirect.indexOf('/oms') + 4);
              }
              location.reload();
            } else {
              window.location.href = redirect;
              return;
            }
          }
          yield put(routerRedux.replace(redirect || '/'));
        }
        yield put({
          type: 'saveUserPermissionList',
          payload: UserPermissionResponse,
        });
      } else if (response.message === '验证码校验失败') {
        const responseT = yield call(getCaptchaUrl, {
          scene: '4',
          sourceId: '1001',
          type: '6',
        });
        yield put({
          type: 'saveCaptchaUrl',
          payload: responseT,
        });
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *changePasswordByAccount({ payload }, { call, put }) {
      const response = yield call(changePasswordByAccount, payload);
      if (response.code === '200') {
        message.success('修改密码成功');
        yield put({
          type: 'changePasswordByAccountT',
        });
      }
    },
    *logout(payload, { call, put }) {
      const response = yield call(fakeAccountLoginOut, payload);
      if (response.code === '200') {
        message.success('退出成功');
        sessionStorage.removeItem('x-access-token');
        sessionStorage.removeItem('permsList');
        reloadAuthorized();
        　var domain = window.location.host;
        console.log(domain)
         window.location.href='http://'+domain+'/oms/user/login'
      }
    },
    *getCaptchaUrl({ payload }, { call, put }) {
      const response = yield call(getCaptchaUrl, payload);
      yield put({
        type: 'saveCaptchaUrl',
        payload: response,
      });
    },
    *getUserPermissionList(_, { call, put }) {
      const response = yield call(getUserPermissionList);
      yield put({
        type: 'saveUserPermissionList',
        payload: response,
      });
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      if (payload.result) {
        sessionStorage.setItem('x-access-token', payload.result.token);
      }
      const showModelPassWord = payload.message === '密码过期' ? true : false;
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        showModelPassWord: showModelPassWord,
      };
    },
    changePasswordByAccountT(state) {
      return {
        ...state,
        showModelPassWord: false,
      };
    },
    saveCaptchaUrl(state, action) {
      return {
        ...state,
        CaptchaUrl: action.payload || {},
        saveResponseKeyLogin: action.payload.result.key || {},
      };
    },
    saveUserPermissionList(state, action) {
      sessionStorage.setItem('permsList', JSON.stringify(action.payload.result.permsList));
      return {
        ...state,
        permsList: action.payload.result.permsList,
      };
    },
  },
};
