import React, { Component } from 'react';
import { Card, Form, Tabs } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BaseView from './BaseView'
import SecurityView from './SecurityView'


const TabPane = Tabs.TabPane;

@Form.create()
class AcountMange extends Component {
  render() {
    return (
      <PageHeaderWrapper>
        <Card>
          <Tabs
            tabPosition='left'
            size='large'
            tabBarStyle={{ textAlign: 'left', width: 200 }}
          >
            <TabPane tab="基本设置" key="1">
              <h2 style={{ marginBottom: 12 }}>基本设置</h2>
              <BaseView />
            </TabPane>
            <TabPane tab="安全设置" key="2">
              <h2 style={{ marginBottom: 0 }}>安全设置</h2>
              <SecurityView />
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default AcountMange;
