import React from 'react'
import './index.css'
import loginInfo from '../../services/loginInfo'
import { withRouter } from 'react-router-dom'
import RouteConfig from '../../RouteConfig';

function Header(props) {
    return (
        <div className="headerContent">
            <div className="left">
                <h2>学生管理系统</h2>
            </div>
            <div className="right">
                <span>{loginInfo.name || '用户名'}</span>
                <button onClick={() => {
                    loginInfo.loginOut();
                    props.history.push(RouteConfig.login);
                }}>退出</button>
            </div>
        </div>
    )
}

export default withRouter(Header);