import React, { Component } from 'react';
import { Form, Select, Steps, Button, message, Checkbox, Row, Col } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import style from './style.less';
import CooperatorTable from '@/components/Cooperator/CooperatorTable';
import StoreTable from '@/components/Cooperator/StoreTable';


const Step = Steps.Step;
const steps = [{
  title: '请选择一个合作商',
  content: 'First-content',
}, {
  title: '请选择要添加的服务',
  content: 'Second-content',
}, {
  title: '请选择该服务下的门店',
  content: 'Last-content',
}];
@connect()
class AddCooperatorStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <PageHeaderWrapper>
          <div style={{ background: '#fff', padding: 16 }}>
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className="steps-content">
              {current === 0 ?
                <CooperatorTable></CooperatorTable> : current === 1 ?
                  <div style={{ textAlign: 'center' }}>
                    <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                      <Row>
                        <Col span={24}><Checkbox value="A">体检服务</Checkbox></Col>
                        <Col span={24}><Checkbox value="B">咨询服务</Checkbox></Col>
                        <Col span={24}><Checkbox value="C">通用服务</Checkbox></Col>
                        <Col span={24}><Checkbox value="D">挂号服务</Checkbox></Col>
                      </Row>
                    </Checkbox.Group>
                  </div> :
                  <StoreTable></StoreTable>
              }
            </div>
            <div className="steps-action">
              {
                current < steps.length - 1
                && <Button type="primary" onClick={() => this.next()}>下一步</Button>
              }
              {
                current === steps.length - 1
                && <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
              }
              {
                current > 0
                && (
                  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    上一步
                                 </Button>
                )
              }
            </div>
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default AddCooperatorStore;
