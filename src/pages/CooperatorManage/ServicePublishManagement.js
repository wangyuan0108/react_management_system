import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, message, Form, Input, Select, DatePicker, Switch } from 'antd';
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
        title: '服务类型',
        dataIndex: 'serviceType',
        key: 'serviceType',
      },
      {
        title: '合作商名称',
        dataIndex: 'partnerName',
        key: 'partnerName',
      },
      {
        title: '门店名称',
        dataIndex: 'shopName',
        key: 'shopName',
      },
      {
        title: '商品自动上架',
        dataIndex: 'goodsAutomatically',
        key: 'goodsAutomatically ',
        render: text => <Switch defaultChecked={text} />,
      },
      {
        title: '发布状态',
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
        status: '已发布',
        operation: '取消发布',
        goodsAutomatically: false,
      },
      {
        key: '2',
        goodsName: '辣条',
        partnerName: '老干妈',
        serviceType: '食品',
        shopName: '商场',
        price: '158',
        date: '2019-2-18',
        status: '未发布',
        operation: '发布服务',
        goodsAutomatically: true,
      },
    ];

    return (
      <PageHeaderWrapper>
        <div style={{ background: '#fff', padding: 16 }}>
          {/* <Button
            type="primary"
            style={{ marginBottom: 16, marginRight: 16 }}
            onClick={this.addAcount}
          >
            新增账户
          </Button>
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
          </Button> */}

          <Form layout="inline" onSubmit={this.handleSubmit} style={{ marginBottom: '10px' }}>
            <FormItem label="服务">
              {getFieldDecorator('status', {})(
                <Select style={{ width: '150px' }} placeholder="请选择" allowClear>
                  <Option value="0">全部服务</Option>
                  <Option value="1">体检</Option>
                  <Option value="2">咨询</Option>
                </Select>
              )}
            </FormItem>
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
              {getFieldDecorator('account', {
                initialValue: '',
              })(
                <Input
                  type="text"
                  placeholder="请填门店名称"
                  style={{
                    width: '150px',
                  }}
                  allowClear
                  autoComplete="off"
                />
              )}
            </FormItem>
            {/* <FormItem label="状态">
              {getFieldDecorator('status', {})(
                <Select style={{ width: '150px' }} placeholder="请选择" allowClear>
                  <Option value="0">全部服务</Option>
                  <Option value="1">体检</Option>
                  <Option value="2">咨询</Option>
                </Select>
              )}
            </FormItem> */}
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
            {/* <Button
              type="primary"
              style={{ marginTop: '3px', float: 'right' }}
              onClick={this.handleReset}
            >
              <Link to="/cooperatorManage/serviceManagement/addShop">新增</Link>
            </Button> */}
          </Form>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default goodsList;
