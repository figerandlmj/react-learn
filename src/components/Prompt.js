import { Component } from 'react'
import { withRouter } from 'react-router-dom'

//添加阻塞，阻止跳转
class Prompt extends Component {
    static defaultProps = {
        when: false,//为true时阻止跳转
        message: ''//阻塞时，跳转页面的提示信息
    }
    componentDidMount() {
        this.handleBlock();
    }
    componentDidUpdate(prevProps, prevState) {
        this.handleBlock();
    }
    componentWillUnmount() {
        this.unBlock && this.unBlock();
    }
    handleBlock() {
        this.unBlock && this.unBlock();
        if (this.props.when) {
            //添加阻塞
            this.unBlock = this.props.history.block(this.props.message);
        }
    }
    render() {
        return null;
    }
}

export default withRouter(Prompt);
