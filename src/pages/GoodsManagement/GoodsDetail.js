import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal,
  Transfer,
  Card,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import Link from 'umi/link';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
@Form.create()
class goodsList extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    visible: false,
    mockData: [],
    targetKeys: [],
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  componentDidMount() {
    this.getMock();
  }
  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      // if (data.chosen) {
      //   targetKeys.push(data.key);
      // }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <div>基础信息</div>
        <Form.Item {...formItemLayout} label="选择合作商">
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: 'Please input the captcha you got!' }],
              })(<Input autoComplete="off" placeholder="请输入门店的名称" />)}
            </Col>
            <Col span={7}>
              <Button type="primary" onClick={this.showModal}>
                从列表中选择
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...formItemLayout} label="选择门店">
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('captcha0', {
                rules: [{ required: true, message: 'Please input the captcha you got!' }],
              })(<Input autoComplete="off" placeholder="请输入门店的名称" />)}
            </Col>
            <Col span={7}>
              <Button type="primary" onClick={this.showModal}>
                从列表中选择
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...formItemLayout} label="产品编号">
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              autoComplete="nope"
              onBlur={this.handleConfirmBlur}
              placeholder="请输入产品编号"
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="产品名称">
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input onBlur={this.handleConfirmBlur} placeholder="请输入套餐名称" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="价格">
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input onBlur={this.handleConfirmBlur} placeholder="请输入实际售价" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="库存量">
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input onBlur={this.handleConfirmBlur} placeholder="请输入库存量" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="套餐介绍">
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <TextArea
              placeholder="13302302190390232193128328903210329039218321832093821093809213809213812380213"
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="图片">
          <Row gutter={8}>
            <Col span={12}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
                bodyStyle={{ padding: 0 }}
              />
            </Col>
            <Col span={12}>
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
                bodyStyle={{ padding: 0 }}
              />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: 200 }}>
            返回
          </Button>
        </Form.Item>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Transfer
            dataSource={this.state.mockData}
            showSearch
            filterOption={this.filterOption}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            render={item => item.title}
          />
        </Modal>
      </Form>
    );
  }
}
export default goodsList;
