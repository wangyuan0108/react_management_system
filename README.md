
- Preview: http://preview.pro.ant.design
- Home Page: http://pro.ant.design
- Documentation: http://pro.ant.design/docs/getting-started
- ChangeLog: http://pro.ant.design/docs/changelog
- FAQ: http://pro.ant.design/docs/faq
- Mirror Site in China: http://ant-design-pro.gitee.io
## Templates

```
- Dashboard
  - Analytic
  - Monitor
  - Workspace
- Form
  - Basic Form
  - Step Form
  - Advanced From
- List
  - Standard Table
  - Standard List
  - Card List
  - Search List (Project/Applications/Article)
- Profile
  - Simple Profile
  - Advanced Profile
- Account
  - Account Center
  - Account Settings
- Result
  - Success
  - Failed
- Exception
  - 403
  - 404
  - 500
- User
  - Login
  - Register
  - Register Result
```

## Usage

### Use bash

```bash
$ git clone https://github.com/ant-design/ant-design-pro.git --depth=1
$ cd ant-design-pro
$ npm install
$ npm run start         # visit http://localhost:8000 本地开发环境
$ npm run build:test    # 测试环境打包
$ npm run build:preProd # 沙箱环境打包
$ npm run build:prod    # 生产环境打包
```

### Use by docker

```bash
# preview 
$ docker pull chenshuai2144/ant-design-pro
$ docker run -p 80:80 chenshuai2144/ant-design-pro
# open http://localhost

# dev 
$ npm run docker:dev

# build 
$ npm run docker:build


# production dev 
$ npm run docker-prod:dev

# production build 
$ npm run docker-prod:build
```

More instructions at [documentation](http://pro.ant.design/docs/getting-started).

## Browsers support

Modern browsers and IE11.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## Contributing

Any type of contribution is welcome, here are some examples of how you may contribute to this project:

- Use Ant Design Pro in your daily work.
- Submit [issues](http://github.com/ant-design/ant-design-pro/issues) to report bugs or ask questions.
- Propose [pull requests](http://github.com/ant-design/ant-design-pro/pulls) to improve our code.

新增页面说明
1.常规的新增一个页面配置路由
2.路由配置时新增一个perms字段
3.去管理平台菜单管理新增当前页面的所有菜单
4.在配置菜单时的授权字段和路由配置里面的perms字段保持一致
5.如果新增的授权字段需要注解就把改字段告诉后台
6.perms命名规则
目录级别
目录名称:目录名称:manage
例如
    系统管理-systemManage
    sys:sys:manage
    合作商管理-cooperatormanage
    coo:coo:manage
菜单级别
目录名称:菜单名称:list
例如
    系统管理-角色管理  systemManage-rolemange
    sys:role:list
按钮
    
    查看
    系统管理-角色管理-查看  systemManage-rolemange-read
    sys:role:read
    合作商管理-合作商管理-查看
    coo:coo:read
    编辑
    类似查看最后read改为update
    删除
    类似查看最后read改为del
    启用
    类似查看最后read改为active
    停用
    类似查看最后read改为cancel
    上线
    类似查看最后read改为online 
    下线
    类似查看最后read改为downline
    查看列表
    prems和对应的菜单的perms保持一致，每个菜单必须有的按钮
说明：如果各种名称很长可用缩写，宗旨是保持唯一和语义化


