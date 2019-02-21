import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card } from 'antd';
@connect()
class OperationLogMange extends Component {
  render() {
    return (
      <div>
        <PageHeaderWrapper>
          <Card bordered={false}>操作日志</Card>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default OperationLogMange;
