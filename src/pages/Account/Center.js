import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Form, Col, Row } from 'antd';
import styles from './Center.less'

@Form.create()
@connect()
class AcountMange extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.getUserInfo()
  }

  getUserInfo = () => {
    const {
      dispatch,
    } = this.props;
    
    dispatch({
      type: 'user/fetchCurrent',
    });
  };

  render() {
    const {
      userInfo,
    } = this.props;
    const status=userInfo.status==='1'?'启用':'停用';
    return (
      <PageHeaderWrapper>
        <Card title="基本信息" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label='用户名'>
                  {userInfo ? userInfo.account : ''}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label='手机号'>
                  {userInfo ? userInfo.mobile : ''}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label='邮箱'>
                  {userInfo ? userInfo.email : ''}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label='真实姓名'>
                  {userInfo ? userInfo.fullName : ''}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label='ID'>
                  {userInfo ? userInfo.id : ''}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label='状态'>
                  {status}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default connect(({ user }) => ({
  userInfo: user.currentUser,

}))(AcountMange);
