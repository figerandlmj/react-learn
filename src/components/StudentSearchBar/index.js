import React, { Component } from 'react'
import './index.css'

export default class StudentSearchBar extends Component {

    constructor(props) {
        super(props);
        const def = {
            key: '',
            sex: -1
        };
        this.state = Object.assign({}, def, this.props.defaultValue);
    }

    handleRadioChange = e => {
        this.setState({
            sex: +e.target.value
        })
    }

    handleSearch = () => {
        //抛出事件
        if(this.props.onSearch) {
            this.props.onSearch(this.state);
        }
    }

    render() {
        return (
            <div className="stuSearchBar">
                <span className="item">
                    <label>关键字：</label>
                    <input type="text"
                        value={this.state.key}
                        onChange={e => this.setState({ key: e.target.value })} />
                </span>
                <span className="item sexItem">
                    <label>性别：</label>
                    <span>
                        <input id="unlimit" type="radio" name="sex" checked={this.state.sex === -1} value={-1} onChange={this.handleRadioChange} />
                        <label htmlFor="unlimit">不限</label>
                    </span>
                    <span>
                        <input id="male" type="radio" name="sex" checked={this.state.sex === 0} value={0} onChange={this.handleRadioChange} />
                        <label htmlFor="male">男</label>
                    </span>
                    <span>
                        <input id="female" type="radio" name="sex" checked={this.state.sex === 1} value={1} onChange={this.handleRadioChange} />
                        <label htmlFor="female">女</label>
                    </span>
                </span>
                <button onClick={this.handleSearch}>查询</button>
            </div>
        )
    }
}
