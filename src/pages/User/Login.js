import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import { Modal, Form, Input, Button } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Submit, VerificationCode } = Login;
const FormItem = Form.Item;
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
  captchaUrl: login.CaptchaUrl,
  saveResponseKeyLogin: login.saveResponseKeyLogin,
}))
@Form.create()
class LoginPage extends Component {
  state = {
    type: '0',
  };

  componentDidMount() {
    this.getCaptcha();
  }

  onTabChange = type => {
    this.setState({ type });
  };

  handleOk = () => {
    const form = this.props.form;
    this.props.form.validateFields(err => {
      if (!err) {
        const value = {
          account: form.getFieldValue('accountNwe'),
          oldPassword: form.getFieldValue('oldPassword'),
          newPassword: form.getFieldValue('newPassword'),
        };
        const { dispatch } = this.props;
        dispatch({
          type: 'login/changePasswordByAccount',
          payload: {
            ...value,
          },
        });
      }
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch, saveResponseKeyLogin } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
          key: saveResponseKeyLogin,
        },
      });
      // .then(() => {
      //   dispatch({
      //     type: 'login/getUserPermissionList',
      //   });
      // })
    }
  };

  getCaptcha = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/getCaptchaUrl',
      payload: {
        scene: '4',
        sourceId: '1001',
        type: '6',
      },
    });
  };

  goToFindPassWord = () => {
    router.push({
      pathname: '/user/findPassWord',
      query: { foo: 'bar' },
    });
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次密码不一致');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  render() {
    const { login, submitting, captchaUrl } = this.props;
    const { type } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
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
    const visible = login.showModelPassWord;

    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="0" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            <div>
              {login.status === 'error' &&
                login.type === '0' &&
                !submitting &&
                this.renderMessage('账户或密码错误')}
              <UserName
                name="account"
                placeholder="用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名！',
                  },
                ]}
              />
              <Password
                name="password"
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
                onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
              />
              <VerificationCode
                name="verificationCode"
                placeholder="请输入验证码"
                countDown={120}
                onGetCaptcha={this.getCaptcha}
                captchaUrl={captchaUrl}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.verification-code.required' }),
                  },
                ]}
                onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <a href="javascript:void(0);" onClick={this.goToFindPassWord}>
                忘记密码{' '}
              </a>
            </div>
          </Tab>
          {/* 手机号登陆一期不做 */}
          {/* <Tab key="1" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
            <Mobile
              name="mobile"
              placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.phone-number.required' }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                },
              ]}
            />
            <Captcha
              name="yyy"
              placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
              countDown={120}
              getCaptchaButtonText={formatMessage({ id: 'form.get-captcha' })}
              getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.verification-code.required' }),
                },
              ]}
            />
          </Tab> */}
          <Submit loading={submitting}>登陆</Submit>
        </Login>
        <Modal title="修改密码" visible={visible} closable={false} footer={null}>
          <Form>
            <FormItem label="账号" {...formItemLayout}>
              {getFieldDecorator('accountNwe', {
                rules: [{ required: true, message: '请输入账号' }],
              })(
                <Input placeholder="账号" size="large" name="account" onChange={this.changState} />
              )}
            </FormItem>
            <FormItem label="旧密码" {...formItemLayout}>
              {getFieldDecorator('oldPassword', {
                rules: [{ required: true, message: '请输入需找回密码的账号！' }],
              })(
                <Input
                  type="password"
                  placeholder="请输入旧密码"
                  size="large"
                  name="account"
                  onChange={this.changState}
                />
              )}
            </FormItem>
            <FormItem label="新密码" {...formItemLayout}>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码',
                  },
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(<Input type="password" size="large" placeholder="请输入新密码" />)}
            </FormItem>
            <FormItem label="再次输入新密码" {...formItemLayout}>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请再次输入新密码',
                  },
                  {
                    validator: this.checkConfirm,
                  },
                ],
              })(
                <Input
                  type="password"
                  onBlur={this.handleConfirmBlur}
                  size="large"
                  placeholder="请再次输入新密码"
                />
              )}
            </FormItem>
            <FormItem style={{ textAlign: 'center' }}>
              <Button type="primary" size="large" onClick={this.handleOk}>
                {' '}
                确定
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default LoginPage;
