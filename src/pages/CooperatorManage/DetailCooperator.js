import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Col, Table, Modal, Button } from 'antd'
import CooperatorBaseInfo from '@/components/Cooperator/CooperatorBaseInfo'
import router from 'umi/router';
export class DetailCooperator extends Component {
  toprintingDetail = () => {
    var domain = window.location.host;
    console.log(domain)
    // window.location.href='http://'+domain+'/oms/printingDetail'
    const w = window.open('about:blank');
    w.location.href ='http://'+domain+'/oms/printingDetail'
  }
  returnPrepage = () => {
    router.push(`/cooperatormanage/cooperator/cooperatormanage`);
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
      <PageHeaderWrapper title="合作商名称">
        <Card title="基本信息" bordered={false}>
          <CooperatorBaseInfo></CooperatorBaseInfo>
        </Card>
        <Card title="合作商服务门店信息" bordered={false} style={{ marginTop: 20 }}>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </Card>
        <Form style={{ marginTop: '20px' }}>
          <Form.Item>
            <Row>
              <Col span={10}>

              </Col>
              <Col span={2}>
                <Button type="primary" onClick={this.toprintingDetail}>
                  打印
              </Button>
              </Col>
              <Col span={2}>
              <Button onClick={this.returnPrepage}>
                  返回
              </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </PageHeaderWrapper>
    )
  }
}

export default DetailCooperator
