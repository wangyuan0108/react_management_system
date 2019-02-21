import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, message, Form, Input, Select, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';

const confirm = Modal.confirm;
const FormItem = Form.Item;

@connect(({ acountmange }) => ({
  listData: acountmange.list.userInfoList,
  total: acountmange.list.count,
}))
@Form.create()
class CooperatorAccountManage extends Component {
  state = { userId: null, selectedRowKeys: [], params: { pageNum: 1, pageSize: 10 } };
  componentDidMount() {
    this.getUerListData();
  }

  getUerListData = val => {
    const { dispatch } = this.props;
    const { params } = this.state;
    console.log(val);

    dispatch({
      type: 'acountmange/getUserList',
      payload: {
        account: (val && val.account) || '',
        mobile: (val && val.mobile) || '',
        pageNum: '',
        pageSize: '',
        status: (val && val.status) || '',
        userId: '',
        ...params,
      },
    });
  };

  addAcount = () => {
    router.push(`/systemmange/acountmange/addacount`);
  };

  editAcount = () => {
    const { userId, selectedRowKeys } = this.state;
    if (selectedRowKeys.length > 1) {
      message.warning('只能选择一位用户');
      return;
    }
    if (selectedRowKeys.length > 0) {
      router.push({ pathname: '/systemmange/acountmange/editacount', query: { userId: userId } });
    } else {
      message.warning('请选择需要编辑的用户');
    }
  };

