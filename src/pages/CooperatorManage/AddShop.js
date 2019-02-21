import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Table,
  Button,
  Modal,
  message,
  Form,
  Input,
  Select,
  DatePicker,
  Steps,
  Checkbox,
  Row,
  Col,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import Link from 'umi/link';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const Step = Steps.Step;

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];
@Form.create()
class goodsList extends Component {
  state = {
    current: 0,
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  onChange = checkedValues => {
    console.log('checked = ', checkedValues);
  };
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { current } = this.state;

    // ID  用户名  手机号   所属角色  所属机构  注册时间  状态
    const columns = [
      {
        title: '合作商名称565656565656',
        dataIndex: 'partnerName',
        key: 'partnerName',
      },
      {
        title: '服务类型',
        dataIndex: 'serviceType',
        key: 'serviceType',
      },
      {
        title: '截止时间',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: text => <Button type="primary">{text}</Button>,
      },
    ];
    const dataSource = [
      {
        key: '1',
        goodsName: '辣条',
        partnerName: '老干妈',
        serviceType: '食品',
        shopName: '商场',
        price: '158',
        date: '2019-2-18',
        status: '上架',
        operation: '下线',
      },
      {
        key: '2',
        goodsName: '辣条',
        partnerName: '老干妈',
        serviceType: '食品',
        shopName: '商场',
        price: '158',
        date: '2019-2-18',
        status: '上架',
        operation: '上线',
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <PageHeaderWrapper>
        <div style={{ overflow: 'hidden' }}>
          <Steps current={current} style={{ width: 800, margin: '0 auto' }}>
            <Step title="请选择一个合作商" />
            <Step title="请选择要添加的服务" />
          </Steps>
          {current < steps.length - 2 && (
            <Button
              style={{ marginBottom: 16, marginRight: 16, float: 'right' }}
              type="primary"
              onClick={() => this.next()}
            >
              下一步
            </Button>
          )}
          {/* {current === steps.length - 2 && (
            <Button
              style={{ marginBottom: 16, marginRight: 16, float: 'right' }}
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              完成
            </Button>
          )} */}
          {current > 0 && (
            <Button
              style={{ marginBottom: 16, marginRight: 16, float: 'right' }}
              onClick={() => this.prev()}
            >
              上一步
            </Button>
          )}
        </div>
        {current < steps.length - 2 && (
          <div style={{ background: '#fff', padding: 16 }}>
            <Form layout="inline" onSubmit={this.handleSubmit} style={{ marginBottom: '10px' }}>
              <FormItem label="合作商">
                {getFieldDecorator('account', {
                  initialValue: '',
                })(
                  <Input
                    type="text"
                    placeholder="请填合作商"
                    style={{
                      width: '150px',
                    }}
                    allowClear
                    autoComplete="off"
                  />
                )}
              </FormItem>
              <FormItem label="联系电话">
                {getFieldDecorator('phone', {
                  initialValue: '',
                })(
                  <Input
                    type="text"
                    placeholder="请填合作商联系电话"
                    style={{
                      width: '150px',
                    }}
                    allowClear
                    autoComplete="off"
                  />
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
              hideDefaultSelections={true}
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        )}
        {current === steps.length - 2 && (
          <div style={{ textAlign: 'center' }}>
            <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
              <Row>
                <Col span={24}>
                  <Checkbox value="A">体检服务</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="B">咨询服务</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="C">通用服务</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="D">挂号服务</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
            <Button type="primary" style={{ width: 200 }}>
              完成
            </Button>
          </div>
        )}
      </PageHeaderWrapper>
    );
  }
}
export default goodsList;
