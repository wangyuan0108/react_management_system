import React, { Component } from 'react';
import { Input, DatePicker, Form, Button, Table, Divider } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const { RangePicker } = DatePicker;
@connect()
class StoreTable extends Component {
 
 
  render() {
    const columns = [{
      title: '门店名称',
      dataIndex: 'name'
    }, {
      title: '所在区域',
      dataIndex: 'Mname'
    }
      , {
      title: '联系电话',
      dataIndex: 'type'
    }
    ]
    const dataSource = [{
      name: '合作商名称',
      Mname: '联系人',
      type: '联系电话',
      time: '2018-11-11',
      state: '审核通过'
    },{
        name: '合作商名称',
        Mname: '联系人',
        type: '联系电话',
        time: '2018-11-11',
        state: '审核通过'
      },{
        name: '合作商名称',
        Mname: '联系人',
        type: '联系电话',
        time: '2018-11-11',
        state: '审核通过'
      }]
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
      <div>
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
           
            <Table
              columns={columns}
              dataSource={dataSource}
              rowSelection={rowSelection}
            />
          </div>
      </div>
    );
  }
}
export default StoreTable;
