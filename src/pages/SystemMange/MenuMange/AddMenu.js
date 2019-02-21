import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Row, Col, Button, Radio } from 'antd';
import router from 'umi/router';

@connect(({ menumange }) => ({
  permissionInfo: menumange.permissionInfo,
}))
@Form.create()
class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    redioValue: '',
    name: '',
    perms: '',
    url: '',
  };
  componentDidMount() {
    const { location, match, dispatch, permissionInfo } = this.props;
    console.log('match', match, location);

    if (match.path === '/systemmange/menumange/editmenu') {
      dispatch({
        type: 'menumange/getPermissionInfoById',
        payload: { menuId: location.query.menuId },
      });
    } else {
      if (Number(location.query.menuType) === 1) {
        this.setState({
          redioValue: 3,
        });
      } else if (Number(location.query.menuType) === 2) {
        this.setState({
          redioValue: 1,
        });
      } else {
        this.setState({
          redioValue: 2,
        });
      }
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { match } = this.props;
      if (!err) {
        if (match.path === '/systemmange/menumange/editmenu') {
          this.handleClickUpdate(values);
        } else {
          this.handleClickAddMenu(values);
        }
      }
    });
  };
  handleClickAddMenu = params => {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'menumange/addMenu',
      payload: {
        parentId: location.query.menuId,
        serialId: location.query.serialId,
        sort: 0,
        ...params,
      },
    }).then(() => {
      router.push('/systemmange/menumange/menumange');
    });
  };
  handleClickUpdate = params => {
    const { dispatch, location } = this.props;
    dispatch({
      type: 'menumange/updateMenu',
      payload: {
        menuId: location.query.menuId,
        sort: 0,
        ...params,
      },
    }).then(() => {
      router.push('/systemmange/menumange/menumange');
    });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  handleClickCancel = () => {
    router.push('/systemmange/menumange/menumange');
  };
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };
  handleChange = value => {
    console.log(`selected ${value}`);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { permissionInfo, match } = this.props;
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
          span: 4,
          offset: 4,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="类型">
          {getFieldDecorator('menuType', {
            initialValue:
              match.path === '/systemmange/menumange/editmenu'
                ? Number(permissionInfo.menuType)
                : this.state.redioValue,
            rules: [{ required: true, message: '请选择' }],
          })(
            <Radio.Group>
              <Radio value={2} disabled>
                目录
              </Radio>
              <Radio value={1} disabled>
                菜单
              </Radio>
              <Radio value={3} disabled>
                按钮
              </Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            initialValue:
              match.path === '/systemmange/menumange/editmenu'
                ? permissionInfo.name
                : this.state.name,
            rules: [
              {
                required: true,
                message: '请输入名称!',
              },
            ],
          })(<Input placeholder="名称" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="授权">
          {getFieldDecorator('perms', {
            initialValue:
              match.path === '/systemmange/menumange/editmenu'
                ? permissionInfo.perms
                : this.state.perms,
            rules: [
              {
                required: true,
                message: '请输入授权!',
              },
            ],
          })(<Input placeholder="授权" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="菜单url">
          {getFieldDecorator('url', {
            initialValue:
              match.path === '/systemmange/menumange/editmenu'
                ? permissionInfo.url
                : this.state.url,
            rules: [
              {
                required: false,
                message: 'Please input your password!',
              },
            ],
          })(<Input placeholder="菜单url" />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Row>
            <Col span={12}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={this.handleClickCancel}>
                取消
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}
export default RegistrationForm;
