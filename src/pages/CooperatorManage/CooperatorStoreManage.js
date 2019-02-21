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
      pathname:`/cooperatorManage/cooperstoremanage/detailcstoremanage`,
      query:{type}
    });
  }
  toAdd=()=>{
    router.push({
      pathname:`/cooperatorManage/cooperstoremanage/addcooperstore`
    });
  }
  render() {
    const columns = [{
      title: '门店名称',
      dataIndex: 'name'
    }, {
      title: '门店编号',
      dataIndex: 'Mname'
    }
      , {
      title: '合作商名称',
      dataIndex: 'type'
    }
      , {
      title: '服务名称',
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
       return(
         <span>
           <a onClick={()=>{
             this.toDetial(record.name) 
           }}>查看</a>
           <a style={{margin:'0 10px'}}>停用</a>
           <a>删除</a>
         </span>
       )
      }
    }]
    const dataSource = [{
      name: '门店名称',
      Mname: '门店编号',
      type: '合作商名称',
      time: '服务名称',
      state: '0'
    },
    {
      name: '门店名称',
      Mname: '门店编号',
      type: '合作商名称',
      time: '服务名称',
      state: '1'
    },
    {
      name: '门店名称',
      Mname: '门店编号',
      type: '合作商名称',
      time: '服务名称',
      state: '2'
    },]
    return (
      <div>
        <PageHeaderWrapper>
          <div style={{ background: '#fff', padding: 16 }}>
            <Form layout='inline'>
              <Form.Item
                label='合作商名称'
              >
                <Input
                  placeholder='请输入合作商名称'
                />
              </Form.Item>
              <Form.Item
                label='服务名称'
              >
                <Input
                  placeholder='请输入服务商名称'
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
              <Form.Item style={{float:"right"}}>  
                <Button type="primary" onClick={this.toAdd}> 新增</Button>
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