  handleClickSetLineStatus = params => {
    console.log(params);
  };
  handleClickDelUser = () => {
    this.setState({ selectedRowKeys: [] }, () => {
      console.log(this.state.selectedRowKeys);
    });

    const { dispatch } = this.props;
    const { userId } = this.state;
    dispatch({
      type: 'acountmange/delUser',
      payload: { userId },
    }).then(() => {
      this.setState({ userId: null });
      this.getUerListData();
    });
  };
  // handleClickEditUser = () => {
  //   this.setState({ selectedRowKeys: [] }, () => {
  //     console.log(this.state.selectedRowKeys);
  //   });
  //   const { dispatch } = this.props;
  //   const { userId } = this.state;
  //   if (selectedRowKeys.length > 1) {
  //     message.warning('只能选择一位用户');
  //     return;
  //   }
  //   if (selectedRowKeys.length > 0) {
  //   dispatch({
  //     type: 'acountmange/delUser',
  //     payload: { userId },
  //   });
  // };
  handleClickActiveUser = () => {
    this.setState({ selectedRowKeys: [] }, () => {
      console.log('66', this.state.selectedRowKeys);
    });
    const { dispatch } = this.props;
    const { userId } = this.state;
    dispatch({
      type: 'acountmange/activeUser',
      payload: { userId },
    }).then(() => {
      this.getUerListData();
    });
  };
  handleCancelUser = () => {
    this.setState({ selectedRowKeys: [] }, () => {
      console.log(this.state.selectedRowKeys);
    });
    const { dispatch } = this.props;
    const { userId } = this.state;
    dispatch({
      type: 'acountmange/cancelUser',
      payload: { userId },
    }).then(() => {
      this.getUerListData();
    });
  };
  showConfirm = () => {
    const { userId, selectedRowKeys } = this.state;
    const me = this;
    if (selectedRowKeys.length > 1) {
      message.warning('只能选择一位用户');
      return;
    }
    if (selectedRowKeys.length > 0) {
      confirm({
        title: '删除',
        content: '确定要删除吗？',
        cancelText: '否',
        okText: '是',
        onOk() {
          me.handleClickDelUser();
        },
        onCancel() {},
      });
    } else {
      message.warning('请选择用户');
    }
  };
  // showEditConfirm = () => {
  //   const { userId, selectedRowKeys } = this.state;
  //   const me = this;
  //   if (selectedRowKeys.length > 1) {
  //     message.warning('只能选择一位用户');
  //     return;
  //   }
  //   if (selectedRowKeys.length > 0) {
  //     confirm({
  //       title: '编辑用户',
  //       content: '确定要编辑用户吗？',
  //       cancelText: '否',
  //       okText: '是',
  //       onOk() {
  //         me.editAcount();
  //       },
  //       onCancel() {},
  //     });
  //   } else {
  //     message.warning('请选择用户');
  //   }
  // };
  showActiveConfirm = () => {
    const { userId, selectedRowKeys } = this.state;
    if (selectedRowKeys.length > 1) {
      message.warning('只能选择一位用户');
      return;
    }
    const me = this;
    if (selectedRowKeys.length > 0) {
      confirm({
        title: '启用用户',
        content: '确定要启用用户吗？',
        cancelText: '否',
        okText: '是',
        onOk() {
          me.handleClickActiveUser();
        },
        onCancel() {},
      });
    } else {
      message.warning('请选择用户');
    }
  };
  showCancelConfirm = () => {
    const { userId, selectedRowKeys } = this.state;
    if (selectedRowKeys.length > 1) {
      message.warning('只能选择一位用户');
      return;
    }
    const me = this;
    if (selectedRowKeys.length > 0) {
      confirm({
        title: '停用用户',
        content: '确定要停用用户吗？',
        cancelText: '否',
        okText: '是',
        onOk() {
          me.handleCancelUser();
        },
        onCancel() {},
      });
    } else {
      message.warning('请选择用户');
    }
  };
  handleClickChangePage = (pageNum, pageSize) => {
    this.setState({ params: { pageNum, pageSize } }, () => {
      this.getUerListData();
    });
  };
  onShowSizeChange = (current, pageSize) => {
    this.setState(
      {
        params: { pageNum: current, pageSize: pageSize },
      },
      () => {
        this.getUerListData();
      }
    );
  };
  showtotal = total => `共 ${total} 条数据`;
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getUerListData(values);
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
    this.getUerListData();
  };
  render() {
    const list = JSON.parse(sessionStorage.getItem('permsList'));
    const { listData, total, form } = this.props;
    const { getFieldDecorator } = form;

    // ID  用户名  手机号   所属角色  所属机构  注册时间  状态
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'account',
        render: (text, record, index) => {
          return (
            <div
              style={{
                width: '150px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {text}
            </div>
          );
        },
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '注册时间',
        dataIndex: 'gmtCreate',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: text =>
          Number(text) === 1 ? <span>启用</span> : <span style={{ color: 'red' }}>停用</span>,
      },
    ];
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: selectedRowKeys => {
        console.log(selectedRowKeys);

        if (selectedRowKeys[0]) {
          this.setState({ userId: selectedRowKeys[0], selectedRowKeys });
        } else {
          this.setState({ userId: null, selectedRowKeys });
        }
      },
    };
    return (
      <PageHeaderWrapper>
        <div style={{ background: '#fff', padding: 16 }}>
          {/* {list.includes('sys:account:add') ? (
            <Button
              type="primary"
              style={{ marginBottom: 16, marginRight: 16 }}
              onClick={this.addAcount}
            >
              新增账户
            </Button>
          ) : null}
          {list.includes('sys:account:update') ? (
            <Button
              type="primary"
              style={{ marginBottom: 16, marginRight: 16 }}
              onClick={this.editAcount}
            >
              编辑账户
            </Button>
          ) : null} */}
          {list.includes('sys:account:active') ? (
            <Button
              type="primary"
              style={{ marginBottom: 16, marginRight: 16 }}
              onClick={this.showActiveConfirm}
            >
              启用
            </Button>
          ) : null}
          {list.includes('sys:account:cancel') ? (
            <Button
              type="primary"
              style={{ marginBottom: 16, marginRight: 16 }}
              onClick={this.showCancelConfirm}
            >
              停用
            </Button>
          ) : null}
          {list.includes('sys:account:del') ? (
            <Button type="primary" style={{ marginBottom: 16 }} onClick={this.showConfirm}>
              删除
            </Button>
          ) : null}

          <Form layout="inline" onSubmit={this.handleSubmit} style={{ marginBottom: '10px' }}>
            <FormItem label="账户">
              {getFieldDecorator('account', {
                initialValue: '',
              })(
                <Input
                  type="text"
                  placeholder="请填账户"
                  style={{
                    width: '200px',
                  }}
                  allowClear
                  autoComplete="off"
                />
              )}
            </FormItem>
            <FormItem label="手机号">
              {getFieldDecorator('mobile', {
                initialValue: '',
              })(
                <Input
                  type="text"
                  placeholder="请填手机号"
                  style={{ width: '200px' }}
                  allowClear
                  autoComplete="off"
                />
              )}
            </FormItem>
            {/* <FormItem label="注册时间">
              {getFieldDecorator('num2')(<DatePicker style={{ width: '200px' }} />)}
            </FormItem> */}
            <FormItem label="状态">
              {getFieldDecorator('status', {
                // initialValue: '',
              })(
                <Select style={{ width: '200px' }} placeholder="请选择" allowClear>
                  <Option value="1">启用</Option>
                  <Option value="0">停用</Option>
                </Select>
              )}
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: '3px', marginRight: '3px' }}
            >
              查询
            </Button>
            <Button style={{ marginTop: '3px' }} onClick={this.handleReset}>
              重置
            </Button>
          </Form>
          <Table
            rowSelection={rowSelection}
            dataSource={listData}
            columns={columns}
            rowKey="id"
            locale={{ filterReset: '重置' }}
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              total,
              onChange: this.handleClickChangePage,
              onShowSizeChange: this.onShowSizeChange,
              showTotal: this.showtotal,
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default CooperatorAccountManage;
