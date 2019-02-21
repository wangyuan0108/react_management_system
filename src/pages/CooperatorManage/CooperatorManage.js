import React, { Component } from 'react';
import { Input, DatePicker, Form, Button, Table, Divider } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './style.less'
const { RangePicker } = DatePicker;
@connect()
class CooperatorManage extends Component {
  addCooperator = () => {
    router.push(`/cooperatormanage/cooperator/add`);
  }
  checkDetail = (record) => {
    console.log(222)
    console.log(record);
    router.push({
      pathname:`/cooperatormanage/cooperator/read`,
      query:{name:record.name}
    });
  }
  accountManage = (record) => {
    console.log(222)
    console.log(record);
    router.push({
      pathname:`/cooperatormanage/cooperator/acountmanage`,
      query:{name:record.name}
    });
  }
  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'name'
    }, {
      title: '联系人',
      dataIndex: 'Mname'
    }
      , {
      title: '联系电话',
      dataIndex: 'type'
    }
      , {
      title: '创建时间',
      dataIndex: 'time'
    }, {
      title: '操作',
      render: (text, record, index) => {
        return (
          <span>
            <a onClick={() => { this.checkDetail(record) }}>
              查看
            </a>
            <Divider type="vertical" />
            <a onClick={() => { this.accountManage(record) }}>
              账号管理
            </a>
            <Divider type="vertical" />
            <a style={{color:'red'}}>
              删除
            </a>
          </span>
        )
      }
    }]
    const dataSource = [{
      name: '合作商名称',
      Mname: '联系人',
      type: '联系电话',
      time: '2018-11-11',
      state: '审核通过'
    }]
    return (
      <div>
        <PageHeaderWrapper>
          <div style={{ background: '#fff', padding: 16 }}>
            <Form layout='inline'>
              <Form.Item>
                <Input
                  placeholder='请输入合作商名称'
                />
              </Form.Item>
              <Form.Item
                label="创建时间"
              >
                <RangePicker />
              </Form.Item>
              <Form.Item>
                <Button type="primary"> 查询</Button>
              </Form.Item>
              <Form.Item>
                <Button> 重置</Button>
              </Form.Item>
            </Form>
            <div style={{ marginBottom: 16 }}>
              <Button
                style={{ marginTop: 16, marginRight: 16 }}
                type="primary"
                onClick={this.addCooperator}
              >
                新增
            </Button>
            </div>
            <Table
              columns={columns}
              dataSource={dataSource}
            />
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default CooperatorManage;
