import React, { Component } from 'react';

class Error extends Component {
    render() {
        if (this.props.isLoginFailed) {
            return <div className={this.props.className}>{this.props.msg}</div>;
        }
        return null;
    }
}


export default Error