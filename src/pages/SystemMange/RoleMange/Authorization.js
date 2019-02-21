import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import {
  Form, Input, Button,Tree, message 
} from 'antd';


const { TextArea } = Input;
const { TreeNode } = Tree;

@connect(({role}) => ({
  roleData: role.roleData,
  editTreeData:role.editTreeData
}))

@Form.create()
class RoleMange extends Component {
  componentDidMount() {
    this.getRoleData();
  }
  getRoleData = () => {
    const { dispatch } = this.props;
    const {roleId} = this.props.location.query
    console.log("roleId",roleId)
    dispatch({
      type: 'role/getRoleInfo',
      payload:{
        roleId
      },
      getDefaultId:(id,serialId)=>{
        console.log("serialId",serialId)
        this.setState({
          ...this.state,
          serialId,
          checkedKeys:id
        },function(){
         
          console.log("state",this.state)
        })
      }
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({flag:true});
    let len  = this.state.checkedKeys.length;
    console.log(len)
    console.log(this.state.checkedKeys)
    if(len>0)this.setState({flag:false});

    this.props.form.validateFields((err, values) => {
      if (!err && len > 0 ) {
        const { dispatch } = this.props;
        const menuIds=Array.from(new Set([...this.state.parentKeys,...this.state.checkedKeys]))
       if(!this.state.changeFlage){
        message.error('请修改后保存');
          return
        }
        dispatch({
          type:'role/updateRoleInfo',
          payload:{
            roleId:this.props.location.query.roleId,
            ...values,
            serialId:this.state.serialId,
            menuIds:menuIds
          },
          success:()=>{
            this.goTORoleMange()
            message.success("保存成功")
          }
        })
      }
    });
  }
  goTORoleMange= ()=>{
    router.push(`/systemmange/rolemange/rolemange`)
  }

  /* 系统选择 */
  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }

  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    parentKeys:[],
    selectedKeys: [],
    serialId:'',
    flag:false,
  }
 
  //权限管理 选中某个
  onCheck = (checkedKeys,info) => {
    console.log("info",info)
    const parentKeys = info.halfCheckedKeys
    this.setState({ parentKeys,checkedKeys,flag:checkedKeys.length>0?false:true },function(){
      console.log("keys",this.state.parentKeys)
    });this.setState({
      changeFlage:true
    })

  }

  /* 渲染树形组件 */
  renderTreeNodes = data => data.map((item) => {
    if (item.prmissionInfos) {
      return (
        <TreeNode 
          title={item.menuName} 
          key={item.menuId} 
          dataRef={item}
          defaultSelectedKeys={true}
        >
          {this.renderTreeNodes(item.prmissionInfos)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.menuName} defaultSelectedKeys={true} key={item.menuId} {...item} />;
  })

  
  render() {
    
    const editData = this.props.editTreeData.result
    const ruleData = editData && editData.roleInfo

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
                    <Input  style={{border:"none",background:"none",color:"#000"}}  disabled value={ruleData && ruleData.roleName}/>
                </Form.Item>
                <Form.Item 
                  label="角色简介"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 8 }}
                >
                    <TextArea 
                        style={{border:"none",background:"none",color:"#000",marginTop:"5px"}}  
                        disabled value={ruleData&&ruleData.roleSummary}
                        autosize={{ minRows: 3, maxRows: 20 }}
                     />
                </Form.Item>
                <Form.Item
                  label="系统名称"
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 8 }}
                >
                   <Input 
                      style={{border:"none",background:"none",color:"#000",marginTop:"5px"}} 
                      disabled value={ruleData && ruleData.serialName}
                    />
                </Form.Item>
                <Form.Item
                   label="权限管理"
                   labelCol={{ span: 3 }}
                   wrapperCol={{ span: 8 }}
                >
                  <Tree
                    checkable
                    checkedKeys={this.state.checkedKeys}
                    onCheck={this.onCheck}
                    onSelect={this.onSelect}
                    >
                      {this.renderTreeNodes((editData && editData.prmissionInfos)||[])}
                  </Tree>
                   
                   {
                   this.state.flag ? <div style={{color:"red",marginLeft:"10px"}}>请选择权限</div>:null
                   }
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                  <Button onClick={this.goTORoleMange} style={{marginRight:"100px"}}>取消</Button>
                  <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item> 
            </Form>
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default RoleMange;
