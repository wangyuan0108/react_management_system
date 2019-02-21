import React, { Component, Fragment } from 'react';

import { formatMessage, FormattedMessage } from 'umi/locale';
import { List, Modal, Form, Input, Icon } from 'antd';
import { connect } from 'dva';
import { from } from 'array-flatten';


const FormItem = Form.Item;

const passwordStrength = {

  strong: (
    <font className="strong">
      <FormattedMessage id="app.settings.security.strong" defaultMessage="Strong" />
    </font>
  ),
  medium: (
    <font className="medium">
      <FormattedMessage id="app.settings.security.medium" defaultMessage="Medium" />
    </font>
  ),
  weak: (
    <font className="weak">
      <FormattedMessage id="app.settings.security.weak" defaultMessage="Weak" />
      Weak
    </font>
  ),
};
@connect()
@Form.create()
class SecurityView extends Component {
  state = { visible: false }

  getData = () => [
    {
      title: formatMessage({ id: 'app.settings.security.password' }, {}),
      description: (
        <Fragment>
          {formatMessage({ id: 'app.settings.security.password-description' })}
          {passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a onClick={this.changePassword}>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
  ];

  changePassword = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const form = this.props.form;
    form.validateFields((err) => {
      if (!err) {
        const value={
          oldPassword:form.getFieldValue('oldPassword'),
          newPassword:form.getFieldValue('newPassword')
        }
        const{dispatch}=this.props;
        dispatch({
          type:'user/changePassword',
          payload:{
            ...value
          }
        })
      }
    });
    
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    const form = this.props.form;
    form.resetFields()
  }

  checkConfirm= (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次密码不一致');
    } else {
      callback();
    }
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  handleSubmitGetCode = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
       console.log(values)
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
        <Fragment>
          <List
            dataSource={this.getData()}
            renderItem={item => (
              <List.Item actions={item.actions}>
                <List.Item.Meta title={item.title} description={item.description} />
              </List.Item>
            )}
          />
        </Fragment>
        <Modal
          title="修改密码"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem>
              {getFieldDecorator('oldPassword', {
                rules: [{ required: true, message: '请输入旧密码！' }],
              })(
                <Input type="password" placeholder="请输入旧密码" size="large" name="account" onChange={this.changState} />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('newPassword', {
                rules: [{
                  required: true, message: '请输入密码',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" size="large" placeholder="请输入新密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '请再次输入新密码',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} size="large" placeholder="请再次输入新密码" />
              )}
            </FormItem>

          </Form>
        </Modal>

      </div>
    );
  }
}

export default SecurityView;
