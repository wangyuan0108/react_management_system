import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/utils';
import axios from '../../axios';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sysTime: ''
        };
    }
    componentWillMount() {
        this.setState({
            username: '河畔一角'
        });
        setInterval(() => {
            let sysTime = Util.formateDate(new Date());
            console.log('sysTime', Util.formateDate(new Date()));
            this.setState({
                sysTime
            });
        }, 1000);
        // this.getWeatherApiData();
    }
    getWeatherApiData = () => {
        
        axios.jsonp({url:'http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=yourkey'}).then((res) => {
            console.log('res');
        });
    };
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>
                            欢迎，
                            {this.state.username}
                        </span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-detail">晴转多云</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Header;
