export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/findPassWord', component: './User/FindPassWord' },
    ],
  },
  {
    path: 'printingDetail',
    component: './CooperatorManage/printingDetail',
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/home' },
      {
        //合作商管理
        name: 'cooperatormanage',
        icon: 'team',
        path: '/cooperatormanage',
        perms: 'coo:coo:manage',
        routes: [
          {
            //合作商管理
            path: '/cooperatormanage/cooperator',
            name: 'cooperatormanage',
            perms: 'coo:coo:list',
            routes: [
              {
                path: '/cooperatormanage/cooperator',
                redirect: '/cooperatormanage/cooperator/cooperatormanage',
              },
              {
                path: '/cooperatormanage/cooperator/cooperatormanage',
                component: './CooperatorManage/CooperatorManage',
                perms: 'coo:coo:list',
              },
              {
                path: '/cooperatormanage/cooperator/add',
                component: './CooperatorManage/AddCooperator',
                perms: 'coo:coo:add',
              },
              {
                path: '/cooperatormanage/cooperator/read',
                component: './CooperatorManage/DetailCooperator',
                perms: 'coo:coo:read',
              },
              {
                path: '/cooperatormanage/cooperator/acountmanage',
                component: './SystemMange/AcountMange/AcountMange',
                perms: 'coo:coo:acounmanage',
              },
              {
                path: '/cooperatormanage/cooperator/acountmanage',
                component: './CooperatorManage/CooperatorAccountManage',
                perms: 'coo:coo:acounmanage',
              },
            ],
          },
          {
            //服务管理
            path: '/cooperatorManage/serviceManagement',
            name: 'serviceManagement',
            perms: 'coo:serviceManagement:list',
            routes: [
              {
                path: '/cooperatorManage/serviceManagement',
                redirect: '/cooperatorManage/serviceManagement/list',
              },
              {
                path: '/cooperatorManage/serviceManagement/list',
                component: './CooperatorManage/ServiceManagement',
                perms: 'coo:serviceManagement:list',
              },
              {
                path: '/cooperatorManage/serviceManagement/addShop',
                component: './CooperatorManage/AddShop',
                perms: 'coo:serviceManagement:add',
              },
            ],
          },
          {
            //门店管理
            path: '/cooperatorManage/cooperstoremanage',
            name: 'cooperatorstoremanage',
            perms: 'coo:storemanage:list',
            routes: [
              {
                path: '/cooperatorManage/cooperstoremanage',
                redirect: '/cooperatorManage/cooperstoremanage/cooperstoremanage',
              },
              {
                path: '/cooperatorManage/cooperstoremanage/cooperstoremanage',
                component: './CooperatorManage/CooperatorStoreManage',
                perms: 'coo:storemanage:list',
              },
              {
                path: '/cooperatorManage/cooperstoremanage/detailcstoremanage',
                component: './CooperatorManage/DetailCStoremanage',
                perms: 'coo:storemanage:read',
              },
              {
                path: '/cooperatorManage/cooperstoremanage/addcooperstore',
                component: './CooperatorManage/AddCooperatorStore',
                perms: 'coo:storemanage:add',
              },
            ],
          },
          {
            //服务发布管理
            path: '/cooperatorManage/servicePublishManagement',
            name: 'servicePublishManagement',
            perms: 'coo:servicePublishManagement:list',
            routes: [
              {
                path: '/cooperatorManage/servicePublishManagement',
                redirect: '/cooperatorManage/servicePublishManagement/list',
              },
              {
                path: '/cooperatorManage/servicePublishManagement/list',
                component: './CooperatorManage/ServicePublishManagement',
                perms: 'coo:servicePublishManagement:list',
              },
              // {
              //   path: '/cooperatorManage/serviceManagement/addShop',
              //   component: './CooperatorManage/AddShop',
              //   perms: 'coo:serviceManagement:add',
              // },
            ],
          },
          {
            //门店审核
            path: '/cooperatorManage/cooperstoreaudit',
            name: 'cooperatorstoreaudit',
            perms: 'coo:storeaudit:list',
            routes: [
              {
                path: '/cooperatorManage/cooperstoreaudit',
                redirect: '/cooperatorManage/cooperstoreaudit/cooperstoreaudit',
              },
              {
                path: '/cooperatorManage/cooperstoreaudit/cooperstoreaudit',
                component: './CooperatorManage/CooperatorStoreAudit',
                perms: 'coo:storeaudit:list',
              },
              {
                path: '/cooperatorManage/cooperstoreaudit/detailcstoreaudit',
                component: './CooperatorManage/DetailCStoreAudit',
                perms: 'coo:storeaudit:read',
              },
            ],
          },
        ],
      },
      // 门店管理
      {
        name: 'storeManagement',
        icon: 'shop',
        path: '/storeManagement',
        perms: 'store:store:manage',
        routes: [
          {
            path: '/storeManagement/storeList',
            name: 'store',
            perms: 'store:store:list',
          },
        ],
      },
      // 商品管理
      {
        name: 'goodsManagement',
        icon: 'gift',
        path: '/goodsManagement',
        perms: 'goods:goods:manage',
        routes: [
          {
            path: '/goodsManagement/goodsList',
            name: 'goods',
            perms: 'goods:goods:list',
            // component: './GoodsManagement/GoodsList',
            routes: [
              { path: '/goodsManagement/goodsList', redirect: '/goodsManagement/goodsList/list' },
              {
                path: '/goodsManagement/goodsList/list',
                component: './GoodsManagement/GoodsList',
                perms: 'goods:goods:list',
              },
              {
                path: '/goodsManagement/goodsList/goodsDetail',
                component: './GoodsManagement/GoodsDetail',
                perms: 'goods:goods:list',
              },
            ],
          },
          {
            path: '/goodsManagement/orderManagement',
            name: 'order',
            perms: 'goods:goods:order',
            // component: './GoodsManagement/OrderManagement',
            routes: [
              {
                path: '/goodsManagement/orderManagement',
                redirect: '/goodsManagement/orderManagement/list',
              },
              {
                path: '/goodsManagement/orderManagement/list',
                component: './GoodsManagement/OrderManagement',
                perms: 'goods:goods:order',
              },
              {
                path: '/goodsManagement/orderManagement/orderDetail',
                component: './GoodsManagement/OrderDetail',
                perms: 'goods:goods:order',
              },
            ],
          },
        ],
      },
      {
        name: 'systemmange',
        icon: 'setting',
        path: '/systemmange',
        perms: 'sys:sys:manage',
        routes: [
          {
            //角色管理
            path: '/systemmange/rolemange',
            name: 'rolemange',
            perms: 'sys:role:list',
            routes: [
              {
                path: '/systemmange/rolemange',
                redirect: '/systemmange/rolemange/rolemange',
              },
              {
                path: '/systemmange/rolemange/rolemange',
                component: './SystemMange/RoleMange/RoleMange',
                perms: 'sys:role:list',
              },
              {
                //角色管理-查看
                path: '/systemmange/rolemange/checksee',
                component: './SystemMange/RoleMange/CheckSee',
                perms: 'sys:role:read',
              },
              {
                //角色管理-新增
                path: '/systemmange/rolemange/role',
                component: './SystemMange/RoleMange/Role',
                perms: 'sys:role:add',
              },
              {
                //角色管理-编辑
                path: '/systemmange/rolemange/authorization',
                component: './SystemMange/RoleMange/Authorization',
                perms: 'sys:role:update',
              },
            ],
          },

          {
            //账户管理
            path: '/systemmange/acountmange',
            name: 'acountmange',
            perms: 'sys:account:list',
            // component: './SystemMange/AcountMange',
            routes: [
              {
                path: '/systemmange/acountmange',
                redirect: '/systemmange/acountmange/acountmange',
              },
              {
                //账户管理-列表
                path: '/systemmange/acountmange/acountmange',
                component: './SystemMange/AcountMange/AcountMange',
                perms: 'sys:account:list',
              },
              {
                //账户管理-新增
                path: '/systemmange/acountmange/addacount',
                component: './SystemMange/AcountMange/AddAcount',
                perms: 'sys:account:add',
              },
              {
                //账户管理-编辑
                path: '/systemmange/acountmange/editacount',
                component: './SystemMange/AcountMange/AddAcount',
                perms: 'sys:account:update',
              },
            ],
          },
          {
            //菜单管理
            path: '/systemmange/menumange',
            name: 'menumange',
            perms: 'sys:menu:list',
            // component: './SystemMange/MenuMange',
            routes: [
              { path: '/systemmange/menumange', redirect: '/systemmange/menumange/menumange' },
              {
                path: '/systemmange/menumange/menumange',
                component: './SystemMange/MenuMange/MenuMange',
                perms: 'sys:menu:list',
              },
              {
                //菜单管理-新增
                path: '/systemmange/menumange/addmenu',
                component: './SystemMange/MenuMange/AddMenu',
                perms: 'sys:menu:add',
              },
              {
                //菜单管理-编辑
                path: '/systemmange/menumange/editmenu',
                component: './SystemMange/MenuMange/AddMenu',
                perms: 'sys:menu:update',
              },
            ],
          },
          {
            //子系统管理
            path: '/systemmange/subsystem',
            name: 'subsystem',
            perms: 'sys:subsys:list',
            routes: [
              {
                path: '/systemmange/subsystem',
                redirect: '/systemmange/subsystem/subsystem',
              },
              {
                path: '/systemmange/subsystem/subsystem',
                component: './SystemMange/Subsystem/Subsystem',
                perms: 'sys:subsys:list',
              },
              {
                //新增
                path: '/systemmange/subsystem/addSystem',
                component: './SystemMange/Subsystem/AddSystem',
                perms: 'sys:subsys:add',
              },
              {
                //编辑
                path: '/systemmange/subsystem/editSystem',
                component: './SystemMange/Subsystem/EditSystem',
                perms: 'sys:subsys:update',
              },
            ],
          },
          // {
          //   path: '/systemmange/operationlogmange',
          //   name: 'operationlogmange',
          //   component: './SystemMange/OperationLogMange',
          // },
        ],
      },
      {
        name: 'home',
        icon: 'home',
        path: '/home',
        component: './Home/Home',
        hideInBreadcrumb: true,
      },

      {
        path: '/account/center',
        component: './Account/Center',
      },
      {
        path: '/account/settings',
        component: './Account/Setting',
      },
    ],
  },
];
