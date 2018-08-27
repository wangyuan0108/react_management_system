import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
class Admin extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={3}>
                        <NavLeft />
                    </Col>
                    <Col span={21}>
                        <Header>heaser</Header>
                        <Row>66</Row>
                        <Footer>footer</Footer>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Admin;
