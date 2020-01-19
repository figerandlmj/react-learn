import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

let prevLocation, location, action, unBlock;

class _GuardHelper extends Component {
    
    componentDidMount() {

        //添加阻塞
        unBlock = this.props.history.block((_location, _action) => {
            prevLocation = this.props.location;
            location = _location;
            action = _action;
            return '';
        });
        
        //添加监听器
        this.unListen = this.props.history.listen((location, action) => {
            if (this.props.onChange) {
                this.props.onChange(this.props.location, location, action, this.unListen);
            }
        });
    }

    componentWillUnmount() {
        unBlock();//取消阻塞
        this.unListen();//卸载监听
    }

    render() {
        return null;
    }
}

const GuardHelper = withRouter(_GuardHelper);


export default class RouteGuard extends Component {
    handleConfirm = (msg, commit) => {
        if (this.props.onBeforeChange) {
            this.props.onBeforeChange(prevLocation, location, action, msg, commit, unBlock);
        } else {
            commit(true);
        }
    }
    render() {
        return (
            <Router getUserConfirmation={this.handleConfirm}>
                <GuardHelper onChange={this.props.onChange} />
                {this.props.children}
            </Router>
        )
    }
}
