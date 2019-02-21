import mockjs from 'mockjs';
let data = mockjs.mock({
  'data|10-20': [
    {
      'id|+1': 1,
      'name|1-10': '★',
      'phone|1-11': 32,
      role: '西湖区湖底公园1号',
      org: 'abc',
      register_time: '1990/04/04',
      state: 'alive',
    },
  ],
});
export default {
  'GET /api/role': {
    table: data,

    title: [
      {
        title: 'ID',
        dataIndex: 'id',
        key:"1"
      },
      {
        title: '用户名',
        dataIndex: 'name',
        key:"2"
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key:"3"
      },
      {
        title: '所属角色',
        dataIndex: 'role',
        key:"4"
      },
      {
        title: '所属机构',
        dataIndex: 'org',
        key:"5"
      },
      {
        title: '注册时间',
        dataIndex: 'register_time',
        key:"6"
      },
      {
        title: '状态',
        dataIndex: 'state',
        key:"7"
      },
    ],
  },
};
