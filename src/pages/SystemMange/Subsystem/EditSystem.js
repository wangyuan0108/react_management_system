import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import {
    Form, Input, Button, message
  } from 'antd';
  

@connect(({subsystem}) => ({
  ediSerialInfot:subsystem.ediSerialInfot
}))

@Form.create()
class RoleMange extends Component {
    componentDidMount() {
        this.getRoleData();
       
       
    }
    getRoleData = () => {
      const { dispatch } = this.props;
      const {serialId} = this.props.location.query
      
      //获取子系统详细信息
      dispatch({
        type: 'subsystem/getSerialInfo',
        payload:{serialId},
        cb:(payload)=>{
          this.props.form.setFieldsValue({
            name:payload.name,
            num:payload.num 
          }); 
          console.log("payloadpayloadpayload",payload)
        }
      });
    };
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, {name,num}) => {
        if (!err) {
          const { dispatch } = this.props;
          const { serialId } = this.props.location.query;
          //跟新子系统信息
          dispatch({
            type:'subsystem/updateSerialInfo',
            payload:{id:serialId, name,num},
            cb:()=>{
              this.goToSubsystem();
              message.success("操作成功")
            }
          })
        }
      });
    }
     //跳转子系统页面
     goToSubsystem = ()=>{
      router.push("/systemmange/subsystem/subsystem")
    }
    
 
  render() {
   
    const { getFieldDecorator } = this.props.form;
   
    //ID  用户名  手机号   所属角色  所属机构  注册时间  状态
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };
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
                  {getFieldDecorator('name')(
                    <Input/>
                  )}
                </Form.Item>
                <Form.Item
                  label="子系统编号"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('num')(
                    <Input />
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
