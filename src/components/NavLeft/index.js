import React, { Component } from 'react';
import MenuConfig from '../../config/menuConfig';
import { Menu, Icon } from 'antd';
import './index.less';
import { NavLink } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
class NavLeft extends Component {
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        });
    }
    // 菜单渲染
    renderMenu = data => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return (
                <Item title={item.title} key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Item>
            );
        });
    };
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>报名学员管理系统</h1>
                </div>
                <Menu theme="dark">{this.state.menuTreeNode}</Menu>
            </div>
        );
    }
}

export default NavLeft;
