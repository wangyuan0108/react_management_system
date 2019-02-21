import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Table, Button, message, Modal, Divider } from 'antd';
import router from 'umi/router';
import styles from './style.less';
const confirm = Modal.confirm;

@connect(({ menumange }) => ({
  menuData: menumange.list.sysSerialPermTreeVoList,
  total: menumange.list.total,
}))
class RoleMange extends Component {
  state = {
    params: { pageNum: 1, pageSize: 10 },
    menuType: null,
  };

  componentDidMount() {
    this.getMenuData();
  }

  getMenuData = () => {
    const { dispatch } = this.props;
    const { params } = this.state;
    dispatch({
      type: 'menumange/getMenuList',
      payload: params,
    });
  };

  handleClickAddMenu = params => {
    console.log(params);
    const { serialId, id, menuType } = params;
    console.log(serialId, id, menuType);
    router.push({
      pathname: '/systemmange/menumange/addmenu',
      query: { serialId, menuId: id, menuType },
    });
  };

  handleClickChangePage = (pageNum, pageSize) => {
    this.setState({ params: { pageNum, pageSize } }, () => {
      this.getMenuData();
    });
  };

  handleClickEditMenu = params => {
    const { id } = params;
    router.push({
      pathname: '/systemmange/menumange/editmenu',
      query: { menuId: id },
    });
  };

  handleClickDel = params => {
    const { dispatch } = this.props;
    const { serialId, id } = params;
    dispatch({
      type: 'menumange/delMenu',
      payload: { serialId, menuId: id },
    }).then(() => {
      this.getMenuData();
    });
  };

  handleClickDelModal = params => {
    const me = this;
    confirm({
      title: '删除',
      content: '确定要删除吗？',
      cancelText: '否',
      okText: '是',
      onOk() {
        me.handleClickDel(params);
      },
      onCancel() {},
    });
  };
  onShowSizeChange = (current, pageSize) => {
    this.setState(
      {
        params: { pageNum: current, pageSize: pageSize },
      },
      () => {
        this.getMenuData();
      }
    );
  };
  showtotal = total => `共 ${total} 条数据`;
  render() {
    const { menuData, total } = this.props;
    const list = JSON.parse(sessionStorage.getItem('permsList'));

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        render: (text, record, index) => {
          return record.id ? record.id : record.serialId;
        },
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '类型',
        dataIndex: 'menuType',
        render: (text, record, index) => {
          if (record.menuType === '1') {
            return '菜单';
          } else if (record.menuType === '2') {
            return '目录';
          } else if (record.menuType === '3') {
            return '按钮';
          } else {
            return '子系统';
          }
        },
      },
      {
        title: '授权字段',
        dataIndex: 'perms',
        key: 'perms',
      },
      {
        title: '操作',
        dataIndex: '',
        render: (text, record, index) => {
          if (record.menuType === '1') {
            return (
              <span>
                {list.includes('sys:menu:add') ? (
                  <a
                    className={styles.mr10}
                    onClick={() => {
                      this.handleClickAddMenu(record);
                    }}
                  >
                    新增
                  </a>
                ) : null}

                {list.includes('sys:menu:update') ? (
                  <a
                    className={styles.mr10}
                    onClick={() => {
                      this.handleClickEditMenu(record);
                    }}
                  >
                    编辑
                  </a>
                ) : null}

                {list.includes('sys:menu:del') ? (
                  <a
                    className={styles.mr10}
                    onClick={() => {
                      this.handleClickDelModal(record);
                    }}
                  >
                    删除
                  </a>
                ) : null}
              </span>
            );
          } else if (record.menuType === '2') {
            return (
              <span>
                {list.includes('sys:menu:add') ? (
                  <a
                    className={styles.mr10}
                    onClick={() => {
                      this.handleClickAddMenu(record);
                    }}
                  >
                    新增
                  </a>
                ) : null}

                {list.includes('sys:menu:update') ? (
                  <a
                    className={styles.mr10}
                    onClick={() => {
                      this.handleClickEditMenu(record);
                    }}
                  >
                    编辑
                  </a>
                ) : null}

                {list.includes('sys:menu:del') ? (
                  <a
                    className={styles.mr10}
                    onClick={() => {
                      this.handleClickDelModal(record);
                    }}
                  >
                    删除
                  </a>
                ) : null}
              </span>
            );
          } else if (record.menuType === '3') {
            return (
              <span>
                {list.includes('sys:menu:update') ? (
                  <a
                    className={styles.mr10}
                    onClick={() => {
                      this.handleClickEditMenu(record);
                    }}
                  >
                    编辑
                  </a>
                ) : null}

                {list.includes('sys:menu:del') ? (
                  <a
                    className={styles.mr10}
                    onClick={() => {
                      this.handleClickDelModal(record);
                    }}
                  >
                    删除
                  </a>
                ) : null}
              </span>
            );
          } else {
            return (
              <span>
                {list.includes('sys:menu:add') ? (
                  <a
                    className={styles.mr10}
                    onClick={() => {
                      this.handleClickAddMenu(record);
                    }}
                  >
                    新增
                  </a>
                ) : null}
              </span>
            );
          }
        },
      },
    ];
    return (
      <div>
        <PageHeaderWrapper>
          <div style={{ background: '#fff', padding: 16 }}>
            <Table
              defaultExpandAllRows={true}
              dataSource={menuData}
              columns={columns}
              childrenColumnName="sysSerialPermissionsTreeVoList"
              rowKey={record => (record.id ? record.id : record.serialId)}
              pagination={{
                showQuickJumper: true,
                showSizeChanger: true,
                total,
                onChange: this.handleClickChangePage,
                onShowSizeChange: this.onShowSizeChange,
                showTotal: this.showtotal,
              }}
            />
          </div>
        </PageHeaderWrapper>
      </div>
    );
  }
}
export default RoleMange;
