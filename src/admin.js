import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
import './common/style/index.less';
class Admin extends Component {
    render() {
        return (
            <div>
                <Row className="container">
                    <Col span={3} className="nav-left">
                        <NavLeft />
                    </Col>
                    <Col span={21} className="main">
                        <Header>heaser</Header>
                        <Row className="content">66</Row>
                        <Footer>footer</Footer>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Admin;
