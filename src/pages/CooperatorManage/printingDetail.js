import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Col, Table, Modal, Button } from 'antd'
import CooperatorBaseInfo from '@/components/Cooperator/CooperatorBaseInfo'
import router from 'umi/router';
export class DetailCooperator extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
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
      title: '门店地址',
      dataIndex: 'type'
    }
      , {
      title: '电话',
      dataIndex: 'time'
    }, {
      title: '已开通服务',
      dataIndex: 'list'
    }]
    const dataSource = [{
      name: '合作商名称',
      Mname: '联系人',
      type: '联系电话',
      time: '2018-11-11',
      state: '审核通过',
      list: '咨询   挂号'
    }, {
      name: '合作商名称',
      Mname: '联系人',
      type: '联系电话',
      time: '2018-11-11',
      state: '审核通过',
      list: '咨询   挂号'
    },
    {
      name: '合作商名称',
      Mname: '联系人',
      type: '联系电话',
      time: '2018-11-11',
      state: '审核通过',
      list: '咨询   挂号'
    },
    {
      name: '合作商名称',
      Mname: '联系人',
      type: '联系电话',
      time: '2018-11-11',
      state: '审核通过',
      list: '咨询   挂号'
    },]
    return (
      <PageHeaderWrapper >
        <Card title="基本信息" bordered={false}>
        <CooperatorBaseInfo></CooperatorBaseInfo>
        </Card>
        <Card title="合作商服务门店信息" bordered={false} style={{ marginTop: 20 }}>
          <Table
            columns={columns}
            dataSource={dataSource}
          />
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default DetailCooperator
