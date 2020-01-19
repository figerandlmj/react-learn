import React from 'react'
import { Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import 'animate.css'

//match有值表示进入页面，否则表示退出
export default function TransitionRoute(props) {
    const {component: Component, ...rest} = props;
    return (
        <Route {...rest}>
            {({match, ...rest2}) => {
                return <CSSTransition 
                    in={match ? true : false}
                    timeout={500}
                    classNames={{
                        enter: 'animated fast fadeInDown',
                        exit: 'animated fast fadeOutDown'
                    }}
                    mountOnEnter={true}
                    unmountOnExit={true}>
                    <Component {...rest2}/>
                </CSSTransition>
            }}
        </Route>
    )
}
