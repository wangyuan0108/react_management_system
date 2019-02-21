import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
@connect()
class Home extends Component {
  render() {
    return (
      <div>
          <PageHeaderWrapper>
          <Card bordered={false}>
          <h1 style={{width:'100%',marginTop:'250px',textAlign:'center'}}>欢迎使用管理后台</h1>
         <p style={{width:'100%',marginBottom:'250px',textAlign:'center'}}>请点击左侧菜单进行相关操作</p>
          </Card>
          </PageHeaderWrapper>
      </div>
    );
  }
}
export default Home;
