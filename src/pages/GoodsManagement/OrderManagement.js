import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, message, Form, Input, Select, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import Link from 'umi/link';

const confirm = Modal.confirm;
const FormItem = Form.Item;
@Form.create()
class goodsList extends Component {
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    // ID  用户名  手机号   所属角色  所属机构  注册时间  状态
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'orderCode',
        key: 'orderCode',
      },
      {
        title: '商品名称',
        dataIndex: 'goodsName',
        key: 'goodsname',
      },
      {
        title: '门店名称',
        dataIndex: 'shopName',
        key: 'shopName',
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
      },
      {
        title: '用户名称',
        dataIndex: 'adminName',
        key: 'adminName',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '合作商',
        dataIndex: 'partner',
        key: 'partner',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: text => (
          <a>
            <Link to="/goodsManagement/orderManagement/orderDetail">{text}</Link>
          </a>
        ),
      },
    ];
    const dataSource = [
      {
        key: '1',
        orderCode: 1024,
        orderStatus: '正常',
        goodsName: '辣条',
        adminName: '老干妈',
        phone: '10010',
        serviceType: '食品',
        shopName: '商场',
        partner: '卫龙',
        price: '158',
        createTime: '2019-2-18',
        status: '上架',
        operation: '查看详情',
      },
      {
        key: '2',
        orderCode: 1025,
        orderStatus: '正常',
        goodsName: '辣条',
        adminName: '老干妈',
        phone: '10011',
        serviceType: '食品',
        shopName: '商场',
        partner: '卫龙',
        price: '158',
        createTime: '2019-2-18',
        status: '上架',
        operation: '查看详情',
      },
    ];

    return (
      <PageHeaderWrapper>
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
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default goodsList;
