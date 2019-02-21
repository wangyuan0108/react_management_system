import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {Form,Table, Button, Modal, Select, Input, message} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ subsystem }) => ({
  subRoleData: subsystem.subRoleData,
  total:subsystem.subRoleData.total
}))

@Form.create()
class RoleMange extends Component {
  constructor(props){
    super(props);
    this.state = {
      serialId:[],
      visible: false,
      pageSize:10
    }
  }
  componentDidMount() {
    const  payload = this.initData();
    this.getSubRoleData(payload);
  }
  initData = ()=>{
    return {
      "pageNum": 1,
      "pageSize": this.state.pageSize,
      "serialName": "",
      "serialNum": "",
      "status": ""
    }
  }
  getSubRoleData = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'subsystem/getSubRoleData',
      payload:{...payload}
    });
  };

  handleAddSystem=()=>{
    router.push("/systemmange/subsystem/addSystem")
  }
  //跳转到编辑页
  handleEditSystem=()=>{
    const len =  this.state.serialId.length;
    switch(len){
      case 0 : message.error("请选择一个ID");
        break;
      case 1 : router.push(`/systemmange/subsystem/editSystem?serialId=${this.state.serialId}`);
        break;
      default: message.error("最多选择一个ID");
        break;
    }
  }
  handleJumpPage = (pageNum,pageSize)=>{
    const {dispatch} = this.props;
    dispatch({
      type:"subsystem/getSubRoleData",
      payload:{ pageNum,pageSize }
    })
  }
  //查询列表
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("this.props.treeData",this.props.treeData)
    this.props.form.validateFields((err, values) => {
      console.log("values",values)
      if (!err) {
        const  payload = {
          "pageNum": 1,
          "pageSize": this.state.pageSize,
          "serialName": values.name||'',
          "serialNum": values.num||'',
          "status": values.state||''
        }
        this.getSubRoleData(payload);
          console.log("payload",payload)
      }
   });
  }
  handleReset = () => {
    this.props.form.resetFields();
    const  payload = this.initData();
    this.getSubRoleData(payload);
  }

   confirm = (state,name) => {
    const len =  this.state.serialId.length;
    if(len===0)return message.error("请选择一个ID");
    Modal.confirm({
      title: `${name}`,
      content: `确认${name}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        this.handleChangeStatus(state)
      }
    });
  }
  //上下线
  handleChangeStatus=(state)=>{
    const payload = {
      flag:state,
      id:this.state.serialId.join("")
    }
    const {dispatch} = this.props;
    dispatch({
      type:'subsystem/onOffSerial',
      payload,
      cb:()=>{
        const payload = this.initData()
        message.success("操作成功");
        this.getSubRoleData(payload);
      }
    })
  }
    
  showtotal = total => `共 ${total} 条数据`;
  onShowSizeChange = (current, pageSize)=>{
      this.setState({
        ...this.state,
        pageSize
      },function(){
        const payload = this.initData();
        this.getSubRoleData(payload)
      })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const subRoleData = this.props.subRoleData.result;
    //ID  用户名  手机号   所属角色  所属机构  注册时间  状态
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
    
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title:"编号",
        dataIndex:'num'
      },
      {
        title:'创建时间',
        dataIndex:'gmtCreate'
      },
      {
        title:'修改时间',
        dataIndex:'gmtModified'
      },
      {
        title:'状态',
        dataIndex:'status',
        render:state=>state == 0 ? "下线" : "上线"
      }    
    ];
    //ID  用户名  手机号   所属角色  所属机构  注册时间  状态
    const rowSelection = {
      type:"radio",
      onChange: (selectedRowKeys, selectedRows) => {
        console.log("selectedRowKeys",selectedRows[0].status)
        this.setState({
          ...this.state,
          serialId:selectedRowKeys,
        })
      },     
    };
    const permsList =sessionStorage.getItem('permsList');
    return (
      <div>
        <PageHeaderWrapper>
          <div style={{ background: '#fff', padding: 16 }}>
            {
              permsList.indexOf('sys:subsys:add')>0?
              <Button 
              type="primary" 
              style={{width:100,marginBottom: 16, marginRight: 16 }}
              onClick={this.handleAddSystem}
            >
              新增
            </Button>
              :''
            }
            {
              permsList.indexOf('sys:subsys:update')>0?
              <Button 
              type="primary"
              style={{width:100,marginBottom: 16, marginRight: 16 }}
              onClick={this.handleEditSystem}
            > 编辑</Button>
              :''
            }
           {
              permsList.indexOf('sys:subsys:online')>0?
              <Button
              type="primary" 
              style={{width:100,marginBottom: 16,marginRight: 16}}
             //  onClick={()=>this.handleChangeStatus("1")}
             onClick={()=>this.confirm("1","上线")}
             >上线</Button>
              :''
            }
           {
              permsList.indexOf('sys:subsys:downline')>0?
              <Button 
              type="danger" 
              style={{width:100,marginBottom: 16, }}
              // onClick={()=>this.handleChangeStatus("0")}
              onClick={()=>this.confirm("0","下线")}
            >下线</Button>
              :''
            } 
          <Form layout="inline" onSubmit={this.handleSubmit} style={{marginBottom: '10px'}}>
              <FormItem label="子系统名称">
                {getFieldDecorator('name')(
                    <Input type="text" placeholder="名称" style={{width: '200px'}}/>
                  )}
              </FormItem>
              <FormItem label="子系统编号">
                {getFieldDecorator('num')(
                    <Input type="text" placeholder="编号" style={{width: '200px'}}/>
                )}
              </FormItem>
              <FormItem label="状态">
                {getFieldDecorator('state')(
                    <Select style={{width: '200px'}}>
                    <Option value="1">上线</Option>
                    <Option value="0">下线</Option>
                  </Select>
                )}
              </FormItem>
              <Button type="primary" htmlType="submit" style={{marginTop:'3px', marginRight: '3px'}}>查询</Button>
              <Button style={{marginTop: '3px'}} onClick={this.handleReset}>重置</Button>
            </Form>
            <Table
             
              rowSelection={rowSelection}
              dataSource={subRoleData && subRoleData.serialVoList}
              columns={columns}
              pagination={{
                 showQuickJumper: true, 
                 showSizeChanger: true,
                 total:subRoleData && subRoleData.total, 
                 showTotal:this.showtotal,
                 showSizeChanger: true,
                 defaultPageSize:10,
                 onChange:this.handleJumpPage,
                 onShowSizeChange:this.onShowSizeChange,
                 pageSizeOptions:["10","20","30","40"]
              }}
              rowKey="id"
            />
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default RoleMange;
