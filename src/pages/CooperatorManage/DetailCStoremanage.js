import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Row, Col, Modal, Button,Input } from 'antd'
import router from 'umi/router';
import EditStoreBaseInfo from '@/components/Cooperator/EditStoreBaseInfo'
import CoperatorStoreBaseInfo from '@/components/Cooperator/CoperatorStoreBaseInfo'
export class DetailCStoreAudit extends Component {
    state={
        changeState:true
    }
  returnPrepage = () => {
    this.state.changeState?
    router.push(`/cooperatorManage/cooperstoremanage/cooperstoremanage`):
    this.setState({
        changeState:true
      })
  }
  changeState=()=>{
      this.setState({
        changeState:false
      })
  }
  render() {
    const { TextArea } = Input;
    return (
      <PageHeaderWrapper > 
        <Card title="门店基本信息" bordered={false} style={{ marginTop: 20 }}>
        {this.state.changeState?
            <CoperatorStoreBaseInfo></CoperatorStoreBaseInfo>:
            <EditStoreBaseInfo></EditStoreBaseInfo>
        }
        
       
        </Card>
        <Form style={{ marginTop: '20px' }} >
          <Form.Item>
            <Row>
              <Col span={10}>

              </Col>
              <Col span={2}>
                <Button onClick={this.returnPrepage} >
                  取消
              </Button>
              </Col>
              <Col span={2}>
              {this.state.changeState?<Button  type="primary" onClick={this.changeState}>
                  更新门店信息
              </Button>:  <Button  type="primary">
                  确定
              </Button>}
              
             
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </PageHeaderWrapper>
    )
  }
}

export default DetailCStoreAudit
