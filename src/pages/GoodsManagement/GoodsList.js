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
  Checkbox,
  Row,
  Col,
  Radio,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import Link from 'umi/link';

const confirm = Modal.confirm;
const FormItem = Form.Item;
@Form.create()
class goodsList extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    router.push('/goodsManagement/goodsList/goodsDetail');
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    // ID  用户名  手机号   所属角色  所属机构  注册时间  状态
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsname',
        render: text => (
          <a>
            <Link to="/goodsManagement/goodsList/goodsDetail">{text}</Link>
          </a>
        ),
      },
      {
        title: '合作商名称',
        dataIndex: 'partnerName',
        key: 'partnerName',
      },
      {
        title: '服务类型',
        dataIndex: 'serviceType',
        key: 'serviceType',
      },
      {
        title: '门店名称',
        dataIndex: 'shopName',
        key: 'shopName',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '添加日期',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
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
        <div style={{ background: '#fff', padding: 16 }}>
          <Button
            type="primary"
            style={{ marginBottom: 16, marginRight: 16 }}
            onClick={this.showModal}
          >
            新增
          </Button>
          <Modal
            title="选择服务"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div style={{ textAlign: 'center' }}>
              <Radio.Group style={{ width: '100%' }} onChange={this.onChange}>
                <Row>
                  <Col span={24}>
                    <Radio value="A">体检服务</Radio>
                  </Col>
                  <Col span={24}>
                    <Radio value="B">咨询服务</Radio>
                  </Col>
                  <Col span={24}>
                    <Radio value="C">通用服务</Radio>
                  </Col>
                  <Col span={24}>
                    <Radio value="D">挂号服务</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </div>
          </Modal>
          <Button
            type="primary"
            style={{ marginBottom: 16, marginRight: 16 }}
            onClick={this.showActiveConfirm}
          >
            上架
          </Button>
          <Button
            type="primary"
            style={{ marginBottom: 16, marginRight: 16 }}
            onClick={this.showCancelConfirm}
          >
            下架
          </Button>
          <Button type="primary" style={{ marginBottom: 16 }} onClick={this.showConfirm}>
            删除
          </Button>

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
            <FormItem label="门店">
              {getFieldDecorator('mobile', {
                initialValue: '',
              })(
                <Input
                  type="text"
                  placeholder="请填门店"
                  style={{ width: '150px' }}
                  allowClear
                  autoComplete="off"
                />
              )}
            </FormItem>

            <FormItem label="服务">
              {getFieldDecorator('status', {})(
                <Select style={{ width: '150px' }} placeholder="请选择" allowClear>
                  <Option value="0">全部服务</Option>
                  <Option value="1">体检</Option>
                  <Option value="2">咨询</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="商品名称">
              {getFieldDecorator('mobile', {
                initialValue: '',
              })(
                <Input
                  type="text"
                  placeholder="请填商品名称"
                  style={{ width: '150px' }}
                  allowClear
                  autoComplete="off"
                />
              )}
            </FormItem>
            <FormItem label="日期">
              {getFieldDecorator('mobile', {
                initialValue: '',
              })(
                <Input
                  type="text"
                  placeholder="请填日期"
                  style={{ width: '150px' }}
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
          <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default goodsList;
