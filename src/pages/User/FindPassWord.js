import React, { Component } from 'react';
import { connect } from 'dva';
import { Steps, Button, Card, Row, Col, Form, message, Input, Icon } from 'antd';
import styles from './FindPassWord.less';
import router from 'umi/router';
import { couldStartTrivia } from 'typescript';
const FormItem = Form.Item;


@connect(({ user }) => ({
  forgetPasswordResponse: user.forgetPasswordResponse,
  saveResponseKey: user.saveResponseKey,
  timestampI:user.timestampI
}))
@Form.create()
class AcountMange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
    };
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.timestampI !==this.props.timestampI){
       this.runGetCaptchaCountDown(120)
    }
  }

  handleSubmitGetCode = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { saveResponseKey } = this.props
        if (!saveResponseKey) {
          message.error('请先获取验证码');
          return
        }
        console.log(saveResponseKey)
        const value = {
          account: values.account,
          newPassword: values.newPassword,
          verificationCode: values.verificationCode
        }

        const { dispatch } = this.props;
        dispatch({
          type: 'user/forgetPassword',
          payload: {
            ...value,
            key: saveResponseKey
          },
        })
      }
    });
  }

  getPhoneCode = () => {
      this.props.form.validateFields(["account"], (err, values) => {
        if (!err) {
          const { dispatch } = this.props;
          dispatch({
            type: 'user/getCaptcha4ForgetPassword',
            payload: {
              ...values
            }
          })
         
        }
      });
  };

  runGetCaptchaCountDown = (num) => {
    let countN=num
    this.setState({ count :countN});
    this.interval = setInterval(() => {
      countN -= 1;
      this.setState({ count:countN });
      if (countN === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };
  
  handleSubmitPassWord = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkConfirm = (rule, value, callback) => {
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

  goBacke = () => {
    router.push({
      pathname: '/user/login'
    });
    console.log(999)
     const { dispatch } = this.props;
    dispatch({
      type: 'user/changeState'
    })
  };

  render() {

    const {
      form: { getFieldDecorator },
      forgetPasswordResponse,  
    } = this.props;
    const currentNew = forgetPasswordResponse ? forgetPasswordResponse.code : 0 
    const { count } = this.state;
    return (
      <div>
        <div className={styles.box}>
          <Card
            title="找回密码"
            size='default'
          >
            <div>
              {currentNew === '200' ?
                <div className={styles.stepsContent}>
                  <div className={styles.formBox}>
                    <Icon type="check" style={{ fontSize: '50px', color: '#1890FF', marginBottom: '50px' }} />
                    <p>重置密码成功，点击
                      <Button type="primary" onClick={this.goBacke}>
                        返回登陆
                      </Button>登陆
                     </p>
                  </div>
                </div>

                :
                <div className={styles.stepsContent}>
                  <div className={styles.formBox}>
                    <Form onSubmit={this.handleSubmitGetCode}>
                      <FormItem>
                        {getFieldDecorator('account', {
                          rules: [{ required: true, message: '请输入需找回密码的账号！' }],
                        })(
                          <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号" size="large" name="account"  />
                        )}
                      </FormItem>
                      <FormItem>
                        <Row gutter={8}>
                          <Col span={16}>
                            {getFieldDecorator('verificationCode', {
                              rules: [{ required: true, message: '请输入验证码' }],
                            })(
                              <Input placeholder="验证码" size="large" name="captcha"  />
                            )}
                          </Col>
                          <Col span={8}>
                            <Button size="large"
                              onClick={this.getPhoneCode}
                              disabled={count}
                            >
                              {count ? `${count} s` : '获取验证码'}
                            </Button>
                          </Col>
                        </Row>
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
                      <Button onClick={this.goBacke} style={{ marginRight: '50px' }}>返回登陆</Button>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        确定
                    </Button>
                    </Form>
                  </div>
                </div>
              }
            </div>
          </Card>
        </div>

      </div>
    );
  }
}
export default AcountMange;
