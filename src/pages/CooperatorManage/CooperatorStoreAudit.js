import React, { Component } from 'react';
import { Input, DatePicker, Form, Button, Table, Divider, Select } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
const Option = Select.Option;
const { RangePicker } = DatePicker;
@connect()
class CooperatorStoreAudit extends Component {
  toDetial=(type)=>{
    router.push({
      pathname:`/cooperatorManage/cooperstoreaudit/detailcstoreaudit`,
      query:{type}
    });
  }
  render() {
    const columns = [{
      title: '合作商',
      dataIndex: 'name'
    }, {
      title: '门店',
      dataIndex: 'Mname'
    }
      , {
      title: '服务类型',
      dataIndex: 'type'
    }
      , {
      title: '申请日期',
      dataIndex: 'time'
    }, {
      title: '状态',
      render: (text, record, index) => {
        if (record.state == 0) {
          return (
            <span>通过</span>
          )
        } else if (record.state == 1) {
          return (
            <span>不通过</span>
          )
        }else{
          return (
            <span>待审核</span>
          )
        }

      }
    }, {
      title: '操作',
      render: (text, record, index) => {
        if (record.state == 2) {
          return (
            <span>
              <a onClick={()=>{
                this.toDetial('审核')
              }}>
                审核
              </a>
            </span>
          )
         } else{
          return (
            <span>
              <a onClick={()=>{
                this.toDetial('查看')
              }}>
                查看
              </a>
            </span>
          )
        }
        

      }
    }]
    const dataSource = [{
      name: '合作商名称',
      Mname: '门店名称',
      type: '咨询',
      time: '2018-11-11',
      state: '0'
    },
    {
      name: '合作商名称',
      Mname: '门店名称',
      type: '咨询',
      time: '2018-11-11',
      state: '1'
    },
    {
      name: '合作商名称',
      Mname: '门店名称',
      type: '咨询',
      time: '2018-11-11',
      state: '2'
    },]
    return (
      <div>
        <PageHeaderWrapper>
          <div style={{ background: '#fff', padding: 16 }}>
            <Form layout='inline'>
              <Form.Item>
                <Select defaultValue="1" style={{ width: '120px' }}>
                  <Option value='1'    >全部</Option>
                  <Option value='2'>待审核</Option>
                  <Option value='3'>审核通过</Option>
                  <Option value='4'>审核未通过</Option>
                </Select>

              </Form.Item>
              <Form.Item
                label='合作商名称'
              >
                <Input
                  placeholder='请输入合作商名称'
                />
              </Form.Item>
              <Form.Item
                label='门店名称'
              >
                <Input
                  placeholder='请输入门店名称'
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary"> 查询</Button>
              </Form.Item>
              <Form.Item>
                <Button> 重置</Button>
              </Form.Item>
            </Form>
            <Table
              columns={columns}
              dataSource={dataSource}
              style={{ marginTop: 20 }}
            />
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default CooperatorStoreAudit;
