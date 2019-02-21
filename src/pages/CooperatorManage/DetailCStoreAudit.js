import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Col, Modal, Button,Input } from 'antd'
import router from 'umi/router';
import CooperatorBaseInfo from '@/components/Cooperator/CooperatorBaseInfo'
import CoperatorStoreBaseInfo from '@/components/Cooperator/CoperatorStoreBaseInfo'
export class DetailCStoreAudit extends Component {
  state = { visible: false }
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
    const { TextArea } = Input;
    return (
      <PageHeaderWrapper >
        <Card  bordered={false}  >
        <p>审核结果：不通过</p>
        <p>原因：门店信息不全</p> 
        </Card>
        <Card title="合作商服务门店信息" bordered={false} style={{ marginTop: 20 }}>
        <CooperatorBaseInfo />
        </Card>
       
        <Card title="门店基本信息" bordered={false} style={{ marginTop: 20 }}>
        <CoperatorStoreBaseInfo></CoperatorStoreBaseInfo>
        </Card>
        <Form style={{ marginTop: '20px' }} >
          <Form.Item>
            <Row>
              <Col span={10}>

              </Col>
              <Col span={2}>
                <Button type="primary" >
                  通过
              </Button>
              </Col>
              <Col span={2}>
              <Button type="danger"  onClick={this.showModal}>
                  不通过
              </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Modal
          title="请输入拒绝理由"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <TextArea rows={4} />
        </Modal>
      </PageHeaderWrapper>
    )
  }
}

export default DetailCStoreAudit
