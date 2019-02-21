import {
    getSubRoleData,
    addSerialInfo,
    getSerialInfo,
    updateSerialInfo,
    onOffSerial
  } from '@/services/subsystem';
  
  
  export default {
    namespace: "subsystem",
    state:{
        subRoleData:{},
        addsubRoleData:{},
        ediSerialInfot:{}
    },
    effects: {
      *getSubRoleData({payload}, { call,put }) {
        const response = yield call(getSubRoleData,payload);
        console.log("response",response,payload)
        yield put({
            type: 'saveSystemData',
            payload: response
          });
      },
      *addSerialInfo({payload,cb}, { call,put }) {
        console.log("payload",payload)
        const response = yield call(addSerialInfo,payload);
        console.log("response",response)
        if(response.code==="200")cb();
        yield put({
            type: 'saveAddSerialInfo',
            payload: response
          });
        },  
        *getSerialInfo({payload,cb}, { call,put }) {
            const response = yield call(getSerialInfo,payload);
            const {serialVo} = response.result
            cb(serialVo);
            yield put({
                type:'saveSerialInfo',
                payload:serialVo
            })
        },
        *updateSerialInfo({payload,cb},{call,put}){
          const response = yield call(updateSerialInfo,payload)
          if(response.code==="200")cb();
        },
        *onOffSerial({payload,cb},{call}){
            const response = yield call(onOffSerial,payload)
            if(response.code==="200")cb();
        }
        
    },
    reducers:{
        saveAddSerialInfo(state,action){
            return {
                ...state,
                addsubRoleData: action.payload || {},
            };
        },
        saveSystemData(state,action){
            return {
                ...state,
                subRoleData: action.payload || {},
            };
        },
        saveSerialInfo(state,action){
            console.log("action",action)
            return {
                ...state,
                ediSerialInfot: action.payload || {},
            };
        }

    }
  };
  