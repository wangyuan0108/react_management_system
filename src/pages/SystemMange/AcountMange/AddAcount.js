import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Button } from 'antd';
import router from 'umi/router';

// const AutoCompleteOption = AutoComplete.Option;
@connect(({ acountmange }) => ({
  serialVoList: acountmange.serialList.serialVoList,
  roleList: acountmange.roleList.roleList,
  userDetail: acountmange.userDetail,
}))
@Form.create()
class RegistrationForm extends Component {
  state = {
    passwordRequire: true,
    serialId: '',
  };
  componentDidMount() {
    const { dispatch, location, match, userDetail, form } = this.props;
    const { userId } = location.query;
    dispatch({
      type: 'acountmange/getSerialInfoList',
    });
    if (match.path === '/systemmange/acountmange/editacount') {
      this.setState({
        passwordRequire: false,
      });
      dispatch({
        type: 'acountmange/getUserDetail',
        payload: { userId },
      }).then(data => {
        dispatch({
          type: 'acountmange/getRoleInfoListBySerialId',
          payload: { serialId: data.result.serialId },
        });
      });
    } else {
      const { dispatch } = this.props;
      dispatch({
        type: 'acountmange/clearUserDetail',
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { match } = this.props;
      if (!err) {
        if (match.path === '/systemmange/acountmange/editacount') {
          this.handleClickEditUser(values);
        } else {
          this.handleClickAddUser(values);
        }
      }
    });
  };
  handleClickAddUser = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'acountmange/addUser',
      payload: params,
    });
  };
  handleClickEditUser = params => {
    const { dispatch, location } = this.props;
    const { userId } = location.query;
    dispatch({
      type: 'acountmange/editUser',
      payload: { userId, spId: 1, ...params },
    });
  };
  handleSubsysChange = value => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'acountmange/getRoleInfoListBySerialId',
      payload: { serialId: value },
    });
    form.setFieldsValue({
      roleIdList: [],
    });
  };
  compareToFirstUsername = (rule, value, callback) => {
    if (escape(value).indexOf('%u') < 0) {
      callback();
    } else {
      callback('不能是汉字');
    }
  };
  handleClickCanelBtton = () => {
    router.push('/systemmange/acountmange/acountmange');
  };
  render() {
    const { form, serialVoList, roleList, userDetail } = this.props;
    let itemList, roleListDom;
    serialVoList
      ? (itemList = serialVoList.map(item => {
          return (
            <Select.Option value={item.id} key={item.id}>
              {item.name}
            </Select.Option>
          );
        }))
      : [];
    roleList
      ? (roleListDom = roleList.map(role => {
          return (
            <Select.Option value={role.roleId} key={role.roleId}>
              {role.roleName}
            </Select.Option>
          );
        }))
      : null;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 5,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="用户名">
          {getFieldDecorator('account', {
            initialValue: (userDetail.sysUserVo && userDetail.sysUserVo.account) || null,
            rules: [
              {
                required: true,
                message: '请输入用户名！',
              },
              {
                validator: this.compareToFirstUsername,
              },
            ],
          })(<Input placeholder="用户名" disabled={!this.state.passwordRequire} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="密码">
          {getFieldDecorator('password', {
            rules: [
              {
                required: this.state.passwordRequire,
                message: '请输入密码！',
              },
            ],
          })(<Input type="password" placeholder="密码" autoComplete="new-password" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="手机号">
          {getFieldDecorator('mobile', {
            initialValue: (userDetail.sysUserVo && userDetail.sysUserVo.mobile) || null,
            rules: [
              {
                required: true,
                message: '请输入手机号！',
              },
            ],
          })(<Input onBlur={this.handleConfirmBlur} placeholder="手机号" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="邮箱">
          {getFieldDecorator('email', {
            initialValue: (userDetail.sysUserVo && userDetail.sysUserVo.email) || null,
            rules: [
              {
                type: 'email',
                message: '请注意邮箱格式!',
              },
              {
                required: false,
                message: '请输入邮箱！',
              },
            ],
          })(<Input placeholder="邮箱" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="真实姓名">
          {getFieldDecorator('fullName', {
            initialValue: (userDetail.sysUserVo && userDetail.sysUserVo.fullName) || null,
            rules: [{ required: false, message: '请输入真实姓名！', whitespace: true }],
          })(<Input placeholder="真实姓名" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="子系统选择">
          {getFieldDecorator('serialId', {
            initialValue: (userDetail.sysUserVo && userDetail.serialId) || null,
            rules: [{ required: true, message: '请选择系统！' }],
          })(
            <Select onChange={this.handleSubsysChange} placeholder="请选择系统">
              {itemList}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="角色选择">
          {getFieldDecorator('roleIdList', {
            initialValue: (userDetail && userDetail.roleIdList) || [],
            rules: [{ required: true, message: '请选择角色！' }],
          })(
            <Select mode="multiple" placeholder="请选择角色">
              {roleListDom}
            </Select>
          )}
        </Form.Item>
        {/* <Form.Item {...formItemLayout} label="机构选择">
          {getFieldDecorator('spId', {
            rules: [{ required: true, message: '请选择机构！' }],
          })(
            <Select onChange={this.handleChange} placeholder="请选择机构">
              <Select.Option value={1}>机构一</Select.Option>
              <Select.Option value={2}>机构二</Select.Option>
            </Select>
          )}
        </Form.Item> */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button style={{ marginLeft: 20 }} onClick={this.handleClickCanelBtton}>
            取消
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default RegistrationForm;
