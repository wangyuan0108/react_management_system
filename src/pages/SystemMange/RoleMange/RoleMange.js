import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Form, Table, Button, Input, Select, message, Modal } from 'antd';
import router from 'umi/router';

@connect(({ role }) => ({
  roleData: role.roleData,
  roleId: role.roleId,
  delRoleData: role.delRoleData,
  pageInfo: role.pageInfo,
  total: role.roleData.result && role.roleData.result.total,
}))
@Form.create()
class RoleMange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectRoleId: [] /* 存储选中的用户ID */,
      visible: true,
      selectedRowKeys: [],
      pageSize: 10,
    };
  }
  componentDidMount() {
    /* 获取角色信息 */
    this.getRoleData();
  }
  getRoleData = roleName => {
    const { dispatch } = this.props;
    console.log('getRoleData', this.state.pageSize);
    dispatch({
      type: 'role/getRoleData',
      payload: {
        pageNum: 1,
        pageSize: this.state.pageSize,
        roleName: roleName || '',
      },
    });
  };
  /* 跳转至新增角色  */
  onTabChange = () => {
    router.push(`/systemmange/rolemange/role`);
  };
  /* 跳转至权限管理 */

  onAuthorization = () => {
    let len = this.state.selectedRowKeys.length;
    switch (len) {
      case 0:
        message.error('请勾选一个角色');
        break;
      case 1:
        router.push(`/systemmange/rolemange/authorization?roleId=${this.state.selectedRowKeys}`);
        break;
      default:
        message.error('最多修改一个用户');
    }
  };
  /* 删除角色 */
  handleDeleteRole = () => {
    const id = this.state.selectedRowKeys;
    const { dispatch, roleId, pageInfo } = this.props;
    const { pageNum } = pageInfo;
    if (id.length === 0) return message.error('请勾选一个角色');
    dispatch({
      type: 'role/delRoleInfo',
      payload: { id, pageNum, pageSize: this.state.pageSize, roleName: '' },
      cb: () => {
        this.setState({
          ...this.state,
          selectedRowKeys: [],
        });
        message.success('删除成功');
      },
    });
  };
  /* 翻页信息 */
  handleJumpPage = (pageNum, pageSize) => {
    console.log(pageSize);
    const { dispatch } = this.props;
    dispatch({
      type: 'role/getRoleData',
      payload: { pageNum, pageSize, roleName: '' },
    });
    //  dispatch({
    //     type:"role/upDatePageInfo",
    //     payload:{ pageNum,pageSize}
    //   })
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ ...this.state, selectedRowKeys });
  };
  confirm = () => {
    let len = this.state.selectedRowKeys.length;
    if (len === 0) return message.error('请勾选一个角色');
    Modal.confirm({
      title: '删除',
      content: '确定删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.handleDeleteRole();
      },
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('values', values);
      this.getRoleData(values.roleName);
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
    this.getRoleData();
  };
  onShowSizeChange = (current, pageSize) => {
    this.setState(
      {
        ...this.state,
        pageSize,
      },
      function() {
        this.getRoleData();
      }
    );
  };

  showtotal = total => `共 ${total} 条数据`;
  gotoCheckSee = () => {
    let len = this.state.selectedRowKeys.length;
    switch (len) {
      case 0:
        message.error('请勾选一个角色');
        break;
      case 1:
        router.push(`/systemmange/rolemange/checksee?roleId=${this.state.selectedRowKeys}`);
        break;
      default:
        message.error('最多查看一个用户');
    }
    console.log(this.state.selectedRowKeys);
  };
  render() {
    const list = JSON.parse(sessionStorage.getItem('permsList'));
    const FormItem = Form.Item;
    const { roleData } = this.props;
    const { getFieldDecorator } = this.props.form;
    //ID  用户名  手机号   所属角色  所属机构  注册时间  状态
    const columns = [
      {
        title: 'ID',
        dataIndex: 'roleId',
      },

      {
        title: '角色名',
        dataIndex: 'roleName',
      },

      {
        title: '角色简介',
        dataIndex: 'roleSummary',
        render: state => (state && state.length > 15 ? state.slice(0, 15) + '......' : state),
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
      },
      {
        title: '修改时间',
        dataIndex: 'gmtModified',
      },
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
    };
    const pagination = {
      showQuickJumper: true,
      total: this.props.total,
      showTotal: this.showtotal,
      showSizeChanger: true,
      defaultPageSize: 10,
      onChange: this.handleJumpPage,
      pageSizeOptions: ['10', '20', '30', '40'],
      onShowSizeChange: this.onShowSizeChange,
    };

    //按钮样式
    const ButtonStyle = { marginBottom: 16, marginRight: 16 };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div>
        <PageHeaderWrapper>
          <div style={{ background: '#fff', padding: 16 }}>
            {list.includes('sys:role:add') ? (
              <Button
                type="primary"
                style={ButtonStyle}
                onClick={() => {
                  this.onTabChange();
                }}
              >
                新增角色
              </Button>
            ) : null}
            {list.includes('sys:role:update') ? (
              <Button type="primary" style={ButtonStyle} onClick={this.onAuthorization}>
                权限管理
              </Button>
            ) : null}
            {list.includes('sys:role:read') ? (
              <Button type="primary" style={ButtonStyle} onClick={this.gotoCheckSee}>
                查看
              </Button>
            ) : null}
            {list.includes('sys:role:del') ? (
              <Button
                type="danger"
                style={{ marginBottom: 16 }}
                onClick={this.handleDeleteRole}
                onClick={this.confirm}
              >
                删除
              </Button>
            ) : null}

            <Form layout="inline" onSubmit={this.handleSubmit} style={{ marginBottom: '10px' }}>
              <FormItem label="角色名称">
                {getFieldDecorator('roleName')(
                  <Input type="text" placeholder="名称" style={{ width: '200px' }} />
                )}
                .
              </FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: '3px', marginRight: '3px' }}
              >
                查询
              </Button>
              <Button onClick={this.handleReset} style={{ marginTop: '3px' }}>
                重置
              </Button>
            </Form>

            <Table
              rowSelection={rowSelection}
              dataSource={roleData.result && roleData.result.roleInfos}
              columns={columns}
              rowKey="roleId"
              pagination={pagination}
            />
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default RoleMange;
