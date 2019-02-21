import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
    Form, Input, Button,message
  } from 'antd';
  
@connect(({role}) => ({
  roleData: role.roleData,
  treeData:role.treeData
}))

@Form.create()
class RoleMange extends Component {
    componentDidMount() {
       
    }
    //保存
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log("values",values)
        if (!err) {
          const {dispatch} = this.props;
          dispatch({
            type:"subsystem/addSerialInfo",
            payload:values,
            cb:()=>{
              message.success('添加成功')
              this.goToSubsystem();
            }
          })
          console.log('Received values of form: ', values);
        }
      });  
    }
    //跳转子系统页面
    goToSubsystem = ()=>{
      router.push("/systemmange/subsystem/subsystem")
    }
    
    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
                {this.renderTreeNodes(item.children)}
            </TreeNode>
            );
        }
        return <TreeNode {...item} />;
    })
  render() {
    const { getFieldDecorator } = this.props.form;
    //ID  用户名  手机号   所属角色  所属机构  注册时间  状态
    return (
      <div>
        <PageHeaderWrapper>
        <div style={{ background: '#fff', padding: 16 }}>
        <Form onSubmit={this.handleSubmit}>
                <Form.Item
                  label="名称"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入名称' }],
                  })(
                    <Input placeholder="请输入名称"/>
                  )}
                </Form.Item>
                <Form.Item
                  label="子系统编号"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('num', {
                    rules: [{ required: true, message: '请输入子系统编号'}],
                  })(
                    <Input  placeholder="请输入子系统编号"/>
                  )}
                </Form.Item>
              
                <Form.Item
                  wrapperCol={{ span: 12, offset: 5 }}
                >
                  <Button onClick={this.goToSubsystem} style={{marginRight:"100px"}}>
                      取消
                  </Button>
                  <Button type="primary" htmlType="submit">
                      保存
                  </Button>
                </Form.Item>
            </Form>
        </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default RoleMange;
