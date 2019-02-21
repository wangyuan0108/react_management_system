import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import router from 'umi/router';
import Link from 'umi/link';
import {
  Form, Select, Input, Button,Tree,message
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const { TreeNode } = Tree;




@connect(({role}) => ({
  treeData:role.treeData,
  systemInfo:role.systemInfo
}))

@Form.create()
class RoleMange extends Component {
  componentDidMount() {
    this.getSerialInfoList();
    this.cleanTreeData()
  }
  getRoleDataInfo = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/getPermissionInfo',
      payload:value
    });
  };
  getSerialInfoList = ()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'role/getSerialInfoList',
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
   
    this.setState({flag:true});
    let len  = this.state.checkedKeys.length
    
    if(len>0)this.setState({flag:false})
    this.props.form.validateFields((err, values) => {
      values.menuIds = Array.from(new Set([...this.state.checkedKeys,...this.state.parentKeys]))
      console.log("values",values)
      console.log(!err && len > 0)
      if (!err && len > 0) {
        const {dispatch } = this.props;
        dispatch({
          type: 'role/addRoldInfo',
          payload:values,
          cb:() => {
            message.success("添加成功");
            this.goTORoleMange();
          }
        });
      
      }
   });
  }
  cleanTreeData = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'role/cleanTreeData',
      payload:[]
    });
  }
  goTORoleMange= ()=>{
    this.cleanTreeData()
    router.push(`/systemmange/rolemange/rolemange`)
  }

  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    parentKeys:[],
    selectedKeys: [],
    flag:false,
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys,info) => {
    const parentKeys = info.halfCheckedKeys

    this.setState({parentKeys,checkedKeys,flag:checkedKeys.length>0?false:true },function(){
      
    });
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }




  handleChange = (value)=>{
    this.getRoleDataInfo(value);
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.sysSerialPermissionsTreeVoList) {
      return (
        <TreeNode
           title = {item.name}
           dataRef = {item}
           key = {item.id}
          >
          {this.renderTreeNodes(item.sysSerialPermissionsTreeVoList)}
        </TreeNode>
      );
    }
    return <TreeNode  key = {item.id} title = {item.name} {...item} />;
  })
  //文本域输入长度验证
  validateToTextArea = (rule, value, callback) =>{
    if(value&&value.length>100){
      callback("内容长度不能超过100");
    }
    callback(); 
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <PageHeaderWrapper>
          <div style={{ background: '#fff', padding: 16 }}>
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                  label="角色名称"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('roleName', {
                    rules: [{ required: true, message: '请输入角色名称' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item 
                 label="角色简介"
                 labelCol={{ span: 3 }}
                 wrapperCol={{ span: 8 }}
                >
                     {getFieldDecorator('roleSummary', {
                          rules: [
                            { required: true, message: '请输入角色简介' },
                            { validator: this.validateToTextArea,}
                          
                          ], 
                        },
                        )(
                          <div>
                              <TextArea autosize={{ minRows: 8, maxRows: 6 }} />
                                {/* <div style={{position:"absolute",right:0,button:0}}> 0/100</div> */}
                          </div> 
                      )}
                </Form.Item>
                <Form.Item
                  label="系统选择"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 8 }}
                >
                  {getFieldDecorator('serialId', {
                    rules: [{ required: true, message: '请选择系统!' }],
                  })(
                    <Select  
                      placeholder="请选择系统"
                      onChange={this.handleChange}
                    >
                      {
                        this.props.systemInfo.map( item => (
                          <Option 
                            value = {item.id} 
                            key = {item.id}>
                              {item.name}
                          </Option>
                        ))
                      }
                    </Select>
                  )}
                </Form.Item>
                <Form.Item
                   label="权限管理"
                   labelCol={{ span: 3 }}
                   wrapperCol={{ span: 8 }}   
                >
                    <Tree
                      checkable
                      onExpand={this.onExpand}
                      expandedKeys={this.state.expandedKeys}
                      autoExpandParent={this.state.autoExpandParent}
                      onCheck={this.onCheck}
                      checkedKeys={this.state.checkedKeys}
                      onSelect={this.onSelect} 
                      selectedKeys={this.state.selectedKeys}
                      // checkStrictly = {true}
                    >  
                        {this.renderTreeNodes(this.props.treeData)}
                    </Tree>
                  
                 {
                   this.state.flag ? <div style={{color:"red"}}>请选择权限</div>:null
                  // this.state.flag&& this.state.checkedKeys.length==0?null:<div style={{color:"red"}}>请选择内容</div>
                 }
                </Form.Item>
                <Form.Item
                  wrapperCol={{ span: 12, offset: 5 }}
                >
                  <Button onClick={this.goTORoleMange} style={{marginRight:"100px"}}>
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
