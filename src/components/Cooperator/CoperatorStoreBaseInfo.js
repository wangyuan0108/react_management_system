import React, { Component } from 'react';
import { Card, Form, Row, Col} from 'antd'
export class CoperatorStoreBaseInfo extends Component {
  render() {
    return (
        <Form>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='名称'
                >
                  名称
              </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='网址'
                >
                  网址
              </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='经度'
                >
                  经度
              </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='纬度'
                >
                  纬度纬度纬度纬度纬度纬度纬度
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='区域编号'
                >
                  区域编号区域编号
              </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='地址'
                >
                  地址地址地址地址地址地址
              </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='联系人'
                >
                  联系人
              </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='联系电话'
                >
                  联系电话联系电话联系电话联系电话
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='公交路线'
                >
                  公交路线公交路线
              </Form.Item>
              </Col>
               <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='第三方ID'
                >
                  第三方ID
              </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={24}>
              <Form.Item
                  label='证明材料'
                >
                  <img src={require('./service-worker.jpeg')} style={{ width: 200, marginRight: 20 }} />
                 </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='简介'
                >
                <div  style={{lineHeight:2}}>
                简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
                  
                </div>
                 </Form.Item>
              </Col>
            </Row>
            
          </Form>
    )
  }
}

export default CoperatorStoreBaseInfo
