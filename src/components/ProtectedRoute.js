import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import loginInfo from '../services/loginInfo'
import RouteConfig from '../RouteConfig';

export default function ProtectedRoute({component: Component, children, render, ...rest}) {
    return (
        <Route {...rest} render={values => {
            const pathname = values.location.pathname;
            if(pathname === RouteConfig.login) {//登录页
                if(loginInfo.isLogin) {
                    return <Redirect to={{
                        pathname: RouteConfig.admin.root
                    }} />;
                }else{
                    return <Component {...values}/>;
                }
            }else{//非登录页
                if(loginInfo.isLogin) {
                    return <Component {...values}/>;
                }else{
                    return <Redirect to={{
                        pathname: RouteConfig.login,
                        // search: `?returnUrl=${pathname}`
                        state: pathname
                    }} />;
                }
            }
        }} />
    )
}
