import React, { Component } from 'react';
import { Card, Form, Row, Col} from 'antd'
export class CooperatorBaseInfo extends Component {
  render() {
    return (
        <Form>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='合作商名称'
                >
                  合作商名称
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
                  13361617824
              </Form.Item>
              </Col>
              <Col lg={6} md={12} sm={24}>
                <Form.Item
                  label='地址'
                >
                  地址地址地址地址地址地址地址地址地址
              </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label='身份证'
                >
                  <img src={require('./service-worker.jpeg')} style={{ width: 200, marginRight: 20 }} />
                  <img src={require('./service-worker.jpeg')} style={{ width: 200 }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label='营业执照'
                >
                  <img src={require('./service-worker.jpeg')} style={{ width: 200 }} />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={24}>
                <Form.Item
                  label='执业许可证'
                >
                  <img src={require('./service-worker.jpeg')} style={{ width: 200 }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
    )
  }
}

export default CooperatorBaseInfo
