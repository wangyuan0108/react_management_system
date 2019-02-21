import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, } from 'antd';


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

@connect(({ user }) => ({
  userInfo: user.currentUser,

}))
@Form.create()
class BaseView extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  componentDidMount() {
    this.getUserInfo()
    this.setBaseInfo(this.props.userInfo);
    
  }

  componentWillReceiveProps(nextProps){
    if(this.props.userInfo!==nextProps.userInfo){
      this.setBaseInfo(nextProps.userInfo)
    }
  }
 

  getUserInfo = () => {
    const {
      dispatch,
    } = this.props;
    
    dispatch({
      type: 'user/fetchCurrent',
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const value = {
          email: values.email,
          mobile: values.mobile,
          fullName: values.fullName
        }
        const { dispatch } = this.props;
        dispatch({
          type: 'user/modifyUserInfoByToken',
          payload: {
            ...value
          },
        })
      }
    });
  }


  setBaseInfo = (userInfo) => {
    const { form } = this.props;
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = userInfo[key] || null;
      form.setFieldsValue(obj);
    });
  };

 

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {

      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 16 },
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
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} layout='vertical'>
        <Form.Item
          {...formItemLayout}
          label="ID"
        >
          {getFieldDecorator('id')(
            <Input disabled={true} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('account')(
            <Input disabled={true} />
          )}
        </Form.Item>
        
        <Form.Item
          {...formItemLayout}
          label={(
            <span>
              真实姓名
            </span>
          )}
        >
          {getFieldDecorator('fullName',)(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('mobile',{
             rules: [{
              required: true,
              message: '手机号不能为空',
            },
              {
                pattern: /^1\d{10}$/,
                message: '手机号错误',
              },
            ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="E-email"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '输入的不是有效邮箱',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">更新个人状态</Button>
        </Form.Item>
      </Form>

    );
  }
}
export default BaseView;
