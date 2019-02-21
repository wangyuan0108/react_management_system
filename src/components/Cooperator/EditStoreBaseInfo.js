import React, { Component } from 'react';
import { Card, Form, Row, Col, Input } from 'antd'
@Form.create()
export class EditStoreBaseInfo extends Component {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form>
        <Row gutter={16}>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label='名称'
            >
              {getFieldDecorator('name')(
                <Input />
              )}
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label='网址'
            >
              {getFieldDecorator('wz')(
                <Input />
              )}
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label='经度'
            >
              {getFieldDecorator('jd')(
                <Input />
              )}
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label='纬度'
            >
              {getFieldDecorator('wd')(
                <Input />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label='区域编号'
            >
              {getFieldDecorator('qybh')(
                <Input />
              )}
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label='地址'
            >
              {getFieldDecorator('dz')(
                <Input />
              )}
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label='联系人'
            >
              {getFieldDecorator('lxr')(
                <Input />
              )}
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label='联系电话'
            >
              {getFieldDecorator('lxdh')(
                <Input />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label='公交路线'
            >
              {getFieldDecorator('gjlx')(
                <Input />
              )}
            </Form.Item>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label='第三方ID'
            >
              {getFieldDecorator('dsfid')(
                <Input />
              )}
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
              {getFieldDecorator('jj')(
                <Input />
              )}
            </Form.Item>
          </Col>
        </Row>

      </Form>
    )
  }
}

export default EditStoreBaseInfo
