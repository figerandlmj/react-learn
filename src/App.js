import React from 'react'
import { Switch } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import RouteConfig from './RouteConfig';
import ProtectedRoute from './components/ProtectedRoute'
import loginInfo from './services/loginInfo'
import RouteGuard from './components/RouteGuard'
import resetScroll from './utils/resetScroll' //滚动条复位

export default function App() {
    loginInfo.getLoginInfo();//获取登陆信息
    return (
        <RouteGuard 
            onBeforeChange={(prevLocation, location, action, msg, commit, unBlock) => {
                console.log(`页面想从${prevLocation.pathname}跳转到${location.pathname}，跳转方式为${action}`);
                if(msg !== '') {
                    commit(window.confirm(msg));
                }else{
                    commit(true);//允许跳转
                }
                // unBlock();//取消阻塞，仅阻塞了一次
            }} onChange={(prevLocation, location, action, unListen) => {
                console.log(`日志：从页面${prevLocation.pathname}进入页面${location.pathname}，进入方式为${action}`);
                // unListen();//取消监听，仅监听了一次
                if(prevLocation.pathname !== location.pathname) {
                    resetScroll();//滚动条复位
                }
            }}>
            <Switch>
                <ProtectedRoute path={RouteConfig.login} exact component={Login}></ProtectedRoute>
                <ProtectedRoute path={RouteConfig.admin.root} component={Admin}></ProtectedRoute>
            </Switch>
        </RouteGuard>
    )
}
