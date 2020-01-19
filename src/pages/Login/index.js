import React, { Component } from 'react'
import './index.css'
import loginInfo from '../../services/loginInfo';
import RouteConfig from '../../RouteConfig';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
    }
    componentDidMount() {
        //监听键盘keyup事件
        document.addEventListener('keyup', e =>{
            if(e.keyCode === 13) {
                this.login();
            }
        })
    }
    //登陆事件
    login = () => {
        const flag = loginInfo.login(this.state);
        if(flag) {
            if(this.props.location.state) {
                this.props.history.push(this.props.location.state);
            }else{
                this.props.history.push(RouteConfig.admin.root);
            }
        }
    }
    render() {
        return (
            <div className="loginContainer">
                <div className="wrapper">
                    <input id="name" type="text" placeholder="请输入用户名" value={this.state.name} onChange={e => {
                        this.setState({
                            name: e.target.value
                        });
                    }}/>
                    <input id="password" type="password" placeholder="请输入密码" value={this.state.password} onChange={e => {
                        this.setState({
                            password: e.target.value
                        });
                    }}/>
                    <button onClick={this.login}>登 陆</button>
                </div>
            </div>
        )
    }
}
