import React, { Component } from 'react';

class Msg extends Component {
    render() {
        if (this.props.condition) {
            return <div className={this.props.className}>{this.props.msg}</div>;
        }
        return null;
    }
}


export default Msg